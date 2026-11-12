export const brand = { name: 'Axiom', tagline: 'Transforming Complexity Into Clarity.' }

const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// Swap any URL here. SmartImage falls back to a navy gradient if one fails to load.
export const images = {
  hero: u('photo-1486718448742-163732cd1555'),
}