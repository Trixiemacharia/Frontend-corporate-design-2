import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Record<'landing' | 'onboarding', Variants> = {
  landing: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -24, transition: { duration: 0.35 } },
  },
  onboarding: {
    initial: { opacity: 0, x: 56 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, x: 56, transition: { duration: 0.3 } },
  },
}

export default function PageTransition({ variant, children }: { variant: 'landing' | 'onboarding'; children: ReactNode }) {
  return <motion.div variants={variants[variant]} initial="initial" animate="animate" exit="exit">{children}</motion.div>
}