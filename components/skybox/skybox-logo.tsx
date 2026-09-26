export function SkyboxLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 96"
      className={className}
      role="img"
      aria-label="SKYBOX logo: a paper plane flying past a cloud"
    >
      {/* fluffy cloud */}
      <g className="anim-float">
        <g fill="#fee2e2" stroke="#dc2626" strokeWidth={2.5} strokeLinejoin="round">
          <path d="M34 70c-9 0-16-6.4-16-14.3 0-7 5.6-12.9 13-14 1.6-8.7 9.6-15.4 19.3-15.4 8.2 0 15.2 4.8 18 11.6 1.3-.4 2.7-.6 4.2-.6 7.2 0 13 5.4 13 12 0 6.7-5.8 12.1-13 12.1H34z" />
        </g>
        {/* cloud smile dots */}
        <circle cx="48" cy="46" r="2.4" fill="#dc2626" />
        <circle cx="62" cy="46" r="2.4" fill="#dc2626" />
        <path d="M49 54c3 3.4 9 3.4 12 0" fill="none" stroke="#dc2626" strokeWidth={2.4} strokeLinecap="round" />
      </g>

      {/* dashed flight path */}
      <path
        d="M8 88 Q 40 84 62 62"
        fill="none"
        stroke="#fca5a5"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="1 8"
      />

      {/* paper plane */}
      <g className="anim-float-delayed">
        <g transform="translate(74 12) rotate(18)">
          <path d="M2 14 L34 2 L20 34 L15 22 Z" fill="#dc2626" stroke="#991b1b" strokeWidth={2} strokeLinejoin="round" />
          <path d="M15 22 L34 2 L20 34 Z" fill="#f87171" stroke="#991b1b" strokeWidth={2} strokeLinejoin="round" />
          <path d="M2 14 L15 22 L34 2" fill="none" stroke="#991b1b" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}
