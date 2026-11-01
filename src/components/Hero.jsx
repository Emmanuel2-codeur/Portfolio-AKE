import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import Split from './Split'
import Magnetic from './Magnetic'
import { SOCIALS } from '../data/techs'
import { asset, prefersReducedMotion } from '../lib/asset'
import { scrollToId } from '../lib/smooth'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ ready }) {
  const { t } = useTranslation()
  const root = useRef(null)

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('[data-hero-pill]', { y: 16, opacity: 0, duration: 0.6, clearProps: 'all' })
        // Le grand titre se révèle mot à mot, chaque mot monte depuis un masque
        .from('[data-split]', { yPercent: 115, rotate: 3, duration: 0.95, stagger: 0.035 }, '<0.1')
        .from('[data-hero-fade]', { y: 22, opacity: 0, duration: 0.8, stagger: 0.1, clearProps: 'all' }, '-=0.5')
        .fromTo('[data-photo]', { clipPath: 'inset(100% 0% 0% 0% round 16px)' },
                { clipPath: 'inset(0% 0% 0% 0% round 16px)', duration: 1.3, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.1)
        .from('[data-photo-img]', { scale: 1.25, duration: 1.6, ease: 'expo.out' }, 0.1)
        .from('[data-frame]', { opacity: 0, x: -14, y: -14, duration: 0.9 }, 0.9)
        .from('[data-chip]', { y: 18, opacity: 0, duration: 0.7, stagger: 0.12, clearProps: 'all' }, 1.1)

      gsap.fromTo('[data-photo-img]', { yPercent: -4 }, {
        yPercent: 4, ease: 'none',
        scrollTrigger: { trigger: '[data-photo]', start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section id="home" ref={root} className="relative px-4 pb-16 pt-28 md:pt-36">
      <div className="bg-dots pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-10">

        {/* ── Texte : le grand titre est le message principal ── */}
        <div className="lg:col-span-7">
          <div data-hero-pill className="panel mb-8 inline-flex items-center gap-2.5 px-4 py-2 text-sm font-medium" style={{ borderRadius: '9999px' }}>
            <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {t('home.available')}
          </div>

          <h1 className="font-heading text-[clamp(1.95rem,3.7vw,3.2rem)] font-semibold leading-[1.13] tracking-[-0.03em]">
            <Split text={t('home.headline_a')} by="word" />{' '}
            <Split text={t('home.headline_b')} by="word" className="text-ink/45" />
          </h1>

          {/* Le nom prend la place de l'ancienne phrase d'accroche */}
          <div data-hero-fade className="mt-9 border-l-2 border-accent pl-4">
            <p className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              {t('home.name')} {t('home.surname')}
            </p>
            <p className="mt-1 text-base text-muted md:text-lg">{t('home.job')}</p>
          </div>

          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic href={asset('Cv.pdf')} download className="btn-primary" strength={0.2}>
              <Icon icon="ph:download-simple-bold" className="text-lg" />
              {t('home.cta')}
            </Magnetic>
            <button onClick={() => scrollToId('contact')} className="btn-outline">{t('home.contact')}</button>
          </div>

          <div data-hero-fade className="mt-9 flex items-center gap-2.5">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social" style={{ '--c': s.color }}>
                <Icon icon={s.icon} className="text-xl" />
              </a>
            ))}
          </div>
        </div>

        {/* ── Portrait rectangulaire ── */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div data-frame aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent md:translate-x-4 md:translate-y-4" />
            <div data-photo className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink/10 bg-surface">
              <img data-photo-img src={asset('assets/img/photo1.webp')} alt={t('home.alt')} width="922" height="1152"
                   className="absolute inset-x-0 -top-[5%] h-[110%] w-full object-cover" />
            </div>

            <div data-chip className="panel absolute -left-3 bottom-8 flex items-center gap-3 px-4 py-3 shadow-xl md:-left-8">
              <span className="font-heading text-3xl font-semibold leading-none text-accent">2+</span>
              <span className="text-xs leading-tight text-muted">{t('home.chip_exp')}</span>
            </div>
            <div data-chip className="panel absolute right-4 top-4 flex items-center gap-2 px-3 py-2 text-xs font-medium shadow-lg">
              <Icon icon="ph:map-pin-fill" className="text-base text-accent" />
              {t('contact.info_location')}
            </div>
            <div data-chip className="panel absolute -right-2 bottom-24 flex items-center -space-x-2 px-3 py-2.5 shadow-lg md:-right-6" aria-hidden="true">
              {['logos:react', 'logos:c-sharp', 'logos:java'].map((i) => (
                <span key={i} className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 bg-bg"><Icon icon={i} className="text-lg" /></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
