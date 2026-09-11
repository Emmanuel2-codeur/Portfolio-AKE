import { useTranslation } from 'react-i18next'
import { SectionTitle } from './About'

const DEV_SKILLS = [
  { icon: 'bxl-html5',      label: 'HTML5',       color: '#e34c26' },
  { icon: 'bxl-css3',       label: 'CSS3',        color: '#264de4' },
  { icon: 'bxl-javascript', label: 'JavaScript',  color: '#e6b800' },
  { icon: 'bxl-react',      label: 'React JS',    color: '#61dafb' },
  { icon: 'bxl-java',       label: 'Java',        color: '#f89820' },
  { icon: 'bxl-php',        label: 'PHP',         color: '#777bb4' },
  { icon: 'bx-code-curly',  label: 'C#',          color: '#9B59B6' },
  { icon: 'bxs-paint',      label: 'UX/UI',       color: '#ff6b6b' },
  {icon: 'bxl-bootstrap',  label: 'Bootstrap',   color: '#563d7c' },
  { icon: 'bxl-tailwind-css', label: 'Tailwind CSS', color: '#38bdf8' },
  { icon: 'bxl-mysql',      label: 'MySQL',       color: '#00758f' },
  { icon: 'bxl-nodejs',     label: 'Node.js',     color: '#68a063' },
  { icon: 'bxl-vuejs',      label: 'Vue.js',      color: '#42b883' },,
  
  ]

const TOOLS = [
  { icon: 'bxl-figma',      label: 'Figma',        color: '#f24e1e' },
  { icon: 'bxs-brush',      label: 'Canva',        color: '#00c4cc' },
  { icon: 'bxs-image-alt',  label: 'Photoshop',    color: '#31a8ff' },
  { icon: 'bx-terminal',    label: 'VS Code',      color: '#007acc' },
  { icon: 'bx-windows',     label: 'Visual Studio',color: '#5c2d91' },
  { icon: 'bxl-git',        label: 'Git / GitHub', color: '#f05032' },
  { icon: 'bx-data',        label: 'phpMyAdmin',   color: '#f89406' },
  { icon: 'bx-sitemap',     label: 'Star UML',     color: '#4f8ef7' },
  { icon: 'bxl-docker',     label: 'Docker',       color: '#2496ed' },
  ]

function SkillBadge({ icon, label, color, tool = false }) {
  return (
    <div
      className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl cursor-default select-none
        transition-all duration-200 hover:-translate-y-1 ${
        tool
          ? 'bg-orange-50/60 dark:bg-orange-900/10 border border-orange-200/60 dark:border-orange-700/20 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-200/30'
          : 'bg-blue-50/60  dark:bg-blue-900/10  border border-blue-200/60  dark:border-blue-700/20  hover:border-accent/50 hover:shadow-lg hover:shadow-blue-200/30'
      }`}
    >
      <i
        className={`bx ${icon} text-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
        style={{ color }}
        aria-hidden="true"
      />
      <span className={`text-sm font-semibold font-heading ${tool ? 'text-orange-700 dark:text-orange-300' : 'text-blue-700 dark:text-blue-300'}`}>
        {label}
      </span>
    </div>
  )
}

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle titleKey="skills.title" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* ── LEFT : skill blocks ── */}
          <div className="flex flex-col gap-6">

            {/* Dev skills */}
            <div className="glass rounded-3xl p-6 flex-1 flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center flex-shrink-0">
                  <i className="bx bx-code-alt text-white text-xl" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white">{t('skills.subtitle')}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('skills.text')}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {DEV_SKILLS.map(s => <SkillBadge key={s.label} {...s} />)}
              </div>
            </div>

            {/* Tools */}
            <div className="glass rounded-3xl p-6 flex-1 flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-orange-400/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent2 to-orange-300 flex items-center justify-center flex-shrink-0">
                  <i className="bx bx-wrench text-white text-xl" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 dark:text-white">{t('skills.tools')}</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {TOOLS.map(s => <SkillBadge key={s.label} {...s} tool />)}
              </div>
            </div>

          </div>

          {/* ── RIGHT : photo, same height as left column ── */}
          <div className="hidden lg:flex">
            <div className="relative group w-full">
              {/* Glow */}
              <div className="absolute -inset-3 bg-gradient-to-br from-accent/15 to-accent2/10 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500" aria-hidden="true" />
              <img
                src="assets/img/photo2.jpg"
                alt="Environnement de développement"
                loading="lazy"
                className="relative w-full h-full rounded-[2rem] object-cover border-2 border-white/60 dark:border-white/10 shadow-2xl shadow-blue-400/10 group-hover:scale-[1.01] group-hover:rotate-[0.5deg] transition-all duration-500"
                style={{ minHeight: '300px' }}
              />
              {/* Floating tag — translated */}
              <div className="absolute bottom-5 left-5 glass-strong rounded-2xl px-4 py-3 glow-blue">
                <p className="font-heading font-bold text-sm text-gray-900 dark:text-white">{t('skills.tech_count')}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('skills.mastered')}</p>
              </div>
            </div>
          </div>

          {/* Mobile-only photo */}
          <div className="lg:hidden">
            <img
              src="assets/img/photo2.jpg"
              alt="Environnement de développement"
              loading="lazy"
              className="w-full max-h-72 rounded-3xl object-cover border-2 border-white/60 dark:border-white/10 shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
