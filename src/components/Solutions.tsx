import { ArrowUpRight } from 'lucide-react'
import { solutions } from '../data/content'
import Reveal from './Reveal'

export default function Solutions() {
  return (
    <section id="solutions" className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid gap-6 lg:grid-cols-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate lg:col-span-3"><span className="text-copper">02</span>&nbsp;&nbsp;Enterprise solutions</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:col-span-8">One platform for the work that keeps a global organisation moving.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-14 grid border-l border-t border-soft md:grid-cols-2">
            {solutions.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="group relative border-b border-r border-soft p-8 transition-colors duration-300 hover:bg-navy sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-md bg-soft text-navy transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white"><Icon size={22} /></span>
                  <span className="text-sm font-bold text-slate/60 transition-colors group-hover:text-copper">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-extrabold text-navy transition-colors duration-300 group-hover:text-white">{title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-slate transition-colors duration-300 group-hover:text-white/75">{text}</p>
                <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-all duration-300 group-hover:translate-x-1 group-hover:text-copper">
                  Learn more <ArrowUpRight size={16} />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}