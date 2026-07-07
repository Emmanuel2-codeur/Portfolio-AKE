import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import About     from './components/About'
import Skills    from './components/Skills'
import Work      from './components/Work'
import Contact   from './components/Contact'
import Footer    from './components/Footer'
import ScrollTop from './components/ScrollTop'

export default function App() {
  const { i18n } = useTranslation()
  const [dark, setDark] = useState(() => localStorage.getItem('portfolio-theme') === 'dark')

  // Sync dark-mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleLang = () => {
    const next = i18n.language?.startsWith('en') ? 'fr' : 'en'
    i18n.changeLanguage(next)
  }

  return (
    <div className="min-h-screen bg-page font-body text-gray-900 dark:text-gray-100 relative overflow-x-hidden">

      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-400/[0.15] dark:bg-blue-500/[0.08] blur-[80px]" />
        <div className="absolute top-1/3 -right-24  w-80 h-80 rounded-full bg-orange-300/10 dark:bg-purple-500/[0.08] blur-[80px]" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-blue-300/10 dark:bg-blue-400/[0.06] blur-[80px]" />
      </div>

      <div className="relative z-10">
        <Navbar toggleLang={toggleLang} dark={dark} setDark={setDark} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Work />
          <Contact />
        </main>
        <Footer />
        <ScrollTop />
      </div>

    </div>
  )
}
