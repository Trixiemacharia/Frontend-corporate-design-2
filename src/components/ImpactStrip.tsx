import { impact } from '../data/content'
import Reveal from './Reveal'

export default function ImpactStrip() {
  return (
    <section id="impact" className="border-b border-soft bg-cool px-5 py-16 sm:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {impact.map((m, i) => (
            <div key={m.label} className={`px-2 sm:px-8 ${i > 0 ? 'lg:border-l lg:border-soft' : 'lg:pl-0'} ${i % 2 === 1 ? 'border-l border-soft lg:border-l' : ''}`}>
              <dd className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{m.value}</dd>
              <span className="mt-3 block h-0.5 w-8 bg-copper" />
              <dt className="mt-3 text-sm font-medium text-slate">{m.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-xs text-slate/70">Figures are illustrative placeholders, not verified company claims.</p>
      </Reveal>
    </section>
  )
}