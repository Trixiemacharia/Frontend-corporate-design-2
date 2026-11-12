import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowLeft, ArrowRight, LifeBuoy } from 'lucide-react'
import Button from '../components/Button'
import DemoDialog from '../components/DemoDialog'
import Logo from '../components/Logo'
import PageTransition from '../components/PageTransition'
import Stepper from '../components/Stepper'
import SummaryPanel from '../components/SummaryPanel'
import { StepAccess, StepCompany, StepConfig, StepPersonal, StepReview } from '../onboarding/steps'
import { initialData, validate, type Data, type Errors } from '../lib/validation'

type Phase = 'form' | 'provisioning' | 'done'
const statuses = ['Creating your workspace', 'Applying access rules', 'Configuring departments', 'Finalising setup']

const slide: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d * 48 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut', staggerChildren: 0.06, delayChildren: 0.1 } },
  exit: (d: number) => ({ opacity: 0, x: d * -48, transition: { duration: 0.2 } }),
}

export default function Onboarding() {
  const [data, setData] = useState<Data>(initialData)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [errors, setErrors] = useState<Errors>({})
  const [phase, setPhase] = useState<Phase>('form')
  const [fromConfirm, setFromConfirm] = useState(false)
  const [tick, setTick] = useState(0)
  const [help, setHelp] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) { first.current = false; return }
    cardRef.current?.focus()
  }, [step, phase])

  useEffect(() => {
    if (phase !== 'provisioning') return
    setTick(0)
    const id = setInterval(() => setTick(t => t + 1), 700)
    return () => clearInterval(id)
  }, [phase])

  useEffect(() => { if (phase === 'provisioning' && tick >= 4) setPhase('done') }, [tick, phase])

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData(d => ({ ...d, [k]: v }))
    setErrors(e => ({ ...e, [k]: undefined }))
  }
  const goTo = (s: number) => { setDir(s > step ? 1 : -1); setStep(s) }
  const next = () => {
    const e = validate(step, data)
    setErrors(e)
    if (Object.keys(e).length) return
    fromConfirm ? (setFromConfirm(false), goTo(4)) : goTo(step + 1)
  }
  const back = () => {
    setErrors({})
    fromConfirm ? (setFromConfirm(false), goTo(4)) : goTo(step - 1)
  }
  const edit = (s: number) => { setFromConfirm(true); goTo(s) }

  const p = { data, set, errors }
  const screens = [<StepPersonal {...p} />, <StepCompany {...p} />, <StepConfig {...p} />, <StepAccess {...p} />, <StepReview data={data} onEdit={edit} />]
  const firstName = data.name.trim().split(/\s+/)[0]

  return (
    <PageTransition variant="onboarding">
      <div className="grid-bg min-h-screen bg-cool">
        <header className="border-b border-soft bg-white">
          <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8">
            <Logo />
            <button onClick={() => setHelp(true)} className="flex items-center gap-2 text-sm font-semibold text-graphite hover:text-navy"><LifeBuoy size={17} className="text-copper" /> Help Centre</button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="mx-auto max-w-3xl"><Stepper current={step} done={phase === 'done'} /></div>

          <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
            <div ref={cardRef} tabIndex={-1} className="overflow-hidden rounded-xl border border-soft bg-white p-6 shadow-panel outline-none sm:p-10">
              <AnimatePresence mode="wait" custom={dir}>
                {phase === 'form' && (
                  <motion.form key={`s${step}`} noValidate custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
                    onSubmit={ev => { ev.preventDefault(); step === 4 ? setPhase('provisioning') : next() }}>
                    {screens[step]}
                    <div className="mt-8 flex justify-between gap-3 border-t border-soft pt-6">
                      {step > 0 || fromConfirm
                        ? <Button variant="outline" onClick={back}><ArrowLeft size={16} /> Back</Button>
                        : <Button variant="outline" to="/">Cancel</Button>}
                      <Button type="submit">{step === 4 ? 'Confirm setup' : fromConfirm ? 'Save and review' : 'Continue'} {step !== 4 && <ArrowRight size={16} />}</Button>
                    </div>
                  </motion.form>
                )}

                {phase === 'provisioning' && (
                  <motion.div key="prov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-10 text-center" role="status" aria-live="polite">
                    <motion.span className="mx-auto block h-12 w-12 rounded-full border-4 border-soft border-t-copper" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                    <h1 className="mt-6 text-2xl font-extrabold text-navy">Setting up your workspace</h1>
                    <p className="mt-2 text-slate">{statuses[Math.min(tick, 3)]}…</p>
                    <div className="mx-auto mt-6 h-1.5 max-w-xs overflow-hidden rounded-full bg-soft">
                      <motion.div className="h-full rounded-full bg-navy" animate={{ width: `${(Math.min(tick, 4) / 4) * 100}%` }} transition={{ duration: 0.6 }} />
                    </div>
                  </motion.div>
                )}

                {phase === 'done' && (
                  <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center">
                    <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden="true">
                      <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#15243B" strokeWidth="4" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }} />
                      <motion.path d="M32 52 L45 65 L69 38" fill="none" stroke="#B97952" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 }} />
                    </svg>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                      <h1 className="mt-6 text-3xl font-extrabold text-navy">Your workspace is ready{firstName ? `, ${firstName}` : ''}.</h1>
                      <p className="mx-auto mt-3 max-w-md text-slate">Setup for {data.org || 'your organisation'} is complete. This is a prototype, so no real account was created.</p>
                      <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-graphite">
                        <li className="border-l-2 border-copper pl-3">{data.departments.length} departments configured</li>
                        <li className="border-l-2 border-copper pl-3">{data.locations.length} location{data.locations.length === 1 ? '' : 's'} added</li>
                        <li className="border-l-2 border-copper pl-3">Access level: {data.access}</li>
                      </ul>
                      <Button to="/" className="mt-8">Back to home</Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <SummaryPanel data={data} />
          </div>
        </div>
      </div>
      <DemoDialog open={help} title="Help Centre" onClose={() => setHelp(false)}>
        <p>Each step checks your answers before you continue. Use Back to change earlier details.</p>
        <p>On the review step, Edit takes you straight to that section.</p>
        <p>This is a prototype: nothing you enter is stored or sent.</p>
      </DemoDialog>
    </PageTransition>
  )
}