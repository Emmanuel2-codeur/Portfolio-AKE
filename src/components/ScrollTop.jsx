import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from './Icon'
import { scrollToTop } from '../lib/smooth'

export default function ScrollTop() {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY >= 600)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <button onClick={scrollToTop} aria-label={t('ui.top')} tabIndex={show ? 0 : -1}
      className={`btn-primary fixed right-5 z-50 !h-12 !w-12 !rounded-xl !p-0 shadow-lg transition-all duration-500 ${
        show ? 'bottom-5 opacity-100' : '-bottom-20 opacity-0'
      }`}>
      <Icon icon="ph:arrow-up-bold" className="text-xl" />
    </button>
  )
}
