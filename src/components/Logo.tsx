import { Link } from 'react-router-dom'
import { brand } from '../data/brand'

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label={`${brand.name} home`} className={`flex items-center gap-2.5 text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path d="M12 2 22 20H2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="2.2" fill="#B97952" />
      </svg>
      {brand.name}
    </Link>
  )
}