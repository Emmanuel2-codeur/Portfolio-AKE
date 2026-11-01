/**
 * Illustrations vectorielles des services (SVG).
 * Les couleurs viennent des variables du thème : elles s'adaptent au mode clair/sombre.
 */
const Svg = ({ children, label }) => (
  <svg viewBox="0 0 280 170" role="img" aria-label={label} className="h-full w-full" fill="none">
    {children}
  </svg>
)
const frame = 'fill-surface stroke-ink/15'

export function WebArt() {
  return (
    <Svg label="Application web">
      <rect x="34" y="18" width="212" height="128" rx="10" className={frame} strokeWidth="1.5" />
      <path d="M34 28a10 10 0 0 1 10-10h192a10 10 0 0 1 10 10v10H34z" className="fill-ink/[0.06]" />
      {[48, 58, 68].map((x) => <circle key={x} cx={x} cy="28" r="3" className="fill-ink/25" />)}
      <rect x="84" y="23" width="110" height="10" rx="5" className="fill-ink/10" />
      <rect x="48" y="52" width="72" height="8" rx="4" className="fill-ink/80" />
      <rect x="48" y="66" width="56" height="8" rx="4" className="fill-ink/80" />
      <rect x="48" y="82" width="86" height="5" rx="2.5" className="fill-ink/20" />
      <rect x="48" y="92" width="70" height="5" rx="2.5" className="fill-ink/20" />
      <rect x="48" y="106" width="40" height="14" rx="7" className="fill-accent" />
      <rect x="150" y="50" width="82" height="62" rx="8" className="fill-accent/15" />
      <circle cx="208" cy="66" r="7" className="fill-accent/50" />
      <path d="M150 104l24-24 20 18 14-12 24 22v4a8 8 0 0 1-8 8h-66a8 8 0 0 1-8-8z" className="fill-accent/40" />
      {[48, 112, 176].map((x) => <rect key={x} x={x} y="126" width="58" height="12" rx="4" className="fill-ink/[0.07]" />)}
      <g className="float-y">
        <path d="M0 0v17l4.6-4.2 3 7 3-1.3-3-6.9H14z" transform="translate(214 104)" className="fill-ink stroke-surface" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </Svg>
  )
}

export function DesktopArt() {
  return (
    <Svg label="Application desktop">
      <rect x="44" y="12" width="192" height="118" rx="10" className="fill-surface stroke-ink/25" strokeWidth="2.5" />
      <rect x="52" y="20" width="176" height="102" rx="5" className="fill-bg" />
      <rect x="52" y="20" width="36" height="102" className="fill-ink/[0.05]" />
      <rect x="58" y="28" width="24" height="6" rx="3" className="fill-accent" />
      {[42, 54, 66].map((y) => <rect key={y} x="58" y={y} width="24" height="5" rx="2.5" className="fill-ink/20" />)}
      <rect x="96" y="28" width="60" height="7" rx="3.5" className="fill-ink/70" />
      {[96, 130, 164].map((x, i) => (
        <g key={x}>
          <rect x={x} y="42" width="30" height="22" rx="5" className="fill-surface stroke-ink/10" />
          <rect x={x + 5} y="48" width="14" height="4" rx="2" className="fill-ink/20" />
          <rect x={x + 5} y="55" width={i === 0 ? 18 : 10} height="5" rx="2.5" className="fill-accent" />
        </g>
      ))}
      {[[100, 22], [112, 32], [124, 26], [136, 40], [148, 34]].map(([x, h]) => (
        <rect key={x} x={x} y={112 - h} width="8" height={h} rx="2" className="fill-accent/70" />
      ))}
      <rect x="164" y="74" width="56" height="5" rx="2.5" className="fill-ink/15" />
      <rect x="164" y="84" width="46" height="5" rx="2.5" className="fill-ink/15" />
      <rect x="164" y="94" width="52" height="5" rx="2.5" className="fill-ink/15" />
      <path d="M126 130h28l4 20h-36z" className="fill-ink/10 stroke-ink/15" />
      <rect x="106" y="150" width="68" height="6" rx="3" className="fill-ink/20" />
      <g className="float-y-2">
        <rect x="190" y="88" width="76" height="52" rx="9" className="fill-surface stroke-accent" strokeWidth="1.5" />
        <rect x="200" y="98" width="38" height="5" rx="2.5" className="fill-ink/70" />
        <rect x="200" y="108" width="52" height="4" rx="2" className="fill-ink/20" />
        <rect x="200" y="120" width="24" height="12" rx="6" className="fill-accent" />
        <rect x="229" y="120" width="24" height="12" rx="6" className="fill-ink/10" />
      </g>
    </Svg>
  )
}

export function MobileArt() {
  return (
    <Svg label="Application mobile">
      <rect x="104" y="8" width="72" height="150" rx="16" className="fill-surface stroke-ink/25" strokeWidth="2.5" />
      <rect x="129" y="14" width="22" height="5" rx="2.5" className="fill-ink/25" />
      <circle cx="119" cy="36" r="7" className="fill-accent/30" />
      <rect x="130" y="31" width="30" height="4" rx="2" className="fill-ink/70" />
      <rect x="130" y="39" width="20" height="3" rx="1.5" className="fill-ink/20" />
      <rect x="114" y="52" width="52" height="38" rx="8" className="fill-accent" />
      <rect x="121" y="60" width="26" height="4" rx="2" className="fill-on-accent/80" />
      <rect x="121" y="70" width="38" height="3" rx="1.5" className="fill-on-accent/50" />
      <rect x="121" y="77" width="30" height="3" rx="1.5" className="fill-on-accent/50" />
      {[100, 116].map((y) => (
        <g key={y}>
          <circle cx="121" cy={y + 5} r="5" className="fill-ink/10" />
          <rect x="131" y={y} width="30" height="4" rx="2" className="fill-ink/50" />
          <rect x="131" y={y + 7} width="20" height="3" rx="1.5" className="fill-ink/15" />
        </g>
      ))}
      <rect x="114" y="136" width="52" height="14" rx="7" className="fill-ink/[0.07]" />
      {[124, 140, 156].map((x, i) => <circle key={x} cx={x} cy="143" r="2.6" className={i === 0 ? 'fill-accent' : 'fill-ink/30'} />)}
      <g className="float-y">
        <rect x="170" y="36" width="92" height="32" rx="9" className="fill-surface stroke-ink/15" strokeWidth="1.5" />
        <circle cx="187" cy="52" r="8" className="fill-accent" />
        <path d="M184 52l2.4 2.6 4.4-5" className="stroke-on-accent" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="201" y="46" width="48" height="4" rx="2" className="fill-ink/60" />
        <rect x="201" y="55" width="34" height="3" rx="1.5" className="fill-ink/20" />
      </g>
      <g className="float-y-2">
        <rect x="22" y="94" width="72" height="28" rx="14" className="fill-surface stroke-ink/15" strokeWidth="1.5" />
        <circle cx="38" cy="108" r="6" className="fill-accent/20" />
        <path d="M35 108l2 2.2 3.6-4" className="stroke-accent" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="49" y="105" width="34" height="5" rx="2.5" className="fill-ink/30" />
      </g>
    </Svg>
  )
}

export function DesignArt() {
  return (
    <Svg label="Design UI/UX">
      <rect x="58" y="30" width="136" height="112" rx="6" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <rect x="68" y="40" width="116" height="12" rx="4" className="fill-ink/10" />
      <rect x="68" y="58" width="116" height="38" rx="5" className="fill-accent/15" />
      <path d="M68 90l30-22 22 16 14-10 50 22v0H68z" className="fill-accent/35" />
      <rect x="68" y="102" width="70" height="5" rx="2.5" className="fill-ink/25" />
      <rect x="68" y="112" width="54" height="5" rx="2.5" className="fill-ink/15" />
      <rect x="68" y="124" width="38" height="10" rx="5" className="fill-accent" />
      {[[58, 30], [194, 30], [58, 142], [194, 142]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x - 3.5} y={y - 3.5} width="7" height="7" rx="1.5" className="fill-surface stroke-accent" strokeWidth="1.5" />
      ))}
      <rect x="103" y="8" width="46" height="15" rx="4" className="fill-accent" />
      <text x="126" y="18.5" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-on-accent">136 × 112</text>
      <g className="float-y">
        <rect x="204" y="34" width="62" height="42" rx="9" className="fill-surface stroke-ink/15" strokeWidth="1.5" />
        <circle cx="219" cy="48" r="7" className="fill-accent" />
        <circle cx="236" cy="48" r="7" className="fill-ink" />
        <circle cx="253" cy="48" r="7" className="fill-accent/30" />
        <rect x="213" y="62" width="44" height="4" rx="2" className="fill-ink/20" />
      </g>
      <g className="float-y-2">
        <path d="M206 128C220 98 244 146 264 106" className="stroke-accent" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M206 128L220 98M264 106L244 146" className="stroke-accent/40" strokeWidth="1" />
        <circle cx="220" cy="98" r="2.6" className="fill-surface stroke-accent" />
        <circle cx="244" cy="146" r="2.6" className="fill-surface stroke-accent" />
        <rect x="202.5" y="124.5" width="7" height="7" rx="1.5" className="fill-accent" />
        <rect x="260.5" y="102.5" width="7" height="7" rx="1.5" className="fill-accent" />
      </g>
    </Svg>
  )
}

export function ApiArt() {
  return (
    <Svg label="API et bases de données">
      <path d="M92 86h22M164 80c14 0 22-6 36-10" className="stroke-accent dash-flow" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M164 92c14 0 22 8 36 14" className="stroke-ink/30 dash-flow" strokeWidth="1.8" strokeLinecap="round" />
      <g>
        <ellipse cx="62" cy="52" rx="28" ry="9" className="fill-accent/25 stroke-accent" strokeWidth="1.5" />
        <path d="M34 52v54c0 5 12.5 9 28 9s28-4 28-9V52" className="fill-surface stroke-accent" strokeWidth="1.5" />
        <ellipse cx="62" cy="52" rx="28" ry="9" className="fill-accent/25 stroke-accent" strokeWidth="1.5" />
        <path d="M34 70c0 5 12.5 9 28 9s28-4 28-9M34 88c0 5 12.5 9 28 9s28-4 28-9" className="stroke-accent/60" strokeWidth="1.5" />
      </g>
      <g className="float-y">
        <rect x="114" y="58" width="52" height="52" rx="14" className="fill-accent" />
        <text x="140" y="90" textAnchor="middle" fontSize="15" fontWeight="700" className="fill-on-accent">API</text>
      </g>
      <g className="float-y-2">
        <rect x="204" y="38" width="64" height="62" rx="8" className="fill-surface stroke-ink/15" strokeWidth="1.5" />
        <path d="M204 46a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8h-64z" className="fill-ink/[0.06]" />
        {[212, 219, 226].map((x) => <circle key={x} cx={x} cy="46" r="2" className="fill-ink/25" />)}
        <text x="212" y="70" fontSize="9" className="fill-accent" fontFamily="ui-monospace, monospace">{'{'}</text>
        <rect x="222" y="66" width="28" height="4" rx="2" className="fill-ink/50" />
        <rect x="222" y="75" width="22" height="4" rx="2" className="fill-ink/20" />
        <rect x="222" y="84" width="30" height="4" rx="2" className="fill-ink/20" />
        <text x="212" y="94" fontSize="9" className="fill-accent" fontFamily="ui-monospace, monospace">{'}'}</text>
        <rect x="208" y="110" width="56" height="20" rx="10" className="fill-accent/15" />
        <circle cx="219" cy="120" r="3.5" className="fill-accent" />
        <text x="228" y="123.5" fontSize="9.5" fontWeight="600" className="fill-accent">200 OK</text>
      </g>
    </Svg>
  )
}

export function MaintenanceArt() {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <Svg label="Maintenance et évolution">
      <rect x="26" y="22" width="156" height="112" rx="10" className={frame} strokeWidth="1.5" />
      {[52, 78, 104].map((y) => <path key={y} d={`M38 ${y}h132`} className="stroke-ink/10" strokeDasharray="3 4" />)}
      <path d="M40 112l26-12 24 6 26-26 24-6 24-26v68H40z" className="fill-accent/10" />
      <path d="M40 112l26-12 24 6 26-26 24-6 24-26" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {[[66, 100], [90, 106], [116, 80], [140, 74], [164, 48]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="3.6" className="fill-surface stroke-accent" strokeWidth="2" />
      ))}
      <rect x="38" y="31" width="38" height="15" rx="7.5" className="fill-accent" />
      <text x="57" y="41.5" textAnchor="middle" fontSize="8.5" fontWeight="600" className="fill-on-accent">v2.1</text>
      <g className="spin-gear" style={{ transformOrigin: '224px 78px' }}>
        {teeth.map((a) => <rect key={a} x="217" y="38" width="14" height="14" rx="3" transform={`rotate(${a} 224 78)`} className="fill-ink/20" />)}
        <circle cx="224" cy="78" r="30" className="fill-surface stroke-ink/20" strokeWidth="1.5" />
        <circle cx="224" cy="78" r="12" className="fill-bg stroke-ink/20" strokeWidth="1.5" />
      </g>
      <g className="float-y">
        <circle cx="200" cy="124" r="14" className="fill-accent stroke-surface" strokeWidth="3" />
        <path d="M193.5 124l4.5 4.6 9-9.6" className="stroke-on-accent" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Svg>
  )
}

export const SERVICE_ART = [WebArt, DesktopArt, MobileArt, DesignArt, ApiArt, MaintenanceArt]
