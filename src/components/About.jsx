import { useTranslation } from 'react-i18next'

export function SectionTitle({ titleKey }) {
  const { t } = useTranslation()
  return (
    <div className="text-center mb-16">
      <h2 className="font-heading font-bold text-4xl md:text-5xl text-gradient inline-block">
        {t(titleKey)}
      </h2>
      <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-accent to-accent2" />
    </div>
  )
}

export default function About() {
  const { t } = useTranslation()

  const stats = [
    { value:'2+', labelKey:'about.years' },
    { value:'5+', labelKey:'about.projects' },
    { value:'5+', labelKey:'about.technologies' },
  ]

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle titleKey="about.title" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-accent2/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <img src="assets/img/photo1.jpg" alt="Emmanuel ADANDE"
                className="relative w-72 md:w-80 rounded-3xl object-cover border-2 border-white/60 dark:border-white/10 shadow-2xl shadow-blue-400/10 group-hover:scale-[1.02] transition-transform duration-500" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-blue-400 opacity-20 blur-md" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 dark:text-white leading-tight">
              {t('about.subtitle')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base">
              {t('about.text')}
            </p>
            <div className="flex gap-4 flex-wrap pt-2">
              {stats.map(s => (
                <div key={s.labelKey} className="glass rounded-2xl px-5 py-4 text-center glow-blue flex-1 min-w-[90px]">
                  <p className="font-heading font-bold text-2xl text-gradient">{s.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{t(s.labelKey)}</p>
                </div>
              ))}
            </div>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}) }}
               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-blue-400 text-white font-heading font-semibold rounded-2xl shadow-lg shadow-blue-400/25 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              {t('nav.contact')} <i className="bx bx-right-arrow-alt text-lg" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
