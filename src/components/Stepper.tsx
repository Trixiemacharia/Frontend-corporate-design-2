import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export const stepLabels = ['Personal', 'Company', 'Configuration', 'Access', 'Review']

export default function Stepper({ current, done }: { current: number; done: boolean }) {
  const pct = done ? 100 : (current / (stepLabels.length - 1)) * 100
  return (
    <nav aria-label="Progress">
      <ol className="relative grid grid-cols-5">
        <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-4 h-0.5 bg-soft">
          <motion.span className="block h-full bg-copper" animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: 'easeInOut' }} />
        </span>
        {stepLabels.map((label, i) => {
          const complete = done || i < current
          const active = !done && i === current
          return (
            <li key={label} aria-current={active ? 'step' : undefined} className="relative flex flex-col items-center gap-2">
              <motion.span animate={{ scale: active ? 1.1 : 1 }}
                className={`grid h-8 w-8 place-items-center rounded-full border-2 text-xs font-bold transition-colors ${complete ? 'border-navy bg-navy text-white' : active ? 'border-navy bg-white text-navy' : 'border-soft bg-white text-slate'}`}>
                {complete ? <Check size={14} strokeWidth={3} /> : i + 1}
              </motion.span>
              <span className={`text-center text-xs font-semibold ${active ? 'text-navy' : 'hidden text-slate sm:block'}`}>{label}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}