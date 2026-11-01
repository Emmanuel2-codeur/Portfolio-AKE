import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from './Icon'
import SectionTitle from './SectionTitle'
import useReveal from '../hooks/useReveal'
import { SERVICE_ICONS } from '../data/techs'
import { SERVICE_ART } from './ServiceArt'

export default function Services() {
  const { t } = useTranslation()
  const root = useRef(null)
  useReveal(root)
  const items = t('services.items', { returnObjects: true })
  const list = Array.isArray(items) ? items : []

  return (
    <section id="services" ref={root} className="border-t border-ink/10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle titleKey="services.title" />
        <div data-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => {
            const Art = SERVICE_ART[i]
            return (
              <article key={i} className="group panel flex flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-xl">
                <div className="dots-flat h-44 overflow-hidden border-b border-ink/10 bg-accent/[0.05]">
                  <div className="h-full w-full p-3 transition-transform duration-500 group-hover:scale-[1.05]">{Art && <Art />}</div>
                </div>
                <div className="relative flex flex-1 flex-col p-6 pt-9">
                  <div className="absolute -top-6 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-on-accent shadow-lg ring-4 ring-surface transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon icon={SERVICE_ICONS[i]} className="text-2xl" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
