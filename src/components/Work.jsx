import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import SectionTitle from './SectionTitle'
import useReveal from '../hooks/useReveal'
import { PROJECTS } from '../data/techs'
import { asset, prefersReducedMotion } from '../lib/asset'

gsap.registerPlugin(ScrollTrigger)
const FILTERS = ['all', 'web', 'desktop']

function ProjectCard({ project, data }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const long = data.desc.length > 170

  return (
    <article data-card className="group panel flex flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-xl">
      <a href={project.link} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true"
         className="relative block aspect-[16/10] overflow-hidden border-b border-ink/10">
        <img src={asset(project.img)} alt="" loading="lazy" width="1200" height="750"
             className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="panel absolute left-3 top-3 px-2.5 py-1 text-xs font-medium" style={{ borderRadius: '0.5rem' }}>
          {t(`work.filters.${project.type}`)}
        </span>
      </a>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight">{data.title}</h3>
          <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${t('work.view')} — ${data.title}`}
             className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink/15 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
            <Icon icon="ph:arrow-up-right-bold" className="text-base" />
          </a>
        </div>
        <p className={`text-sm leading-relaxed text-muted ${open ? '' : 'line-clamp-3'}`}>{data.desc}</p>
        {long && (
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="self-start text-xs font-semibold text-accent hover:underline">
            {open ? t('work.less') : t('work.more')}
          </button>
        )}
        <div className="mt-auto flex items-center gap-2.5 pt-3">
          {project.tags.map((tag) => <Icon key={tag} icon={tag} className="text-xl" />)}
        </div>
      </div>
    </article>
  )
}

export default function Work() {
  const { t } = useTranslation()
  const root = useRef(null)
  const grid = useRef(null)
  const userFiltered = useRef(false)
  const [filter, setFilter] = useState('all')
  useReveal(root)

  const projects = t('work.projects', { returnObjects: true })
  const all = (Array.isArray(projects) ? projects : [])
    .map((data, i) => ({ data, project: PROJECTS[i], i }))
    .filter((p) => p.project)
  const shown = all.filter((p) => filter === 'all' || p.project.type === filter)

  // Cascade des cartes : au scroll la 1re fois, immédiatement quand on change de filtre
  useEffect(() => {
    if (prefersReducedMotion() || !grid.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-card]', {
        y: 36, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: userFiltered.current ? undefined : { trigger: grid.current, start: 'top 85%', once: true },
      })
    }, grid)
    return () => ctx.revert()
  }, [filter])

  const pick = (f) => { userFiltered.current = true; setFilter(f) }

  const filters = (
    <div role="tablist" className="panel inline-flex gap-1 p-1" style={{ borderRadius: '0.75rem' }}>
      {FILTERS.map((f) => (
        <button key={f} role="tab" aria-selected={filter === f} onClick={() => pick(f)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${filter === f ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}>
          {t(`work.filters.${f}`)}
        </button>
      ))}
    </div>
  )

  return (
    <section id="work" ref={root} className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle titleKey="work.title" aside={<div data-reveal>{filters}</div>} />
        <div ref={grid} className="grid gap-6 md:grid-cols-2">
          {shown.map(({ data, project, i }) => <ProjectCard key={i} project={project} data={data} />)}
        </div>
      </div>
    </section>
  )
}
