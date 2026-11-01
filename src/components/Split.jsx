/**
 * Découpe un texte en mots/lettres masqués, prêts à être animés par GSAP
 * (les enfants portent l'attribut data-split). Le texte reste lisible par les lecteurs d'écran.
 */
export default function Split({ text, by = 'word', innerClass = '', className = '' }) {
  const parts = by === 'char' ? Array.from(text) : text.split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {parts.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom ${
            by === 'word' && i < parts.length - 1 ? 'mr-[0.26em]' : ''
          }`}
        >
          <span data-split className={`inline-block will-change-transform ${innerClass}`}>
            {p === ' ' ? '\u00A0' : p}
          </span>
        </span>
      ))}
    </span>
  )
}
