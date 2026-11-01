import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/asset'

/** Intro courte : nom + compteur + fine barre, puis le rideau se lève. */
export default function Loader({ onReveal }) {
  const root = useRef(null)
  const num = useRef(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) { onReveal(); setGone(true); return }
    const obj = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.timeline({ onComplete: () => setGone(true) })
        .to(obj, { v: 100, duration: 1, ease: 'power2.inOut',
                   onUpdate: () => { if (num.current) num.current.textContent = Math.round(obj.v) } })
        .to('[data-ld-bar]', { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 0)
        .to('[data-ld-content]', { y: -20, opacity: 0, duration: 0.35, ease: 'power2.in' })
        .add(() => onReveal())
        .to(root.current, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '<')
    }, root)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (gone) return null
  return (
    <div ref={root} aria-hidden="true" className="fixed inset-0 z-[100] flex items-end bg-[#0a0c11] p-6 text-white md:p-12">
      <div data-ld-content className="w-full">
        <div className="flex items-end justify-between">
          <p className="font-heading text-2xl font-semibold tracking-tight md:text-4xl">Emmanuel-Dev</p>
          <p className="font-heading text-2xl tabular-nums text-white/50 md:text-4xl"><span ref={num}>0</span>%</p>
        </div>
        <div className="mt-5 h-px w-full bg-white/15">
          <div data-ld-bar className="h-full origin-left scale-x-0 bg-[#6b8cff]" />
        </div>
      </div>
    </div>
  )
}
