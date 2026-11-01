import { useTranslation } from 'react-i18next'
import Icon from './Icon'
import { SOCIALS } from '../data/techs'
import { scrollToTop } from '../lib/smooth'
import { asset } from '../lib/asset'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-ink/10 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src={asset('assets/img/avatar.webp')} alt="" width="44" height="44" className="h-11 w-11 rounded-full border-2 border-accent object-cover" />
          <div>
            <p className="font-heading text-lg font-semibold leading-tight tracking-tight">Emmanuel-Dev</p>
            <p className="text-sm text-muted">{t('footer.copy')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social" style={{ '--c': s.color }}>
              <Icon icon={s.icon} className="text-xl" />
            </a>
          ))}
          <button onClick={scrollToTop} aria-label={t('ui.top')} className="social ml-2 !text-ink hover:!bg-ink hover:!text-bg" style={{ '--c': 'rgb(var(--ink))' }}>
            <Icon icon="ph:arrow-up-bold" className="text-lg" />
          </button>
        </div>
      </div>
    </footer>
  )
}
