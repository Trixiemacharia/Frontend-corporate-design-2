import { motion } from 'framer-motion'
import { ArrowUpRight, Bell, FileText, LayoutDashboard, Search, Settings, Users, Workflow } from 'lucide-react'
import Logo from './Logo'
import Reveal from './Reveal'

const nav = [
  { icon: LayoutDashboard, label: 'Overview', active: true }, { icon: Workflow, label: 'Workflows' },
  { icon: Users, label: 'Teams' }, { icon: FileText, label: 'Reports' }, { icon: Settings, label: 'Settings' },
]
const kpis = [['Active users', '8,412', '+4.2%'], ['Open workflows', '1,248', '+1.8%'], ['SLA met', '98.6%', '+0.4%'], ['Avg. cycle time', '3.2 d', '−12%']]
const series = [30, 34, 32, 40, 44, 42, 52, 56, 54, 63, 68, 74]
const baseline = [24, 26, 27, 30, 31, 33, 35, 38, 39, 41, 43, 45]
const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const depts: [string, number][] = [['Operations', 82], ['Finance', 68], ['People', 74], ['Technology', 91]]
const activity = [
  ['Amina O.', 'approved a procurement request', '2m'], ['Daniel K.', 'published the Q3 operations report', '18m'],
  ['Priya S.', 'added 4 members to Finance', '1h'], ['System', 'completed a scheduled access review', '3h'],
]
const perf: [string, number][] = [['On-time delivery', 94], ['Automation rate', 72], ['Budget utilisation', 81]]

const xy = (v: number, i: number) => `${10 + (i / (series.length - 1)) * 580},${170 - v * 1.8}`
const line = (a: number[]) => a.map((v, i) => `${i ? 'L' : 'M'}${xy(v, i)}`).join(' ')

export default function DashboardPreview() {
  return (
    <section id="platform" className="bg-soft/60 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate"><span className="text-copper">03</span>&nbsp;&nbsp;Product</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">See your whole organisation at a glance.</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-xl border border-soft bg-white shadow-float">
            <div className="flex items-center gap-2 border-b border-soft bg-cool px-4 py-3" aria-hidden="true">
              {[0, 1, 2].map(i => <span key={i} className="h-2.5 w-2.5 rounded-full bg-soft" />)}
              <span className="ml-3 rounded bg-white px-3 py-1 text-xs text-slate">app.axiom.example/overview</span>
            </div>
            <div className="flex">
              <aside className="hidden w-52 shrink-0 bg-navy p-5 md:block" aria-hidden="true">
                <Logo light />
                <ul className="mt-8 space-y-1">
                  {nav.map(({ icon: Icon, label, active }) => (
                    <li key={label} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${active ? 'bg-white/10 text-white' : 'text-white/60'}`}>
                      <Icon size={16} className={active ? 'text-copper' : ''} />{label}
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="min-w-0 flex-1 bg-cool p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-extrabold text-navy">Operations overview</h3>
                  <div className="flex items-center gap-3" aria-hidden="true">
                    <span className="hidden items-center gap-2 rounded-md border border-soft bg-white px-3 py-1.5 text-xs text-slate sm:flex"><Search size={13} /> Search</span>
                    <span className="relative grid h-8 w-8 place-items-center rounded-md border border-soft bg-white text-slate"><Bell size={15} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-copper" /></span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {kpis.map(([k, v, d]) => (
                    <div key={k} className="rounded-lg border border-soft bg-white p-4">
                      <p className="text-xs text-slate">{k}</p>
                      <p className="mt-1 text-xl font-extrabold text-navy">{v}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate"><ArrowUpRight size={12} className="text-copper" />{d}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-lg border border-soft bg-white p-4 lg:col-span-2">
                    <div className="flex items-center justify-between"><p className="text-sm font-bold text-navy">Throughput vs. baseline</p>
                      <span className="flex items-center gap-3 text-xs text-slate"><i className="h-0.5 w-4 bg-navy" />Actual<i className="h-0.5 w-4 bg-slate/50" />Baseline</span></div>
                    <svg viewBox="0 0 600 190" className="mt-3 w-full" role="img" aria-label="Line chart of sample throughput against baseline over twelve months">
                      {[40, 80, 120, 160].map(y => <line key={y} x1="10" x2="590" y1={y} y2={y} stroke="#E7EEF5" />)}
                      <path d={`${line(series)} L590,170 L10,170 Z`} fill="#E7EEF5" opacity="0.7" />
                      <path d={line(baseline)} fill="none" stroke="#52677F" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="5 5" />
                      <motion.path d={line(series)} fill="none" stroke="#15243B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
                      <circle cx="590" cy={170 - 74 * 1.8} r="4.5" fill="#B97952" />
                      {months.map((m, i) => <text key={i} x={10 + (i / 11) * 580} y="186" textAnchor="middle" fontSize="11" fill="#52677F">{m}</text>)}
                    </svg>
                  </div>

                  <div className="rounded-lg border border-soft bg-white p-4">
                    <p className="text-sm font-bold text-navy">Operational summary</p>
                    <ul className="mt-4 space-y-4">
                      {depts.map(([d, v]) => (
                        <li key={d}>
                          <div className="flex justify-between text-xs"><span className="text-slate">{d}</span><span className="font-semibold text-navy">{v}%</span></div>
                          <div className="mt-1.5 h-1.5 rounded-full bg-soft"><motion.div className="h-full rounded-full bg-navy" initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} /></div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-soft bg-white p-4 lg:col-span-2">
                    <p className="text-sm font-bold text-navy">Recent activity</p>
                    <ul className="mt-3 divide-y divide-soft">
                      {activity.map(([who, what, t]) => (
                        <li key={what} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                          <span className="min-w-0 truncate"><b className="font-semibold text-navy">{who}</b> <span className="text-slate">{what}</span></span>
                          <span className="shrink-0 text-xs text-slate/70">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-soft bg-white p-4">
                    <p className="text-sm font-bold text-navy">Performance indicators</p>
                    <ul className="mt-4 space-y-4">
                      {perf.map(([k, v]) => (
                        <li key={k}>
                          <div className="flex justify-between text-xs"><span className="text-slate">{k}</span><span className="font-semibold text-navy">{v}%</span></div>
                          <div className="mt-1.5 h-1.5 rounded-full bg-soft"><motion.div className="h-full rounded-full bg-copper" initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} /></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate/70">Sample data for illustration only.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}