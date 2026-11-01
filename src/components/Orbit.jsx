import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import Icon from './Icon'
import { ORBIT_OUTER, ORBIT_INNER } from '../data/techs'
import { asset, prefersReducedMotion } from '../lib/asset'

const RATIO = 0.3 // aplatissement de l'ellipse (effet de perspective)
// rx : rayon en fraction de la largeur ; dir : sens ; rate : vitesse (rad/s)
const RINGS = [
  { rx: 0.44, dir: 1,  rate: 0.2 },
  { rx: 0.3,  dir: -1, rate: 0.3 },
]

function Bubble({ tech, ring, phase }) {
  const size = ring === 0 ? 'h-11 w-11 md:h-14 md:w-14' : 'h-9 w-9 md:h-11 md:w-11'
  return (
    <div data-orb data-ring={ring} data-phase={phase}
         className="group absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
      <div className={`card grid place-items-center rounded-2xl shadow-lg ${size}`}>
        <Icon icon={tech.icon} className={ring === 0 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} />
      </div>
      <span className="card pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {tech.label}
      </span>
    </div>
  )
}

export default function Orbit({ ready }) {
  const { t } = useTranslation()
  const wrap = useRef(null)
  const photo = useRef(null)
  const disc = useRef(null)
  const state = useRef({ angle: 0, speed: 1, grow: 0 })

  // ── Boucle orbitale : positionne chaque icône sur son ellipse + profondeur (taille, opacité, z-index)
  useEffect(() => {
    const el = wrap.current
    const s = state.current
    const reduce = prefersReducedMotion()
    const nodes = Array.from(el.querySelectorAll('[data-orb]')).map((n) => ({
      n, ring: +n.dataset.ring, phase: +n.dataset.phase, hw: 0, hh: 0, hidden: false,
    }))
    const lines = Array.from(el.querySelectorAll('[data-ringline]'))
    let W = 0, H = 0, cy = 0, visible = true

    const layout = () => {
      W = el.clientWidth; H = el.clientHeight; cy = H * 0.58
      const compact = W < 440 // mobile : on masque l'orbite intérieure
      RINGS.forEach((r, i) => {
        const w = r.rx * W * 2, h = w * RATIO, line = lines[i]
        Object.assign(line.style, {
          width: `${w}px`, height: `${h}px`, left: `${W / 2 - w / 2}px`, top: `${cy - h / 2}px`,
          display: i === 1 && compact ? 'none' : '',
        })
      })
      nodes.forEach((c) => {
        c.hidden = c.ring === 1 && compact
        c.n.style.display = c.hidden ? 'none' : ''
        c.hw = c.n.offsetWidth / 2; c.hh = c.n.offsetHeight / 2
      })
    }

    const draw = () => {
      const g = s.grow
      nodes.forEach((c) => {
        if (c.hidden) return
        const r = RINGS[c.ring]
        const th = c.phase + r.dir * s.angle * r.rate
        const sin = Math.sin(th), cos = Math.cos(th)
        const depth = (sin + 1) / 2 // 0 = tout au fond, 1 = tout devant
        const x = W / 2 + cos * r.rx * W * g
        const y = cy + sin * r.rx * W * RATIO * g
        c.n.style.transform = `translate3d(${x - c.hw}px, ${y - c.hh}px, 0) scale(${0.72 + 0.38 * depth})`
        c.n.style.opacity = String((0.45 + 0.55 * depth) * Math.min(1, g * 1.6))
        c.n.style.zIndex = depth > 0.5 ? 30 : 10 // derrière ou devant la photo (z-20)
      })
    }

    const tick = (_t, dt) => {
      if (!visible) return
      s.angle += (dt / 1000) * s.speed
      draw()
    }

    layout()
    if (reduce) { s.grow = 1; draw() } else { draw(); gsap.ticker.add(tick) }
    const ro = new ResizeObserver(() => { layout(); draw() })
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)

    // Survol : l'orbite ralentit ; la souris déplace légèrement photo et disque (parallaxe)
    const slow = () => gsap.to(s, { speed: 0.15, duration: 0.6 })
    const fast = () => gsap.to(s, { speed: 1, duration: 0.8 })
    let move = null, leave = null
    if (!reduce && window.matchMedia('(hover: hover)').matches) {
      const px = gsap.quickTo(photo.current, 'x', { duration: 0.9, ease: 'power3' })
      const py = gsap.quickTo(photo.current, 'y', { duration: 0.9, ease: 'power3' })
      const dx = gsap.quickTo(disc.current, 'x', { duration: 1.1, ease: 'power3' })
      const dy = gsap.quickTo(disc.current, 'y', { duration: 1.1, ease: 'power3' })
      move = (e) => {
        const b = el.getBoundingClientRect()
        const nx = (e.clientX - b.left) / b.width - 0.5
        const ny = (e.clientY - b.top) / b.height - 0.5
        px(nx * 16); py(ny * 10); dx(-nx * 28); dy(-ny * 18)
      }
      leave = () => { px(0); py(0); dx(0); dy(0); fast() }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      el.addEventListener('pointerenter', slow)
    }

    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect(); io.disconnect()
      if (move) {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
        el.removeEventListener('pointerenter', slow)
      }
    }
  }, [])

  // ── Entrée : disque, photo, puis les icônes jaillissent du centre vers leur orbite
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const s = state.current
    s.grow = 0
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from('[data-disc-wrap]', { scale: 0.5, opacity: 0, duration: 1.2, ease: 'expo.out' })
        .from('[data-photo-wrap]', { y: 70, opacity: 0, duration: 1.1, ease: 'power4.out' }, '<0.15')
        .to(s, { grow: 1, duration: 1.8, ease: 'back.out(1.3)' }, '<0.35')
        .from('[data-chip]', { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all' }, '-=0.9')
    }, wrap)
    return () => ctx.revert()
  }, [ready])

  return (
    <div ref={wrap} className="relative mx-auto aspect-square w-full max-w-[540px] select-none">
      {/* Disque dégradé + halo */}
      <div data-disc-wrap className="absolute inset-x-[12%] bottom-0 aspect-square">
        <div ref={disc} className="h-full w-full">
          <div className="absolute inset-0 rounded-full bg-brand opacity-40 blur-3xl" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet via-pink to-amber shadow-glow" />
        </div>
      </div>

      {/* Traces des orbites */}
      {RINGS.map((_, i) => (
        <div key={i} data-ringline aria-hidden="true"
             className="pointer-events-none absolute z-[5] rounded-full border border-dashed border-ink/20" />
      ))}

      {/* Photo détourée (z-20) — fondu en bas pour masquer la coupe */}
      <div data-photo-wrap className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
        <img
          ref={photo}
          src={asset('assets/img/photo0.webp')}
          alt={t('home.alt')}
          width="334" height="316"
          className="w-[74%] max-w-none drop-shadow-[0_24px_40px_rgba(9,7,26,0.45)]"
          style={{ WebkitMaskImage: 'linear-gradient(#000 84%, transparent)', maskImage: 'linear-gradient(#000 84%, transparent)' }}
        />
      </div>

      {/* Icônes en orbite */}
      {ORBIT_OUTER.map((tech, i) => (
        <Bubble key={tech.label} tech={tech} ring={0} phase={(i / ORBIT_OUTER.length) * Math.PI * 2} />
      ))}
      {ORBIT_INNER.map((tech, i) => (
        <Bubble key={tech.label} tech={tech} ring={1} phase={(i / ORBIT_INNER.length) * Math.PI * 2 + 0.6} />
      ))}

      {/* Pastille de chiffres */}
      <div data-chip className="card absolute -bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-5 whitespace-nowrap rounded-2xl px-5 py-2.5 shadow-lg">
        <p className="text-xs text-muted"><b className="font-heading text-lg text-violet">2+</b> {t('home.chip_exp')}</p>
        <span className="h-6 w-px bg-ink/15" />
        <p className="text-xs text-muted"><b className="font-heading text-lg text-pink">6+</b> {t('home.chip_projects')}</p>
      </div>
    </div>
  )
}
