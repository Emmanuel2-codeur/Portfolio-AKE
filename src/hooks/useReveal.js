import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/asset'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animations d'apparition au scroll, pilotées par des attributs :
 *  [data-title]   → titre dont les [data-split] montent depuis un masque
 *  [data-reveal]  → apparition simple (fondu + montée)
 *  [data-stagger] → ses enfants directs apparaissent en cascade
 *  [data-words]   → les mots [data-w] s'éclaircissent au fil du scroll (texte qui « se lit »)
 */
export default function useReveal(scope, deps = []) {
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !scope.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-title]').forEach((t) => {
        gsap.from(t.querySelectorAll('[data-split]'), {
          yPercent: 115, duration: 0.9, stagger: 0.07, ease: 'power4.out',
          scrollTrigger: { trigger: t, start: 'top 88%', once: true },
        })
      })
      gsap.utils.toArray('[data-words]').forEach((box) => {
        gsap.fromTo(box.querySelectorAll('[data-w]'), { opacity: 0.16 }, {
          opacity: 1, ease: 'none', stagger: 0.12,
          scrollTrigger: { trigger: box, start: 'top 85%', end: 'bottom 60%', scrub: true },
        })
      })
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
      gsap.utils.toArray('[data-stagger]').forEach((box) => {
        gsap.from(box.children, {
          y: 50, opacity: 0, scale: 0.95, duration: 0.75, stagger: 0.07, ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: box, start: 'top 85%', once: true },
        })
      })
    }, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
