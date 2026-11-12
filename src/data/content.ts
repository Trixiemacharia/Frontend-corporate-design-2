import {
  Activity, Boxes, Database, FileText, KeyRound, ShieldCheck, ShieldHalf, Settings, SlidersHorizontal, User, Users,
  type LucideIcon,
} from 'lucide-react'

export const navLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'Industries', href: '#impact' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Company', href: '#security' },
  { label: 'Resources', href: '#resources' },
]

// Illustrative placeholders, labelled as such on the page.
export const impact = [
  { value: '10,000+', label: 'Active users' },
  { value: '150+', label: 'Markets' },
  { value: '99.9%', label: 'Platform availability' },
  { value: '24/7', label: 'Operational visibility' },
]

export const solutions: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Activity, title: 'Operational Intelligence', text: 'Live visibility into processes, bottlenecks and performance across every business unit.' },
  { icon: Boxes, title: 'Enterprise Resource Management', text: 'Plan, allocate and track assets, budgets and approvals in one governed system.' },
  { icon: Users, title: 'Workforce Collaboration', text: 'Connect teams, tasks and decisions so work moves without hand-offs getting lost.' },
  { icon: Database, title: 'Data and Security', text: 'Governed data, granular access and complete audit trails by default.' },
]

export const securityItems: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: 'Data protection', text: 'Encryption in transit and at rest, with clear data-handling policies.' },
  { icon: KeyRound, title: 'Access management', text: 'Role-based permissions and scheduled access reviews.' },
  { icon: FileText, title: 'Audit trails', text: 'Every change recorded, searchable and exportable for compliance teams.' },
  { icon: SlidersHorizontal, title: 'Organisational controls', text: 'Policies, approvals and limits set per department and region.' },
]

export const industries = ['Financial services', 'Healthcare', 'Manufacturing', 'Retail', 'Technology', 'Logistics', 'Energy', 'Public sector', 'Other']
export const countries = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Nigeria', 'Ghana', 'South Africa', 'United Kingdom', 'United States', 'Other']
export const employeeBands = ['1–50', '51–200', '201–1,000', '1,001–5,000', '5,000+']
export const departmentOptions = ['Operations', 'Finance', 'Human Resources', 'Sales', 'Marketing', 'Technology', 'Legal', 'Procurement']
export const currencies = ['KES – Kenyan shilling', 'USD – US dollar', 'EUR – Euro', 'GBP – Pound sterling', 'NGN – Nigerian naira', 'ZAR – South African rand']

export const accessLevels: { id: string; text: string; icon: LucideIcon }[] = [
  { id: 'Account owner', text: 'Full control, including billing and ownership of the workspace.', icon: ShieldHalf },
  { id: 'Administrator', text: 'Manages users, settings and integrations.', icon: Settings },
  { id: 'Department manager', text: 'Oversees one department and approves its requests.', icon: Users },
  { id: 'Standard user', text: 'Works within assigned teams and workflows.', icon: User },
]