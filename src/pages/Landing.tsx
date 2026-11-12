import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ImpactStrip from '../components/ImpactStrip'
import Solutions from '../components/Solutions'
import DashboardPreview from '../components/DashboardPreview'
import Security from '../components/Security'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import DemoDialog from '../components/DemoDialog'
import PageTransition from '../components/PageTransition'

export default function Landing() {
  const [dlg, setDlg] = useState(false)
  return (
    <PageTransition variant="landing">
      <Navbar onSignIn={() => setDlg(true)} />
      <main>
        <Hero />
        <ImpactStrip />
        <Solutions />
        <DashboardPreview />
        <Security />
        <FinalCTA />
      </main>
      <Footer />
      <DemoDialog open={dlg} title="Sign in" onClose={() => setDlg(false)}>
        <p>This is a frontend-only prototype, so there is no real sign-in.</p>
        <p>Use Request Access to see the onboarding.</p>
      </DemoDialog>
    </PageTransition>
  )
}