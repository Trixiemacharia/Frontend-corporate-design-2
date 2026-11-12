import { Mail, MapPin, Phone } from 'lucide-react'
import { brand } from '../data/brand'
import Logo from './Logo'

const cols: Record<string, string[]> = {
  Platform: ['Operational Intelligence', 'Resource Management', 'Workforce Collaboration', 'Data and Security'],
  Company: ['About', 'Careers', 'Newsroom', 'Partners'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Compliance'],
}

const Social = ({ label, d }: { label: string; d: string }) => (
  <a href="#resources" aria-label={label} className="grid h-9 w-9 place-items-center rounded-md border border-white/20 text-white/80 transition-colors hover:border-copper hover:text-white">
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
  </a>
)

export default function Footer() {
  return (
    <footer id="resources" className="bg-graphite px-5 pb-8 pt-16 text-white/70 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-6">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm">{brand.tagline} A prototype enterprise platform concept.</p>
          <div className="mt-5 flex gap-3">
            <Social label="LinkedIn" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3zM9.5 9.75h3.8v1.6h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.14v5.81h-4v-5.15c0-1.23-.02-2.8-1.7-2.8-1.7 0-1.97 1.33-1.97 2.7v5.25h-4z" />
            <Social label="X" d="M18.244 2H21.5l-7.1 8.12L22.8 22h-6.5l-5.1-6.7L5.3 22H2l7.6-8.7L1.5 2h6.7l4.6 6.1zM17.1 20h1.8L7 3.9H5.1z" />
          </div>
        </div>
        {Object.entries(cols).map(([h, items]) => (
          <div key={h}>
            <h3 className="font-bold text-white">{h}</h3>
            <ul className="mt-4 space-y-2 text-sm">{items.map(i => <li key={i}><a href="#solutions" className="transition-colors hover:text-white">{i}</a></li>)}</ul>
          </div>
        ))}
        <div>
          <h3 className="font-bold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail size={15} className="text-copper" /> hello@example.com</li>
            <li className="flex items-center gap-2"><Phone size={15} className="text-copper" /> +254 700 000 000</li>
            <li className="flex items-center gap-2"><MapPin size={15} className="text-copper" /> Nairobi, Kenya</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/45">© {new Date().getFullYear()} {brand.name}. Design prototype with placeholder details; no real accounts or data.</p>
    </footer>
  )
}