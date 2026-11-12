import { motion } from 'framer-motion'
import { securityItems } from '../data/content'
import Reveal from './Reveal'

function ShieldArt() {
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-sm" aria-hidden="true">
      <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(231,238,245,0.12)" />
      <motion.circle cx="200" cy="200" r="135" fill="none" stroke="rgba(185,121,82,0.6)" strokeDasharray="3 11"
        animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }} />
      <circle cx="200" cy="200" r="100" fill="rgba(231,238,245,0.04)" stroke="rgba(231,238,245,0.18)" />
      {[[60, 200], [340, 200], [200, 40], [200, 360]].map(([x, y], i) => (
        <g key={i}><line x1="200" y1="200" x2={x} y2={y} stroke="rgba(231,238,245,0.12)" /><circle cx={x} cy={y} r="6" fill="#52677F" /></g>
      ))}
      <path d="M200 120 L272 148 V208 C272 250 242 276 200 290 C158 276 128 250 128 208 V148 Z" fill="rgba(231,238,245,0.08)" stroke="#E7EEF5" strokeWidth="2" strokeLinejoin="round" />
      <motion.path d="M170 206 L193 229 L234 182" fill="none" stroke="#B97952" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
    </svg>
  )
}

export default function Security() {
  return (
    <section id="security" className="bg-navy px-5 py-24 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60"><span className="text-copper">04</span>&nbsp;&nbsp;Security and reliability</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Control and confidence, built into every layer.</h2>
            <p className="mt-4 max-w-md text-white/70">Protect your data, govern who can do what, and keep a clear record of every action.</p>
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {securityItems.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <li className="border-t border-white/15 pt-5">
                  <Icon size={22} className="text-copper" />
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1}><ShieldArt /></Reveal>
      </div>
    </section>
  )
}