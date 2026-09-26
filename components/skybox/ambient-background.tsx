'use client'

/**
 * Persistent, non-interactive system atmosphere that sits behind every page:
 * floating rose glows, a drifting telemetry mesh, slow orbital rings and
 * roaming data particles. Purely decorative — pointer-events are disabled.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft floating glows */}
      <div className="anim-float absolute -right-24 -top-24 size-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,199,192,0.55),transparent_65%)] blur-2xl" />
      <div
        className="anim-float absolute -bottom-32 -left-24 size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(243,221,216,0.6),transparent_65%)] blur-2xl"
        style={{ animationDelay: '-4s' }}
      />
      <div
        className="anim-float absolute left-1/2 top-1/3 size-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.14),transparent_70%)] blur-3xl"
        style={{ animationDelay: '-2s' }}
      />

      {/* Slow orbital rings, top-right */}
      <svg
        viewBox="0 0 400 400"
        className="absolute -right-20 -top-16 size-[30rem] opacity-50"
        fill="none"
      >
        <g className="spin-slow" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="200" r="150" stroke="#dc2626" strokeOpacity="0.35" strokeDasharray="2 10" />
          <circle cx="350" cy="200" r="4" fill="#dc2626" />
        </g>
        <g className="spin-rev" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="200" r="112" stroke="#f87171" strokeOpacity="0.4" strokeDasharray="1 6" />
          <circle cx="88" cy="200" r="3" fill="#f87171" />
        </g>
        <circle cx="200" cy="200" r="72" stroke="#fecdd3" strokeOpacity="0.7" />
      </svg>

      {/* Drifting telemetry mesh */}
      <svg
        className="absolute inset-x-0 top-1/2 h-64 w-[200%] opacity-40"
        viewBox="0 0 1600 240"
        preserveAspectRatio="none"
      >
        <g className="anim-drift">
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${30 + i * 34} C 260 ${10 + i * 34}, 520 ${60 + i * 34}, 800 ${30 + i * 34} S 1340 ${10 + i * 34}, 1600 ${30 + i * 34}`}
              stroke={i % 2 === 0 ? '#dc2626' : '#f87171'}
              strokeOpacity="0.3"
              strokeWidth="1"
              fill="none"
              className="flow-dash-slow"
              style={{ animationDelay: `${i * -0.7}s` }}
            />
          ))}
        </g>
      </svg>

      {/* Roaming data particles */}
      <svg className="absolute inset-0 h-full w-full opacity-60">
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.r}
            fill="#dc2626"
            className="anim-pulse-soft"
            style={{ animationDelay: `${p.delay}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

const PARTICLES = [
  { x: 12, y: 22, r: 2, delay: 0 },
  { x: 28, y: 68, r: 1.5, delay: -1.2 },
  { x: 44, y: 18, r: 2.5, delay: -2.4 },
  { x: 62, y: 74, r: 1.5, delay: -0.6 },
  { x: 74, y: 40, r: 2, delay: -3 },
  { x: 88, y: 62, r: 1.5, delay: -1.8 },
  { x: 20, y: 46, r: 1.5, delay: -2.1 },
  { x: 54, y: 52, r: 2, delay: -0.9 },
]
