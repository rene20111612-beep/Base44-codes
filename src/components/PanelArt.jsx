const RED = '#c8102e'
const RED_HOT = '#ff2f3f'

function Defs() {
  return (
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="78%">
        <stop offset="0%" stopColor="#1b1b22" />
        <stop offset="58%" stopColor="#0d0d12" />
        <stop offset="100%" stopColor="#050507" />
      </radialGradient>
      <radialGradient id="glowRed" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={RED_HOT} stopOpacity="0.95" />
        <stop offset="55%" stopColor={RED} stopOpacity="0.35" />
        <stop offset="100%" stopColor={RED} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="vig" cx="50%" cy="48%" r="72%">
        <stop offset="52%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.94" />
      </radialGradient>
      <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#ffffff" opacity="0.55" />
      </pattern>
      <filter id="soft6">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <filter id="soft14">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  )
}

const bricks = Array.from({ length: 15 }, (_, i) => (
  <line key={i} x1="0" y1={i * 72 + 30} x2="800" y2={i * 72 + 30} />
))

const SCENES = {
  /* 1 · el armario */
  closet: () => (
    <g>
      <rect width="800" height="1000" fill="#0b0b10" />
      <rect x="0" y="782" width="800" height="218" fill="#07070a" />
      <line x1="0" y1="782" x2="800" y2="782" stroke="#25252f" strokeWidth="3" />

      <rect x="200" y="140" width="400" height="642" fill="#101016" stroke="#3d3d49" strokeWidth="5" />
      <rect x="222" y="162" width="356" height="598" fill="#040406" />
      <path d="M222 162 L128 96 L128 856 L222 774 Z" fill="#17171e" stroke="#3d3d49" strokeWidth="4" />

      <rect x="470" y="176" width="14" height="570" fill="url(#glowRed)" opacity="0.9" filter="url(#soft6)" />
      <rect x="474" y="176" width="5" height="570" fill="#fff6ec" opacity="0.6" />
      <ellipse cx="470" cy="820" rx="180" ry="42" fill="url(#glowRed)" opacity="0.65" />

      <g fill="#000">
        <circle cx="596" cy="628" r="36" />
        <path d="M562 666 q34 -20 68 0 l16 104 q-50 18 -100 0 Z" />
        <path d="M572 770 l-8 96 h22 l8 -76 Z" />
        <path d="M620 770 l10 96 h-22 l-10 -76 Z" />
      </g>
      <path d="M596 866 q-84 12 -108 66 h216 q-24 -54 -108 -66 Z" fill="#000" opacity="0.5" />
    </g>
  ),

  /* 2 · el pasillo */
  hall: () => (
    <g>
      <rect width="800" height="1000" fill="#08080b" />
      <path d="M0 0 L312 330 L312 700 L0 1000 Z" fill="#101017" />
      <path d="M800 0 L488 330 L488 700 L800 1000 Z" fill="#0c0c12" />
      <path d="M312 330 H488 V700 H312 Z" fill="#050507" />
      <path d="M0 0 L312 330 M800 0 L488 330" stroke="#1d1d26" strokeWidth="3" />

      <rect x="346" y="428" width="108" height="272" fill="#0b0b10" stroke="#2f2f3a" strokeWidth="3" />
      <rect x="346" y="696" width="108" height="6" fill={RED_HOT} filter="url(#soft6)" />
      <ellipse cx="400" cy="764" rx="170" ry="30" fill="url(#glowRed)" opacity="0.5" />

      <path d="M340 716 L460 716 L628 1000 L172 1000 Z" fill="#000" opacity="0.78" />
      <path d="M400 330 L400 700" stroke="#14141b" strokeWidth="2" />
    </g>
  ),

  /* 3 · el teléfono */
  phone: () => (
    <g>
      <rect width="800" height="1000" fill="#08080b" />
      <ellipse cx="400" cy="520" rx="330" ry="380" fill="url(#glowRed)" opacity="0.22" />
      <rect x="0" y="700" width="800" height="300" fill="#12121a" />
      <path d="M0 700 H800" stroke="#2b2b36" strokeWidth="4" />

      <g transform="rotate(-9 400 560)">
        <rect x="296" y="352" width="208" height="396" rx="24" fill="#05050a" stroke="#3b3b47" strokeWidth="5" />
        <rect x="314" y="376" width="172" height="348" rx="10" fill="#0e0e16" />
        <rect x="332" y="412" width="118" height="26" rx="8" fill="#2b2b37" />
        <rect x="332" y="450" width="86" height="26" rx="8" fill="#2b2b37" />
        <rect x="352" y="496" width="116" height="26" rx="8" fill={RED} opacity="0.9" />
        <rect x="332" y="542" width="100" height="26" rx="8" fill="#2b2b37" />
      </g>

      <ellipse cx="400" cy="712" rx="210" ry="34" fill="url(#glowRed)" opacity="0.45" />
    </g>
  ),

  /* 4 · la pared que contesta */
  wall: () => (
    <g>
      <rect width="800" height="1000" fill="#0f0f15" />
      <g stroke="#191921" strokeWidth="2" fill="none">
        {bricks}
      </g>

      <path
        d="M482 108 C 402 190 528 246 470 336 C 424 408 522 466 458 560 C 414 626 486 704 442 812"
        stroke="#050507"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M482 108 C 402 190 528 246 470 336 C 424 408 522 466 458 560 C 414 626 486 704 442 812"
        stroke={RED_HOT}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
        filter="url(#soft6)"
      />

      <path
        d="M566 392 q104 -76 132 24 q20 78 -70 122 q-46 22 -68 -12"
        fill="none"
        stroke="#33333f"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M600 440 q44 -30 56 12 q8 34 -30 52" fill="none" stroke="#2a2a35" strokeWidth="4" />

      <ellipse cx="460" cy="500" rx="220" ry="300" fill="url(#glowRed)" opacity="0.18" />
    </g>
  ),

  /* 5 · al pie de la cama */
  bed: () => (
    <g>
      <rect width="800" height="1000" fill="#0a0a0f" />
      <path d="M0 0 L336 0 L182 1000 L0 1000 Z" fill="#14141f" opacity="0.9" />
      <rect x="104" y="112" width="152" height="300" fill="#1c1c29" stroke="#33333f" strokeWidth="4" />
      <path d="M180 112 V412 M104 262 H256" stroke="#33333f" strokeWidth="4" />

      <path d="M0 630 H800 V1000 H0 Z" fill="#0e0e13" />
      <path d="M28 654 H556 V906 H28 Z" fill="#15151c" stroke="#252531" strokeWidth="4" />
      <path d="M52 656 q120 -44 244 0 q120 44 240 0" fill="none" stroke="#252531" strokeWidth="3" />
      <path d="M60 830 q140 26 300 0" fill="none" stroke="#1d1d26" strokeWidth="3" />

      <ellipse cx="644" cy="300" rx="52" ry="64" fill="url(#glowRed)" opacity="0.28" />
      <g fill="#000">
        <ellipse cx="644" cy="298" rx="30" ry="42" />
        <path d="M614 342 q30 -18 60 0 l11 268 q-41 15 -82 0 Z" />
        <path d="M622 606 l-9 128 h19 l7 -116 Z" />
        <path d="M666 606 l9 128 h-19 l-7 -116 Z" />
      </g>
    </g>
  ),

  /* 6 · el ojo */
  eye: () => (
    <g>
      <rect width="800" height="1000" fill="#07070a" />
      <ellipse cx="400" cy="500" rx="430" ry="310" fill="#101018" />

      <path d="M96 500 Q400 262 704 500 Q400 738 96 500 Z" fill="#e8e0d0" />
      <path d="M96 500 Q400 262 704 500" stroke="#0a0a0c" strokeWidth="9" fill="none" />
      <path d="M96 500 Q400 738 704 500" stroke="#0a0a0c" strokeWidth="9" fill="none" />

      <circle cx="400" cy="500" r="132" fill="#0a0a0c" />
      <ellipse cx="400" cy="500" rx="20" ry="108" fill={RED_HOT} filter="url(#soft6)" />
      <ellipse cx="400" cy="500" rx="9" ry="92" fill="#fff6ec" opacity="0.75" />
      <circle cx="352" cy="440" r="24" fill="#fff" opacity="0.85" />

      <g stroke={RED} strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round">
        <path d="M150 466 q64 30 116 10" />
        <path d="M652 534 q-64 -30 -116 -10" />
        <path d="M176 566 q72 -22 122 6" />
        <path d="M624 442 q-58 16 -96 -4" />
      </g>
      <ellipse cx="400" cy="500" rx="330" ry="230" fill="url(#glowRed)" opacity="0.14" />
    </g>
  ),

  /* 7 · al otro lado del cristal */
  glass: () => (
    <g>
      <rect width="800" height="1000" fill="#0b0b11" />
      <rect x="86" y="76" width="628" height="848" fill="#12121b" stroke="#2c2c37" strokeWidth="5" />
      <path d="M86 76 L382 76 L150 924 L86 924 Z" fill="#1c1c28" opacity="0.55" />

      <g fill="#1e1e2b" stroke="#3b3b4b" strokeWidth="3">
        <ellipse cx="400" cy="606" rx="88" ry="106" />
        <ellipse cx="318" cy="472" rx="24" ry="64" transform="rotate(-18 318 472)" />
        <ellipse cx="376" cy="432" rx="25" ry="74" />
        <ellipse cx="432" cy="436" rx="25" ry="78" />
        <ellipse cx="488" cy="472" rx="23" ry="66" transform="rotate(16 488 472)" />
        <ellipse cx="520" cy="562" rx="22" ry="58" transform="rotate(48 520 562)" />
      </g>

      <ellipse cx="400" cy="600" rx="96" ry="118" fill="url(#glowRed)" opacity="0.35" />
      <path d="M200 150 q40 300 -20 620" stroke="#262633" strokeWidth="2" fill="none" opacity="0.7" />
    </g>
  ),

  /* 8 · el hilo del miedo */
  thread: () => (
    <g>
      <rect width="800" height="1000" fill="#08080b" />
      <ellipse cx="400" cy="540" rx="330" ry="330" fill="url(#glowRed)" opacity="0.2" />

      <g fill="#000">
        <circle cx="214" cy="414" r="48" />
        <path d="M152 476 q62 -32 124 0 l17 308 q-79 27 -158 0 Z" />
        <circle cx="586" cy="414" r="48" />
        <path d="M524 476 q62 -32 124 0 l17 308 q-79 27 -158 0 Z" />
      </g>

      <path d="M226 556 q174 -126 348 0" stroke={RED_HOT} strokeWidth="7" fill="none" filter="url(#soft6)" />
      <path d="M226 556 q174 -126 348 0" stroke="#fff6ec" strokeWidth="2" fill="none" opacity="0.7" />
      <circle cx="400" cy="514" r="58" fill="url(#glowRed)" opacity="0.85" />
    </g>
  ),

  /* 9 · detrás de ti */
  doorway: () => (
    <g>
      <rect width="800" height="1000" fill="#06060a" />
      <rect x="228" y="112" width="344" height="712" fill="#000" stroke="#3d3d4d" strokeWidth="7" />

      <ellipse cx="400" cy="520" rx="300" ry="360" fill="url(#glowRed)" opacity="0.3" />
      <path d="M296 828 q104 -276 208 0 Z" fill="#000" />
      <ellipse cx="400" cy="566" rx="72" ry="94" fill="#000" />

      <ellipse cx="352" cy="432" rx="42" ry="24" fill={RED_HOT} filter="url(#soft14)" />
      <ellipse cx="448" cy="432" rx="42" ry="24" fill={RED_HOT} filter="url(#soft14)" />
      <ellipse cx="352" cy="432" rx="22" ry="12" fill={RED_HOT} filter="url(#soft6)" />
      <ellipse cx="448" cy="432" rx="22" ry="12" fill={RED_HOT} filter="url(#soft6)" />
      <ellipse cx="352" cy="432" rx="9" ry="8" fill="#fff6ec" />
      <ellipse cx="448" cy="432" rx="9" ry="8" fill="#fff6ec" />
      <ellipse cx="400" cy="890" rx="260" ry="46" fill="url(#glowRed)" opacity="0.35" />

      <rect x="0" y="824" width="800" height="176" fill="#040406" />
    </g>
  ),
}

export default function PanelArt({ scene }) {
  const draw = SCENES[scene] || SCENES.doorway
  return (
    <svg
      className="panel-art"
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <Defs />
      <rect width="800" height="1000" fill="url(#bg)" />
      {draw()}
      <rect width="800" height="1000" fill="url(#dots)" opacity="0.07" />
      <rect width="800" height="1000" fill="url(#vig)" />
      <rect width="800" height="1000" filter="url(#grain)" opacity="0.14" style={{ mixBlendMode: 'overlay' }} />
    </svg>
  )
}
