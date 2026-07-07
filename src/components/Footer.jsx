import { useTranslation } from 'react-i18next'

const socials = [
  { icon:'bxl-facebook',  href:'https://www.facebook.com/share/12H8rA8UTGx/?mibextid=wwXIfr' },
  { icon:'bxl-instagram', href:'https://www.instagram.com/emmanuel__228' },
  { icon:'bxl-github',    href:'https://github.com/Emmanuel2-codeur' },
  { icon:'bxl-linkedin',  href:'https://www.linkedin.com/in/emmanuel-adande-3b1432300/' },
]

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="py-12 px-4 glass-strong border-t border-white/40 dark:border-white/5">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="font-heading font-bold text-3xl text-gray-900 dark:text-white tracking-tight">
          Emmanuel ADANDE<span className="text-accent">.</span>
        </p>
        <div className="flex justify-center gap-3">
          {socials.map(s => (
            <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer"
               className="w-11 h-11 flex items-center justify-center glass rounded-2xl text-gray-500 dark:text-gray-400 hover:text-accent hover:-translate-y-1 hover:glow-blue transition-all duration-200">
              <i className={`bx ${s.icon} text-xl`} />
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500">{t('footer.copy')}</p>
      </div>
    </footer>
  )
}
