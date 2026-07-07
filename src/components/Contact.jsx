import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from './About'

const INITIAL_FORM = { name: '', email: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const [form,   setForm]   = useState(INITIAL_FORM)
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  // Auto-clear success / error message after 5 s
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => setStatus(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        'service_8idm3j8',
        'template_s4thp9m',
        { name: form.name, email: form.email, message: form.message },
        'g3MGBkuMgI8Nz9imA'
      )
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full px-4 py-3.5 glass rounded-2xl text-gray-800 dark:text-gray-100 ' +
    'placeholder-gray-400 dark:placeholder-gray-500 outline-none ' +
    'border border-transparent focus:border-accent/50 focus:shadow-lg focus:shadow-blue-400/10 ' +
    'transition-all duration-200 text-sm'

  const infos = [
    { icon: 'bx-envelope',  text: t('contact.info_email'),    href: `mailto:${t('contact.info_email')}` },
    { icon: 'bxl-whatsapp', text: t('contact.info_phone'),    href: `https://wa.me/${t('contact.info_phone').replace(/\s/g, '')}` },
    { icon: 'bx-map',       text: t('contact.info_location'), href: null },
  ]

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle titleKey="contact.title" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Info column */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white">
              {t('contact.headline')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{t('contact.sub')}</p>

            {infos.map(item => {
              const Tag = item.href ? 'a' : 'div'
              const extraProps = item.href
                ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                : {}
              return (
                <Tag
                  key={item.icon}
                  {...extraProps}
                  className="flex items-center gap-4 glass rounded-2xl px-5 py-4 hover:glow-blue transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center flex-shrink-0">
                    <i className={`bx ${item.icon} text-white text-xl`} aria-hidden="true" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium group-hover:text-accent transition-colors duration-200">
                    {item.text}
                  </span>
                </Tag>
              )
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-7 space-y-4 glow-blue">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('contact.name')}
              required
              autoComplete="name"
              className={inputCls}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t('contact.email')}
              required
              autoComplete="email"
              className={inputCls}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t('contact.msg')}
              rows={6}
              required
              className={`${inputCls} resize-none`}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3.5 bg-gradient-to-r from-accent to-blue-400 text-white font-heading font-semibold rounded-2xl shadow-lg shadow-blue-400/25 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <><i className="bx bx-loader-alt animate-spin text-lg" aria-hidden="true" />{t('contact.sending')}</>
              ) : (
                <><i className="bx bx-send text-lg" aria-hidden="true" />{t('contact.send')}</>
              )}
            </button>

            {status === 'success' && (
              <div role="alert" className="px-4 py-3 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/30 text-green-700 dark:text-green-300 text-sm font-medium text-center">
                {t('contact.success')}
              </div>
            )}
            {status === 'error' && (
              <div role="alert" className="px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 text-red-700 dark:text-red-300 text-sm font-medium text-center">
                {t('contact.error')}
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  )
}
