import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './asset'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
const raf = (t) => lenis?.raf(t * 1000)

export function initSmooth() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function destroySmooth() {
  if (!lenis) return
  gsap.ticker.remove(raf)
  lenis.destroy()
  lenis = null
}

export const getLenis = () => lenis

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.4 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
