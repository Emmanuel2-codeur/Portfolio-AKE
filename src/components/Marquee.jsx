import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Icon from './Icon'
import { MARQUEE } from '../data/techs'
import { prefersReducedMotion } from '../lib/asset'

/** Bandeau de technologies en défilement continu (ralentit au survol). */
export default function Marquee() {
  const track = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const tween = gsap.to(track.current, { xPercent: -50, duration: 45, ease: 'none', repeat: -1 })
    const host = track.current.parentElement
    const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6 })
    const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.6 })
    host.addEventListener('pointerenter', slow)
    host.addEventListener('pointerleave', fast)
    return () => {
      host.removeEventListener('pointerenter', slow)
      host.removeEventListener('pointerleave', fast)
      tween.kill()
      gsap.set(track.current, { xPercent: 0 })
    }
  }, [])

  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className="overflow-hidden border-y border-ink/10 py-7"
         style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
      <div ref={track} className="flex w-max items-center gap-14 pr-14">
        {items.map((m, i) => (
          <div key={i} className="flex items-center gap-3" aria-hidden={i >= MARQUEE.length}>
            <Icon icon={m.icon} className="text-3xl" />
            <span className="font-heading text-lg font-medium text-muted">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
