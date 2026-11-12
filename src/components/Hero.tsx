import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { images } from '../data/brand'
import Button from './Button'
import SmartImage from './SmartImage'

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }
const item: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }

function Sparkline() {
  const pts = [14, 20, 17, 26, 22, 31, 28, 38, 34, 46]
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (pts.length - 1)) * 160},${56 - v}`).join(' ')
  return (
    <svg viewBox="0 0 160 56" className="mt-3 h-14 w-full" aria-hidden="true">
      <path d={`${d} L160,56 L0,56 Z`} fill="#E7EEF5" />
      <motion.path d={d} fill="none" stroke="#15243B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.9, ease: 'easeInOut' }} />
      <circle cx="160" cy={56 - 46} r="3.5" fill="#B97952" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="grid-bg relative overflow-hidden border-b border-soft">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pb-28 lg:pt-20">
        <motion.div variants={group} initial="hidden" animate="show" className="relative z-10 lg:col-span-7">
          <motion.div variants={item} className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-slate">
            <span className="text-copper">01</span><span className="h-px w-10 bg-slate/50" />Enterprise platform
          </motion.div>
          <motion.h1 variants={item} className="mt-7 text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-navy sm:text-6xl xl:text-[5.25rem]">
            Transforming<br />Complexity Into<br />Clarity<span className="text-copper">.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-8 max-w-lg text-lg leading-relaxed text-slate">
            A connected enterprise platform designed to simplify business processes, strengthen collaboration and unlock organisational intelligence.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/onboarding">Request Access <ArrowRight size={16} /></Button>
            <Button variant="outline" href="#solutions">Discover Capabilities</Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
          className="relative lg:col-span-5 lg:mt-24 lg:-mr-8 xl:-mr-24"
        >
          <div className="overflow-hidden rounded-lg shadow-float">
            <SmartImage priority src={images.hero} alt="Abstract view of a modern corporate building" className="aspect-[4/5] w-full" />
          </div>
          <p className="mt-3 text-xs text-slate">Fig. 01 — Global headquarters</p>

          <motion.div
            animate={{ y: [0, -7, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-4 top-10 w-56 rounded-lg border border-soft bg-white p-4 shadow-panel sm:-left-12 lg:-left-16"
          >
            <div className="flex items-center justify-between text-xs font-medium text-slate">
              Operational throughput <ArrowUpRight size={14} className="text-copper" />
            </div>
            <p className="mt-1 text-2xl font-extrabold text-navy">+18.4%</p>
            <Sparkline />
            <p className="mt-1 text-[10px] text-slate/70">Sample data</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 7, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 right-3 w-48 rounded-lg border border-soft bg-white p-4 shadow-panel"
          >
            <p className="text-xs font-medium text-slate">Active workflows</p>
            <p className="mt-1 text-2xl font-extrabold text-navy">1,248</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-soft" aria-hidden="true">
              <motion.div className="h-full rounded-full bg-copper" initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 1.2, delay: 1 }} />
            </div>
            <p className="mt-2 text-[10px] text-slate/70">72% automated · sample data</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}