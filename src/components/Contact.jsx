import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import Icon from './Icon'
import SectionTitle from './SectionTitle'
import Words from './Words'
import ContactArt from './ContactArt'
import useReveal from '../hooks/useReveal'
import { prefersReducedMotion } from '../lib/asset'

const INITIAL_FORM = { name: '', email: '', message: '', company: '' } // « company » = piège anti-robots (champ caché)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Identifiants EmailJS : surchargeables via .env (voir .env.example)
const EMAILJS = {
  service:  import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_8idm3j8',
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_s4thp9m',
  key:      import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'g3MGBkuMgI8Nz9imA',
}

export default function Contact() {
  const { t } = useTranslation()
  const root = useRef(null)
  const formRef = useRef(null)
  useReveal(root)
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'invalid' | 'sending' | 'success' | 'error'

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => setStatus(null), 6000)
      return () => clearTimeout(timer)
    }
  }, [status])

  // Règles de validation : rien ne part tant qu'elles ne sont pas toutes respectées
  const validate = (v) => {
    const e = {}
    if (v.name.trim().length < 2) e.name = t('contact.errors.name')
    if (!EMAIL_RE.test(v.email.trim())) e.email = t('contact.errors.email')
    if (v.message.trim().length < 10) e.message = t('contact.errors.message')
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      const next = { ...errors }
      delete next[name]
      setErrors(next)
      if (status === 'invalid' && Object.keys(next).length === 0) setStatus(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    if (form.company) return // un robot a rempli le champ caché : on ignore silencieusement

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('invalid')
      requestAnimationFrame(() => {
        const bad = formRef.current?.querySelectorAll('[aria-invalid="true"]')
        if (!bad?.length) return
        bad[0].focus()
        if (!prefersReducedMotion()) {
          gsap.to(bad, { keyframes: { x: [-8, 8, -5, 5, 0] }, duration: 0.45, ease: 'power2.out', onComplete: () => gsap.set(bad, { clearProps: 'x' }) })
        }
      })
      return
    }

    setStatus('sending')
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(EMAILJS.service, EMAILJS.template,
        { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }, EMAILJS.key)
      setStatus('success')
      setForm(INITIAL_FORM)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const phoneDigits = t('contact.info_phone').replace(/\D/g, '')
  const infos = [
    { icon: 'ph:envelope-simple-duotone', cls: 'text-accent', text: t('contact.info_email'), href: `mailto:${t('contact.info_email')}` },
    { icon: 'logos:whatsapp-icon', cls: '', text: t('contact.info_phone'), href: `https://wa.me/${phoneDigits}` },
    { icon: 'ph:map-pin-duotone', cls: 'text-accent', text: t('contact.info_location'), href: null },
  ]

  const fieldProps = (name) => ({
    name, value: form[name], onChange: handleChange,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `err-${name}` : undefined,
  })
  const FieldError = ({ name }) => errors[name]
    ? <p id={`err-${name}`} className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors[name]}</p>
    : null

  return (
    <section id="contact" ref={root} className="border-t border-ink/10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle titleKey="contact.title" />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <h3 data-reveal className="font-heading text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{t('contact.headline')}</h3>
            <p data-words className="max-w-md leading-relaxed"><Words text={t('contact.sub')} /></p>

            <ContactArt />

            <div data-stagger className="space-y-3 pt-2">
              {infos.map((item) => {
                const Tag = item.href ? 'a' : 'div'
                const extra = item.href ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' } : {}
                return (
                  <Tag key={item.icon} {...extra} className="tile flex items-center gap-4 px-5 py-4">
                    <Icon icon={item.icon} className={`tile-icon text-2xl ${item.cls}`} />
                    <span className="text-sm font-semibold">{item.text}</span>
                  </Tag>
                )
              })}
            </div>
          </div>

          <form ref={formRef} data-reveal onSubmit={handleSubmit} noValidate className="panel space-y-5 p-6 md:p-8">
            <div>
              <input type="text" {...fieldProps('name')} placeholder={t('contact.name')} aria-label={t('contact.name')}
                     required maxLength={80} autoComplete="name" className="field" />
              <FieldError name="name" />
            </div>
            <div>
              <input type="email" {...fieldProps('email')} placeholder={t('contact.email')} aria-label={t('contact.email')}
                     required maxLength={120} autoComplete="email" className="field" />
              <FieldError name="email" />
            </div>
            <div>
              <textarea {...fieldProps('message')} placeholder={t('contact.msg')} aria-label={t('contact.msg')}
                        required maxLength={2000} rows={6} className="field resize-none" />
              <FieldError name="message" />
            </div>

            {/* Champ piège : invisible pour les humains */}
            <input type="text" name="company" value={form.company} onChange={handleChange} tabIndex={-1} autoComplete="off"
                   aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
              {status === 'sending'
                ? <><Icon icon="ph:spinner-gap-bold" className="animate-spin text-lg" />{t('contact.sending')}</>
                : <><Icon icon="ph:paper-plane-tilt-fill" className="text-lg" />{t('contact.send')}</>}
            </button>

            {status === 'invalid' && (
              <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-700 dark:text-red-300">
                {t('contact.errors.fill')}
              </div>
            )}
            {status === 'success' && (
              <div role="alert" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {t('contact.success')}
              </div>
            )}
            {status === 'error' && (
              <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-700 dark:text-red-300">
                {t('contact.error')}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
