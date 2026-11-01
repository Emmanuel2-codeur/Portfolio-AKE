import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import { scrollToId } from '../lib/smooth'
import { asset } from '../lib/asset'
import { PROJECTS, SERVICE_ICONS } from '../data/techs'

gsap.registerPlugin(ScrollTrigger)

const NAV = [
  { id: 'home' },
  { id: 'work', count: PROJECTS.length },
  { id: 'services', count: SERVICE_ICONS.length },
  { id: 'about' },
  { id: 'skills' },
  { id: 'contact' },
]

export default function Navbar({ toggleLang, dark, setDark }) {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const bar = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      NAV.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el, start: 'top 55%', end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(id),
        })
      })
      ScrollTrigger.create({ start: 16, end: 'max', onUpdate: (s) => setScrolled(s.scroll() > 16) })
      gsap.to(bar.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const go = (id) => { scrollToId(id); setMenuOpen(false) }
  const currentLang = i18n.language?.startsWith('en') ? 'EN' : 'FR'

  return (
    <header className={`fixed left-0 top-0 z-50 w-full border-b transition-colors duration-300 ${
      scrolled || menuOpen ? 'border-ink/10 bg-bg/85 backdrop-blur-xl' : 'border-transparent bg-transparent'
    }`}>
      <nav aria-label={t('ui.nav')} className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <button onClick={() => go('home')} className="flex items-center gap-3" aria-label="Emmanuel-Dev">
          <img src={asset('assets/img/avatar.webp')} alt="" width="40" height="40"
               className="h-10 w-10 rounded-full border-2 border-accent object-cover" />
          <span className="font-heading text-[15px] font-semibold tracking-tight">Emmanuel-Dev</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map(({ id, count }) => (
            <li key={id}>
              <button onClick={() => go(id)} aria-current={active === id ? 'page' : undefined}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${active === id ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                {t(`nav.${id}`)}
                {count && <sup className="ml-1 text-[10px] font-semibold text-accent">{count}</sup>}
                <span className={`absolute inset-x-3.5 -bottom-[13px] h-0.5 origin-left bg-accent transition-transform duration-300 ${active === id ? 'scale-x-100' : 'scale-x-0'}`} />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={toggleLang} aria-label={t('ui.lang')} title={t('ui.lang')}
                  className="panel flex h-10 items-center gap-1.5 px-3 text-xs font-semibold" style={{ borderRadius: '0.75rem' }}>
            <Icon icon="ph:translate-bold" className="text-base text-accent" />{currentLang}
          </button>
          <button onClick={() => setDark(!dark)} aria-label={dark ? t('ui.light') : t('ui.dark')} title={dark ? t('ui.light') : t('ui.dark')}
                  className="panel grid h-10 w-10 place-items-center" style={{ borderRadius: '0.75rem' }}>
            <Icon icon={dark ? 'ph:sun-bold' : 'ph:moon-bold'} className="text-lg" />
          </button>
          <button onClick={() => go('contact')} className="btn-primary hidden !py-2.5 md:inline-flex">{t('home.contact')}</button>
          <button onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} aria-label={t('ui.menu')}
                  className="panel grid h-10 w-10 place-items-center lg:hidden" style={{ borderRadius: '0.75rem' }}>
            <Icon icon={menuOpen ? 'ph:x-bold' : 'ph:list-bold'} className="text-lg" />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div aria-hidden={!menuOpen}
           className={`overflow-hidden border-t border-ink/10 transition-[max-height,opacity] duration-300 lg:hidden ${menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 border-transparent opacity-0'}`}>
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          {NAV.map(({ id, count }) => (
            <li key={id}>
              <button onClick={() => go(id)} tabIndex={menuOpen ? 0 : -1}
                      className={`flex w-full items-center justify-between border-b border-ink/5 py-3.5 text-left text-lg font-medium ${active === id ? 'text-accent' : ''}`}>
                {t(`nav.${id}`)}
                {count && <span className="text-xs font-semibold text-muted">{count}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div ref={bar} aria-hidden="true" className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 bg-accent" />
    </header>
  )
}
