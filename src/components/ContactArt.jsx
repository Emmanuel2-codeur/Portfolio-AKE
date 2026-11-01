import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { asset, prefersReducedMotion } from '../lib/asset'

gsap.registerPlugin(ScrollTrigger)

/** Illustration de conversation : les messages apparaissent un à un, puis l'indicateur de saisie pulse. */
export default function ContactArt() {
  const { t } = useTranslation()
  const root = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 85%', once: true } })
        .from('[data-msg]', { y: 24, opacity: 0, scale: 0.92, duration: 0.6, stagger: 0.9, ease: 'back.out(1.6)', clearProps: 'all' })
      gsap.to('[data-dot]', { y: -4, duration: 0.45, stagger: { each: 0.15, repeat: -1, yoyo: true }, ease: 'sine.inOut' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="panel overflow-hidden">
      <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-3.5">
        <img src={asset('assets/img/avatar.webp')} alt="" width="36" height="36" className="h-9 w-9 rounded-full border border-ink/10 object-cover" />
        <div>
          <p className="font-heading text-sm font-semibold leading-none">Emmanuel-Dev</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />{t('contact.online')}</p>
        </div>
      </div>
      <div className="dots-flat space-y-3 bg-accent/[0.03] p-5">
        <div data-msg className="max-w-[82%] rounded-2xl rounded-bl-md border border-ink/10 bg-surface px-4 py-2.5 text-sm">{t('contact.chat_1')}</div>
        <div data-msg className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-sm text-on-accent">{t('contact.chat_2')}</div>
        <div data-msg className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-ink/10 bg-surface px-4 py-3" aria-hidden="true">
          {[0, 1, 2].map((i) => <span key={i} data-dot className="h-1.5 w-1.5 rounded-full bg-ink/40" />)}
        </div>
      </div>
    </div>
  )
}
