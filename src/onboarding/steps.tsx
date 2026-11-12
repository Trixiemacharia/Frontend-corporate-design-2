import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Pencil, Plus, X } from 'lucide-react'
import { Field, SelectField, fieldV, inputBase } from '../components/Field'
import { accessLevels, countries, currencies, departmentOptions, employeeBands, industries } from '../data/content'
import type { Data, Errors } from '../lib/validation'

type P = { data: Data; set: <K extends keyof Data>(k: K, v: Data[K]) => void; errors: Errors }

export const StepHeader = ({ title, text }: { title: string; text: string }) => (
  <div className="mb-7"><h1 className="text-2xl font-extrabold text-navy sm:text-3xl">{title}</h1><p className="mt-2 text-slate">{text}</p></div>
)

export function StepPersonal({ data, set, errors }: P) {
  return (
    <>
      <StepHeader title="Personal information" text="Start with your sign-in details." />
      <div className="space-y-4">
        <Field id="name" label="Full name" autoComplete="name" value={data.name} onChange={e => set('name', e.target.value)} error={errors.name} />
        <Field id="email" label="Work email" type="email" autoComplete="email" value={data.email} onChange={e => set('email', e.target.value)} error={errors.email} />
        <Field id="password" label="Password" type="password" autoComplete="new-password" hint="At least 10 characters, with a letter and a number." value={data.password} onChange={e => set('password', e.target.value)} error={errors.password} />
        <Field id="phone" label="Phone number" type="tel" autoComplete="tel" placeholder="+254 700 000 000" value={data.phone} onChange={e => set('phone', e.target.value)} error={errors.phone} />
      </div>
    </>
  )
}

export function StepCompany({ data, set, errors }: P) {
  return (
    <>
      <StepHeader title="Company registration" text="Tell us about the organisation you represent." />
      <div className="space-y-4">
        <Field id="org" label="Organisation name" autoComplete="organization" value={data.org} onChange={e => set('org', e.target.value)} error={errors.org} />
        <Field id="regNo" label="Registration number" value={data.regNo} onChange={e => set('regNo', e.target.value)} error={errors.regNo} />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField id="industry" label="Industry" options={industries} value={data.industry} onChange={e => set('industry', e.target.value)} error={errors.industry} />
          <SelectField id="country" label="Country" options={countries} value={data.country} onChange={e => set('country', e.target.value)} error={errors.country} />
        </div>
        <Field id="website" label="Organisation website (optional)" inputMode="url" placeholder="company.com" value={data.website} onChange={e => set('website', e.target.value)} error={errors.website} />
      </div>
    </>
  )
}

function Locations({ value, onChange, error }: { value: string[]; onChange: (v: string[]) => void; error?: string }) {
  const [text, setText] = useState('')
  const add = () => { const t = text.trim(); if (t && !value.includes(t)) onChange([...value, t]); setText('') }
  return (
    <motion.div variants={fieldV}>
      <label htmlFor="loc" className="mb-1.5 block text-sm font-semibold text-navy">Business locations</label>
      <div className="flex gap-2">
        <input id="loc" value={text} placeholder="e.g. Nairobi" onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          aria-invalid={!!error} className={`${inputBase} ${error ? 'border-red-600' : 'border-soft'}`} />
        <button type="button" onClick={add} className="inline-flex min-h-12 items-center gap-1 rounded-md bg-navy px-4 text-sm font-semibold text-white hover:bg-graphite"><Plus size={16} /> Add</button>
      </div>
      {value.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {value.map(l => (
            <li key={l} className="inline-flex items-center gap-1.5 rounded-full bg-soft py-1 pl-3 pr-2 text-sm font-medium text-navy">
              {l}<button type="button" aria-label={`Remove ${l}`} onClick={() => onChange(value.filter(x => x !== l))} className="text-slate hover:text-navy"><X size={14} /></button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1.5 text-sm text-red-700">{error}</p>}
    </motion.div>
  )
}

export function StepConfig({ data, set, errors }: P) {
  const toggle = (d: string) => set('departments', data.departments.includes(d) ? data.departments.filter(x => x !== d) : [...data.departments, d])
  return (
    <>
      <StepHeader title="Organisation configuration" text="Describe how your organisation is structured." />
      <div className="space-y-5">
        <SelectField id="employees" label="Number of employees" options={employeeBands} value={data.employees} onChange={e => set('employees', e.target.value)} error={errors.employees} />
        <motion.div variants={fieldV}>
          <p id="dept-l" className="mb-2 text-sm font-semibold text-navy">Departments</p>
          <div role="group" aria-labelledby="dept-l" className="flex flex-wrap gap-2">
            {departmentOptions.map(d => {
              const on = data.departments.includes(d)
              return (
                <button key={d} type="button" aria-pressed={on} onClick={() => toggle(d)}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-md border px-3.5 text-sm font-semibold transition-colors ${on ? 'border-navy bg-navy text-white' : 'border-soft text-graphite hover:border-navy/40'}`}>
                  {on && <Check size={14} className="text-copper" />}{d}
                </button>
              )
            })}
          </div>
          {errors.departments && <p className="mt-1.5 text-sm text-red-700">{errors.departments}</p>}
        </motion.div>
        <Locations value={data.locations} onChange={v => set('locations', v)} error={errors.locations} />
        <SelectField id="currency" label="Preferred operating currency" options={currencies} value={data.currency} onChange={e => set('currency', e.target.value)} error={errors.currency} />
      </div>
    </>
  )
}

export function StepAccess({ data, set, errors }: P) {
  return (
    <>
      <StepHeader title="Access configuration" text="Choose the access level for your account." />
      <div role="radiogroup" aria-label="Access level" className="grid gap-3 sm:grid-cols-2">
        {accessLevels.map(({ id, text, icon: Icon }) => {
          const on = data.access === id
          return (
            <motion.button variants={fieldV} key={id} type="button" role="radio" aria-checked={on} onClick={() => set('access', id)}
              className={`rounded-lg border-2 p-4 text-left transition-colors ${on ? 'border-navy bg-navy text-white' : 'border-soft hover:border-navy/40'}`}>
              <Icon size={22} className={on ? 'text-copper' : 'text-navy'} />
              <span className={`mt-3 block font-bold ${on ? '' : 'text-navy'}`}>{id}</span>
              <span className={`mt-1 block text-sm ${on ? 'text-white/75' : 'text-slate'}`}>{text}</span>
            </motion.button>
          )
        })}
      </div>
      {errors.access && <p className="mt-3 text-sm text-red-700">{errors.access}</p>}
    </>
  )
}

export function StepReview({ data, onEdit }: { data: Data; onEdit: (step: number) => void }) {
  const groups: { step: number; title: string; rows: [string, string][] }[] = [
    { step: 0, title: 'Personal', rows: [['Name', data.name], ['Email', data.email], ['Phone', data.phone], ['Password', '••••••••••']] },
    { step: 1, title: 'Company', rows: [['Organisation', data.org], ['Registration no.', data.regNo], ['Industry', data.industry], ['Country', data.country], ['Website', data.website || 'Not provided']] },
    { step: 2, title: 'Configuration', rows: [['Employees', data.employees], ['Departments', data.departments.join(', ')], ['Locations', data.locations.join(', ')], ['Currency', data.currency]] },
    { step: 3, title: 'Access', rows: [['Access level', data.access]] },
  ]
  return (
    <>
      <StepHeader title="Review and confirm" text="Check your details, then confirm your setup." />
      <div className="space-y-4">
        {groups.map(g => (
          <motion.section variants={fieldV} key={g.title} className="rounded-lg border border-soft p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-copper">{g.title}</h2>
              <button type="button" onClick={() => onEdit(g.step)} className="flex items-center gap-1 text-sm font-semibold text-navy hover:underline"><Pencil size={14} /> Edit</button>
            </div>
            <dl className="mt-2 space-y-1.5 text-sm">
              {g.rows.map(([k, v]) => <div key={k} className="flex justify-between gap-4"><dt className="shrink-0 text-slate">{k}</dt><dd className="text-right font-medium text-graphite">{v}</dd></div>)}
            </dl>
          </motion.section>
        ))}
      </div>
    </>
  )
}
