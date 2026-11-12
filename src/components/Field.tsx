import { motion, type Variants } from 'framer-motion'
import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react'

export const fieldV: Variants = { enter: { opacity: 0, y: 10 }, center: { opacity: 1, y: 0 } }
export const inputBase = 'min-h-12 w-full rounded-md border bg-white px-4 text-graphite transition-colors placeholder:text-slate/50 focus:border-navy'
type Common = { id: string; label: string; error?: string; hint?: string }

export function Field({ id, label, error, hint, ...p }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <motion.div variants={fieldV}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">{label}</label>
      <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} {...p}
        className={`${inputBase} ${error ? 'border-red-600' : 'border-soft'}`} />
      {error ? <p id={`${id}-e`} className="mt-1.5 text-sm text-red-700">{error}</p>
        : hint && <p id={`${id}-h`} className="mt-1.5 text-xs text-slate">{hint}</p>}
    </motion.div>
  )
}

export function SelectField({ id, label, error, options, ...p }: Common & { options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <motion.div variants={fieldV}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">{label}</label>
      <select id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} {...p}
        className={`${inputBase} ${error ? 'border-red-600' : 'border-soft'}`}>
        <option value="">Select…</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      {error && <p id={`${id}-e`} className="mt-1.5 text-sm text-red-700">{error}</p>}
    </motion.div>
  )
}