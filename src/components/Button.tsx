import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  variant?: 'solid' | 'outline' | 'light'
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  children: ReactNode
}

const looks = {
  solid: 'bg-navy text-white hover:bg-graphite',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy/5',
  light: 'bg-white text-navy hover:bg-soft',
}

const press = { whileHover: { y: -1 }, whileTap: { scale: 0.98 }, transition: { duration: 0.15 } }
const MotionLink = motion(Link)

export default function Button({ variant = 'solid', to, href, onClick, type = 'button', disabled, className = '', children }: Props) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${looks[variant]} ${className}`
  if (to) return <MotionLink to={to} onClick={onClick} className={cls} {...press}>{children}</MotionLink>
  if (href) return <motion.a href={href} onClick={onClick} className={cls} {...press}>{children}</motion.a>
  return <motion.button type={type} onClick={onClick} disabled={disabled} className={cls} {...press}>{children}</motion.button>
}