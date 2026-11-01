import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader    from './components/Loader'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Marquee   from './components/Marquee'
import Work      from './components/Work'
import Services  from './components/Services'
import About     from './components/About'
import Skills    from './components/Skills'
import Contact   from './components/Contact'
import Footer    from './components/Footer'
import ScrollTop from './components/ScrollTop'
import { initSmooth, destroySmooth, getLenis } from './lib/smooth'

// Thème : choix mémorisé, sinon préférence du système
const readTheme = () => {
  try {
    const s = localStorage.getItem('portfolio-theme')
    if (s) return s === 'dark'
  } catch { /* stockage indisponible */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function App() {
  const { i18n } = useTranslation()
  const [dark, setDark] = useState(readTheme)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light') } catch { /* ignoré */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0a0c11' : '#f5f6f8')
  }, [dark])

  // Défilement fluide (Lenis) : bloqué pendant l'intro, libéré quand le rideau se lève
  useEffect(() => {
    initSmooth()?.stop()
    return () => destroySmooth()
  }, [])
  useEffect(() => { if (ready) getLenis()?.start() }, [ready])

  // Recalcule les positions ScrollTrigger quand la mise en page change (polices, images, langue)
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => clearTimeout(id)
  }, [i18n.language])

  const toggleLang = () => i18n.changeLanguage(i18n.language?.startsWith('en') ? 'fr' : 'en')

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Loader onReveal={() => setReady(true)} />

      {/* Repères verticaux discrets (grille d'architecte) */}
      <div className="pointer-events-none fixed inset-0 z-0 hidden lg:block" aria-hidden="true">
        <div className="mx-auto h-full max-w-[75rem] border-x border-ink/[0.07]" />
      </div>

      <div className="relative z-10">
        <Navbar toggleLang={toggleLang} dark={dark} setDark={setDark} />
        <main>
          <Hero ready={ready} />
          <Marquee />
          <Work />
          <Services />
          <About />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <ScrollTop />
      </div>
    </div>
  )
}
