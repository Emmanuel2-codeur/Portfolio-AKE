import { useTranslation } from 'react-i18next'
import Split from './Split'

/** Titre de section : « /Titre » avec la barre oblique en couleur d'accent. */
export default function SectionTitle({ titleKey, aside = null }) {
  const { t } = useTranslation()
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
      <h2 data-title className="font-heading text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
        <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom">
          <span data-split className="mr-[0.08em] inline-block text-accent">/</span>
        </span>
        <Split text={t(titleKey)} by="word" />
      </h2>
      {aside}
    </div>
  )
}
