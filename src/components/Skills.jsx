import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from './Icon'
import SectionTitle from './SectionTitle'
import useReveal from '../hooks/useReveal'
import { DEV_SKILLS, TOOLS } from '../data/techs'

function Tile({ icon, label, color, mono }) {
  return (
    <div className="tile flex cursor-default items-center gap-3 px-4 py-3.5">
      <Icon
        icon={icon}
        className="tile-icon shrink-0 text-3xl"
        style={mono ? { color } : undefined}
        fallback={<span className="grid h-[1em] w-[1em] shrink-0 place-items-center text-base font-bold" style={{ color }}>{label[0]}</span>}
      />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

function Panel({ title, subtitle, items }) {
  return (
    <div data-reveal className="panel p-6 md:p-8">
      <div className="mb-6">
        <h3 className="font-heading text-xl font-semibold tracking-tight">{title}</h3>
        {subtitle && <p className="mt-1 max-w-xl text-sm text-muted">{subtitle}</p>}
      </div>
      <div data-stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((s) => <Tile key={s.label} {...s} />)}
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useTranslation()
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="skills" ref={root} className="border-t border-ink/10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle titleKey="skills.title" />
        <div className="grid gap-6">
          <Panel title={t('skills.subtitle')} subtitle={t('skills.text')} items={DEV_SKILLS} />
          <Panel title={t('skills.tools')} items={TOOLS} />
        </div>
      </div>
    </section>
  )
}
