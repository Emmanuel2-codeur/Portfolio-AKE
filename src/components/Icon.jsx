import { Icon as Iconify } from '@iconify/react'

/**
 * Icône Iconify. Si l'icône ne charge pas (hors-ligne, nom inconnu),
 * on affiche `fallback` (ex. initiale colorée) plutôt qu'un vide.
 */
export default function Icon({ icon, className = '', fallback = null, ...rest }) {
  return (
    <Iconify
      icon={icon}
      className={className}
      aria-hidden="true"
      fallback={fallback ?? <span className={`inline-block h-[1em] w-[1em] rounded bg-current opacity-20 ${className}`} />}
      {...rest}
    />
  )
}
