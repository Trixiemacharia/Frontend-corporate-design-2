import { ArrowRight } from 'lucide-react'
import Button from './Button'
import Reveal from './Reveal'

export default function FinalCTA() {
  return (
    <section className="grid-bg border-b border-soft bg-cool px-5 py-28 sm:px-8">
      <Reveal className="mx-auto max-w-4xl text-center">
        <span className="mx-auto block h-0.5 w-12 bg-copper" />
        <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-6xl">Your Organisation.<br />One Connected Ecosystem.</h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-slate">Request access and set up your workspace in a few guided steps.</p>
        <Button to="/onboarding" className="mt-10">Request Access <ArrowRight size={16} /></Button>
      </Reveal>
    </section>
  )
}