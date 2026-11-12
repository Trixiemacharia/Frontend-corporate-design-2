import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'
import Button from './Button'
import Logo from './Logo'

export default function Navbar({ onSignIn }: { onSignIn: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 border-b border-soft bg-white"
    >
      <nav aria-label="Main" className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} className="group relative py-2 text-sm font-medium text-graphite transition-colors hover:text-navy">
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-copper transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <button onClick={onSignIn} className="text-sm font-medium text-graphite transition-colors hover:text-navy">Sign in</button>
          <Button to="/onboarding" className="min-h-10 px-5">Request Access</Button>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-md text-navy lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="m-menu"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="m-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-soft bg-white lg:hidden"
          >
            <ul className="space-y-1 px-5 py-3">
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 font-medium text-graphite hover:bg-soft">{l.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 px-5 pb-5">
              <Button variant="outline" className="flex-1" onClick={() => { setOpen(false); onSignIn() }}>Sign in</Button>
              <Button to="/onboarding" className="flex-1">Request Access</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}