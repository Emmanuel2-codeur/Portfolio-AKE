import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import { asset, prefersReducedMotion } from '../lib/asset'

gsap.registerPlugin(ScrollTrigger)

const K = ({ children }) => <span className="text-accent">{children}</span>
const S = ({ children }) => <span className="text-emerald-600 dark:text-emerald-400">{children}</span>
const P = ({ children }) => <span className="text-muted">{children}</span>

/** Illustration « espace de dev » : éditeur de code animé + cartes flottantes. */
export default function AboutArt() {
  const { t } = useTranslation()
  const root = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 80%', once: true } })
      tl.from('[data-ide]', { y: 50, opacity: 0, scale: 0.96, duration: 0.9, ease: 'power3.out' })
        .from('[data-line]', { opacity: 0, x: -14, duration: 0.45, stagger: 0.14, ease: 'power2.out' }, '-=0.3')
        .from('[data-float]', { y: 30, opacity: 0, scale: 0.9, duration: 0.7, stagger: 0.15, ease: 'back.out(1.6)' }, '-=0.5')
        .fromTo('[data-ring]', { strokeDashoffset: 113 }, { strokeDashoffset: 38, duration: 1.4, ease: 'power3.out' }, '<')
        .add(() => {
          gsap.utils.toArray('[data-float]').forEach((el, i) => {
            gsap.to(el, { y: i % 2 ? 8 : -8, duration: 2.8 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
          })
        })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative mx-auto w-full max-w-lg pb-12 pt-6">
      <div className="dots-flat absolute inset-x-0 inset-y-0 -z-10 rounded-[2rem] bg-accent/[0.05]" aria-hidden="true" />

      {/* Fenêtre d'éditeur */}
      <div data-ide className="panel mx-3 overflow-hidden shadow-2xl sm:mx-6">
        <div className="flex items-center gap-2 border-b border-ink/10 bg-ink/[0.03] px-4 pt-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/20" /><span className="h-2.5 w-2.5 rounded-full bg-ink/20" /><span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
          <div className="ml-3 flex text-xs">
            <span className="rounded-t-md border-b-2 border-accent bg-surface px-3 py-2 font-medium">emmanuel.js</span>
            <span className="px-3 py-2 text-muted">App.jsx</span>
          </div>
        </div>
        <div className="grid grid-cols-[2rem_1fr] gap-x-3 p-5 font-mono text-[12.5px] leading-7 sm:text-[13px]">
          <div className="select-none text-right text-muted/50" aria-hidden="true">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => <div key={n}>{n}</div>)}
          </div>
          <div className="min-w-0 overflow-x-auto whitespace-pre text-ink">
            <div data-line><K>const</K> developer <P>=</P> <P>{'{'}</P></div>
            <div data-line>{'  '}name<P>:</P> <S>"Emmanuel ADANDE"</S><P>,</P></div>
            <div data-line>{'  '}role<P>:</P> <S>"{t('home.job')}"</S><P>,</P></div>
            <div data-line>{'  '}stack<P>: [</P><S>"React"</S><P>,</P> <S>"C#"</S><P>,</P> <S>"Java"</S><P>],</P></div>
            <div data-line>{'  '}location<P>:</P> <S>"{t('contact.info_location')}"</S><P>,</P></div>
            <div data-line>{'  '}available<P>:</P> <K>true</K><P>,</P></div>
            <div data-line><P>{'}'}</P><span className="caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-accent" /></div>
          </div>
        </div>
      </div>

      {/* Cartes flottantes */}
      <div data-float className="panel absolute right-0 top-0 flex items-center gap-3 px-3.5 py-2.5 shadow-xl sm:-right-2">
        <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90" aria-hidden="true">
          <circle cx="22" cy="22" r="18" className="stroke-ink/10" strokeWidth="5" fill="none" />
          <circle data-ring cx="22" cy="22" r="18" className="stroke-accent" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="113" strokeDashoffset="38" />
        </svg>
        <div><p className="font-heading text-lg font-semibold leading-none">6+</p><p className="mt-1 text-[11px] text-muted">{t('home.chip_projects')}</p></div>
      </div>

      <div data-float className="panel absolute bottom-2 left-0 flex items-center gap-3 px-3.5 py-2.5 shadow-xl sm:-left-2">
        <img src={asset('assets/img/avatar.webp')} alt="" width="40" height="40" className="h-10 w-10 rounded-full border border-ink/10 object-cover" />
        <div>
          <p className="font-heading text-sm font-semibold leading-none">Emmanuel-Dev</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />{t('about.card_status_value')}</p>
        </div>
      </div>

      <div data-float className="absolute bottom-0 right-4 flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2 font-mono text-[11px] text-bg shadow-xl sm:right-2">
        <Icon icon="ph:check-circle-fill" className="text-base text-emerald-400" />
        npm run build
      </div>
    </div>
  )
}
