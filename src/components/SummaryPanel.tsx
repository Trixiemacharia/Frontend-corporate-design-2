import { motion } from 'framer-motion'
import type { Data } from '../lib/validation'

export default function SummaryPanel({ data }: { data: Data }) {
  const rows: [string, string][] = [
    ['Name', data.name], ['Work email', data.email], ['Organisation', data.org], ['Industry', data.industry], ['Country', data.country],
    ['Employees', data.employees], ['Departments', data.departments.length ? `${data.departments.length} selected` : ''],
    ['Currency', data.currency.split(' ')[0]], ['Access', data.access],
  ]
  const filled = rows.filter(r => r[1]).length
  return (
    <aside aria-label="Setup summary" className="hidden rounded-xl border border-soft bg-white p-6 shadow-panel lg:block">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate">Setup summary</h2>
        <span className="text-xs font-bold text-copper">{filled}/{rows.length}</span>
      </div>
      <dl className="mt-5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-soft py-3 text-sm last:border-0">
            <dt className="text-slate">{k}</dt>
            <motion.dd key={v} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`max-w-[60%] truncate text-right font-semibold ${v ? 'text-navy' : 'text-slate/40'}`}>{v || '—'}</motion.dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-slate/70">Prototype only. Nothing you enter is stored or sent.</p>
    </aside>
  )
}