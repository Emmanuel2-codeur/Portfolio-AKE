import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

const NAV_KEYS = ['home', 'about', 'skills', 'work', 'contact']

export default function Navbar({ toggleLang, dark, setDark }) {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]   = useState('home')

  // Scroll tracking — memoised handler
  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(s => {
      const top = s.offsetTop - 80
      if (window.scrollY >= top && window.scrollY < top + s.offsetHeight)
        setActive(s.id)
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const currentLang = i18n.language?.startsWith('en') ? 'EN' : 'FR'

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
      <div className={`mx-4 md:mx-8 rounded-2xl glass-strong shadow-lg transition-all duration-300 ${scrolled ? 'glow-blue' : ''}`}>
        <nav className="flex items-center justify-between px-5 py-3" role="navigation" aria-label="Navigation principale">

          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="font-heading font-bold text-xl text-gray-800 dark:text-white tracking-tight">
            Portfolio<span className="text-accent">.</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {NAV_KEYS.map(key => (
              <li key={key}>
                <button
                  onClick={() => scrollTo(key)}
                  aria-current={active === key ? 'page' : undefined}
                  className={`relative text-sm font-medium transition-colors duration-200 group ${
                    active === key ? 'text-accent' : 'text-gray-500 dark:text-gray-400 hover:text-accent'
                  }`}
                >
                  {t(`nav.${key}`)}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent to-transparent rounded-full transition-all duration-200 ${
                    active === key ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              title="Switch language / Changer la langue"
              aria-label={`Langue actuelle : ${currentLang}. Cliquer pour changer.`}
              className="flex items-center gap-1.5 px-3 py-2 glass rounded-xl text-xs font-bold font-heading text-gray-600 dark:text-gray-300 hover:text-accent transition-all duration-200 hover:-translate-y-0.5 select-none"
            >
              <i className="bx bx-globe text-base" aria-hidden="true" />
              {currentLang}
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setDark(!dark)}
              title={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              aria-label={dark ? 'Mode clair' : 'Mode sombre'}
              className="w-10 h-10 flex items-center justify-center glass rounded-xl text-gray-600 dark:text-gray-300 hover:text-accent transition-all duration-200 hover:-translate-y-0.5"
            >
              <i className={`bx ${dark ? 'bx-sun' : 'bx-moon'} text-lg transition-transform duration-500 ${dark ? 'rotate-45' : ''}`} aria-hidden="true" />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-label="Menu mobile"
              className="md:hidden w-10 h-10 flex items-center justify-center glass rounded-xl text-gray-700 dark:text-gray-300"
            >
              <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'} text-xl`} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden fixed top-20 right-4 w-64 glass-strong rounded-2xl shadow-xl p-5 transition-all duration-300 ${
          menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col gap-3">
          {NAV_KEYS.map(key => (
            <li key={key}>
              <button
                onClick={() => scrollTo(key)}
                className={`text-base font-medium w-full text-left px-3 py-2 rounded-xl transition-colors ${
                  active === key
                    ? 'text-accent bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-accent hover:bg-blue-50/50 dark:hover:bg-white/5'
                }`}
              >
                {t(`nav.${key}`)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
