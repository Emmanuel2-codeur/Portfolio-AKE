// Préfixe les chemins publics avec la base Vite (fonctionne aussi en sous-dossier)
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
