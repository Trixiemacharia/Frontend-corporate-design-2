import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import DemoDialog from '../components/DemoDialog'

export default function Landing() {
  const [dlg, setDlg] = useState(false)
  return (
    <>
      <Navbar onSignIn={() => setDlg(true)} />
      <main>
        <Hero />
      </main>
      <DemoDialog open={dlg} onClose={() => setDlg(false)} />
    </>
  )
}