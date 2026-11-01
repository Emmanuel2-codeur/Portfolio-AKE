import { Fragment } from 'react'

/** Découpe un texte en mots (data-w) pour l'effet « le texte s'éclaire en scrollant » (voir useReveal). */
export default function Words({ text }) {
  return text.split(' ').map((w, i, a) => (
    <Fragment key={i}>
      <span data-w>{w}</span>{i < a.length - 1 ? ' ' : ''}
    </Fragment>
  ))
}
