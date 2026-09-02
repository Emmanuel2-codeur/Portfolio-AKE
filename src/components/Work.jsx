import { useTranslation } from 'react-i18next'
import { SectionTitle } from './About'

const projectLinks = [
  'https://bataille-des-charos.vercel.app/',
  'https://github.com/zaks-web/RESERVATIONDESALLE.git',
  'https://github.com/Emmanuel2-codeur/club-video-java',
  'https://github.com/max-dev-max/Projet_de_vente_en_ligne',
  'https://portfolio-ake.vercel.app/',
  
]
const projectImgs = [
  'assets/img/photo3.jpg',
  'assets/img/photo4.jpg',
  'assets/img/photo5.jpg',
  'assets/img/photo6.jpg',
  'assets/img/photo7.jpg'

]

export default function Work() {
  const { t } = useTranslation()
  const projects = t('work.projects', { returnObjects: true })

  return (
    <section id="work" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle titleKey="work.title" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/60 dark:border-white/10 shadow-lg hover:shadow-2xl hover:shadow-blue-400/15 hover:-translate-y-2 transition-all duration-300 flex flex-col bg-white/30 dark:bg-white/5">

              {/* Image */}
              <div className="relative overflow-hidden h-48 flex-shrink-0">
                <img
                  src={projectImgs[i]}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Number badge */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-xl glass-strong text-xs font-bold font-heading text-accent flex items-center justify-center">
                  {String(i+1).padStart(2,'0')}
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Description card */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                  {p.desc}
                </p>
                <a
                  href={projectLinks[i] || '#'}
                  target={projectLinks[i] ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold font-heading text-accent hover:gap-2.5 transition-all duration-200 group/link mt-auto"
                >
                  {t('work.view')}
                  <i className="bx bx-right-arrow-alt text-lg group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
