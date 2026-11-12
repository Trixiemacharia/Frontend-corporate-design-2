export type Data = {
  name: string; email: string; password: string; phone: string
  org: string; regNo: string; industry: string; country: string; website: string
  employees: string; departments: string[]; locations: string[]; currency: string
  access: string
}
export type Errors = Partial<Record<keyof Data, string>>

export const initialData: Data = {
  name: '', email: '', password: '', phone: '', org: '', regNo: '', industry: '', country: '', website: '',
  employees: '', departments: [], locations: [], currency: '', access: '',
}

const validUrl = (v: string) => {
  try { const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`); return u.hostname.includes('.') } catch { return false }
}

export function validate(step: number, d: Data): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (d.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Enter a valid work email, like name@company.com.'
    if (d.password.length < 10 || !/[A-Za-z]/.test(d.password) || !/\d/.test(d.password)) e.password = 'Use at least 10 characters, including a letter and a number.'
    if (!/^\+?[0-9\s-]{9,16}$/.test(d.phone.trim())) e.phone = 'Enter a valid phone number, for example +254 700 000 000.'
  }
  if (step === 1) {
    if (!d.org.trim()) e.org = 'Enter your organisation name.'
    if (!/^[A-Za-z0-9\-/\s]{5,20}$/.test(d.regNo.trim())) e.regNo = 'Enter a registration number of 5 to 20 letters or numbers.'
    if (!d.industry) e.industry = 'Select an industry.'
    if (!d.country) e.country = 'Select a country.'
    if (d.website.trim() && !validUrl(d.website.trim())) e.website = 'Enter a valid website, like company.com.'
  }
  if (step === 2) {
    if (!d.employees) e.employees = 'Select the number of employees.'
    if (!d.departments.length) e.departments = 'Select at least one department.'
    if (!d.locations.length) e.locations = 'Add at least one business location.'
    if (!d.currency) e.currency = 'Select an operating currency.'
  }
  if (step === 3 && !d.access) e.access = 'Choose an access level.'
  return e
}