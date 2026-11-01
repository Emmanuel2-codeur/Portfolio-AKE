import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import SectionTitle from './SectionTitle'
import Words from './Words'
import AboutArt from './AboutArt'
import useReveal from '../hooks/useReveal'
import { asset, prefersReducedMotion } from '../lib/asset'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 2,  labelKey: 'about.years' },
  { value: 6,  labelKey: 'about.projects' },
  { value: 12, labelKey: 'about.technologies' },
]

export default function About() {
  const { t } = useTranslation()
  const root = useRef(null)
  useReveal(root)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = +el.dataset.count
        const o = { v: 0 }
        el.textContent = '0'
        gsap.to(o, {
          v: target, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => { el.textContent = Math.round(o.v) },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={root} className="border-t border-ink/10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle titleKey="about.title" />

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-7 lg:col-span-6">
            <h3 data-reveal className="font-heading text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{t('about.subtitle')}</h3>
            {/* Le texte s'éclaircit mot après mot pendant le défilement */}
            <p data-words className="max-w-prose text-base leading-[1.8] md:text-lg"><Words text={t('about.text')} /></p>

            <div data-reveal className="grid grid-cols-3 divide-x divide-ink/10 rounded-2xl border border-ink/10 bg-surface">
              {STATS.map((s) => (
                <div key={s.labelKey} className="px-3 py-5 text-center">
                  <p className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
                    <span data-count={s.value}>{s.value}</span><span className="text-accent">+</span>
                  </p>
                  <p className="mt-1 text-xs text-muted">{t(s.labelKey)}</p>
                </div>
              ))}
            </div>

            <div data-reveal>
              <a href={asset('Cv.pdf')} download className="btn-outline">
                <Icon icon="ph:download-simple-bold" className="text-lg" />{t('home.cta')}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6"><AboutArt /></div>
        </div>
      </div>
    </section>
  )
}
