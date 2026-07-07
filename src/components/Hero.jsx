import { useTranslation } from 'react-i18next'

const SOCIALS = [
  { icon: 'bxl-linkedin', href: 'https://www.linkedin.com/in/emmanuel-adande-3b1432300/', label: 'LinkedIn' },
  { icon: 'bxl-whatsapp', href: 'https://wa.me/+22896470752',                              label: 'WhatsApp' },
  { icon: 'bxl-facebook', href: 'https://www.facebook.com/share/12H8rA8UTGx/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: 'bxl-github',   href: 'https://github.com/Emmanuel2-codeur',                     label: 'GitHub' },
]

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section id="home" className="min-h-screen flex items-center pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ── LEFT : text ── */}
        <div className="fade-up">

          {/* Greeting badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 mb-6 glow-blue">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            {t('home.greeting')}
          </div>

          <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight text-gray-900 dark:text-white mb-4">
            {t('home.iam')}<br />
            <span className="text-gradient">{t('home.name')}</span>
          </h1>

          <p className="text-xl md:text-2xl font-heading font-semibold text-gray-500 dark:text-gray-400 mb-8">
            {t('home.job')}
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="Cv.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-accent to-blue-400 text-white font-heading font-semibold rounded-2xl shadow-lg shadow-blue-400/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              {t('home.cta')}
              <i className="bx bx-download text-lg" aria-hidden="true" />
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 glass rounded-2xl font-heading font-semibold text-accent border border-blue-200 dark:border-blue-800 hover:-translate-y-1 hover:glow-blue transition-all duration-300"
            >
              {t('nav.contact')}
              <i className="bx bx-message-rounded text-lg" aria-hidden="true" />
            </button>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-10">
            {SOCIALS.map(s => (
              <a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 flex items-center justify-center glass rounded-2xl text-gray-500 dark:text-gray-400 hover:text-accent hover:-translate-y-1 hover:glow-blue transition-all duration-200"
              >
                <i className={`bx ${s.icon} text-xl`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT : photo ── */}
        <div className="flex justify-center items-center fade-up delay-300">
          <div className="relative float-anim">

            {/* Rotating gradient ring */}
            <div className="hero-ring relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-blue-300 to-accent2 opacity-20 blur-xl" aria-hidden="true" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/60 dark:border-white/10 shadow-2xl shadow-blue-400/20 bg-gradient-to-br from-accent to-blue-400">
                <img
                  src="assets/img/photo0.png"
                  alt="Portrait d'Emmanuel ADANDE, développeur & designer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>

            {/* Floating badge — exp */}
            <div className="absolute -bottom-4 -left-6 glass-strong rounded-2xl px-4 py-3 glow-blue fade-up delay-500">
              <p className="font-heading font-bold text-2xl text-accent">2+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('home.badge_exp')}</p>
            </div>

            {/* Floating badge — projects */}
            <div className="absolute -top-4 -right-6 glass-strong rounded-2xl px-4 py-3 glow-blue fade-up delay-400">
              <p className="font-heading font-bold text-2xl text-accent">5+</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{t('home.badge_projects')}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
