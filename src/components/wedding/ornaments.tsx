/**
 * Ornements SVG de l'invitation — Norbé & Ericka
 * Style : floral terracotta / olive / doré, fidèle à l'invitation imprimée.
 */

const LEAF_D = "M0 0Q6.2 -5.4 12.5 0Q6.2 5.4 0 0Z";

function Leaf({
  x,
  y,
  rot,
  s = 1,
  fill = "#8a9a5b",
  dark = "#5f6f3c",
}: {
  x: number;
  y: number;
  rot: number;
  s?: number;
  fill?: string;
  dark?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d={LEAF_D} fill={fill} />
      <path d="M1 0 L11 0" stroke={dark} strokeWidth="0.9" opacity="0.65" strokeLinecap="round" />
    </g>
  );
}

/** Rose stylisée (spirales concentriques) */
function Rose({
  x,
  y,
  r,
  base,
  mid,
  dark,
  light,
}: {
  x: number;
  y: number;
  r: number;
  base: string;
  mid: string;
  dark: string;
  light: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={base} />
      <path
        d={`M ${-r * 0.08} ${-r * 0.8} A ${r * 0.8} ${r * 0.8} 0 0 1 ${r * 0.66} ${r * 0.46}`}
        stroke={mid}
        strokeWidth={r * 0.15}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M ${-r * 0.55} ${-r * 0.52} A ${r * 0.55} ${r * 0.55} 0 0 0 ${-r * 0.4} ${r * 0.42}`}
        stroke={mid}
        strokeWidth={r * 0.13}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M ${r * 0.02} ${-r * 0.34} A ${r * 0.33} ${r * 0.33} 0 0 1 ${r * 0.3} ${r * 0.14}`}
        stroke={dark}
        strokeWidth={r * 0.12}
        fill="none"
        strokeLinecap="round"
      />
      <circle r={r * 0.13} fill={dark} />
      <path
        d={`M ${-r * 0.42} ${-r * 0.5} A ${r * 0.64} ${r * 0.64} 0 0 1 ${r * 0.16} ${-r * 0.6}`}
        stroke={light}
        strokeWidth={r * 0.09}
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />
    </g>
  );
}

/** Points de gypsophile (fleurs blanches) */
function Breath({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const dots: Array<[number, number, number]> = [
    [0, 0, 3], [9, -7, 2.4], [-9, -6, 2.2], [14, 4, 2.2], [-14, 5, 2.5],
    [5, 10, 2], [-6, 11, 2.2], [20, -4, 1.8], [-20, -3, 1.8],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {dots.map(([dx, dy, r], i) => (
        <circle key={i} cx={dx} cy={dy} r={r} fill={i % 3 === 0 ? "#fff6e4" : "#f7ecd2"} />
      ))}
    </g>
  );
}

/** Fond bokeh doré animé */
const BOKEH = [
  { l: "4%", t: "10%", s: 110, c: "#e8c877", d: "0s" },
  { l: "16%", t: "66%", s: 70, c: "#f3dfc4", d: "1.2s" },
  { l: "78%", t: "14%", s: 120, c: "#e0a458", d: "0.6s" },
  { l: "88%", t: "56%", s: 76, c: "#e8c877", d: "2s" },
  { l: "66%", t: "82%", s: 88, c: "#f3dfc4", d: "1.6s" },
  { l: "28%", t: "5%", s: 60, c: "#e0a458", d: "2.4s" },
  { l: "48%", t: "88%", s: 68, c: "#e8c877", d: "0.9s" },
  { l: "92%", t: "34%", s: 52, c: "#f3dfc4", d: "3s" },
  { l: "10%", t: "38%", s: 46, c: "#e0a458", d: "2.7s" },
];

export function BokehBackground() {
  return (
    <div className="bokeh-layer" aria-hidden="true">
      {BOKEH.map((b, i) => (
        <div
          key={i}
          className="bokeh"
          style={{
            left: b.l,
            top: b.t,
            width: b.s,
            height: b.s,
            background: `radial-gradient(circle at 38% 32%, ${b.c}, transparent 72%)`,
            animationDelay: b.d,
          }}
        />
      ))}
    </div>
  );
}

/** Alliances dorées + lauriers + cœur — ornement d'entête */
export function RingsLaurel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 88" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="wedGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ecd28c" />
          <stop offset="45%" stopColor="#c9a24b" />
          <stop offset="100%" stopColor="#a67f2e" />
        </linearGradient>
      </defs>

      {/* laurier gauche */}
      <g>
        <path d="M30 66 C 44 60, 55 46, 60 24" stroke="#8a9a5b" strokeWidth="2" strokeLinecap="round" />
        <Leaf x={33} y={64} rot={155} s={0.95} />
        <Leaf x={42} y={56} rot={125} s={0.85} />
        <Leaf x={50} y={46} rot={100} s={0.8} />
        <Leaf x={56} y={35} rot={75} s={0.72} />
        <Leaf x={60} y={25} rot={52} s={0.62} />
      </g>
      {/* laurier droit (miroir) */}
      <g transform="translate(240 0) scale(-1 1)">
        <path d="M30 66 C 44 60, 55 46, 60 24" stroke="#8a9a5b" strokeWidth="2" strokeLinecap="round" />
        <Leaf x={33} y={64} rot={155} s={0.95} />
        <Leaf x={42} y={56} rot={125} s={0.85} />
        <Leaf x={50} y={46} rot={100} s={0.8} />
        <Leaf x={56} y={35} rot={75} s={0.72} />
        <Leaf x={60} y={25} rot={52} s={0.62} />
      </g>

      {/* alliances entrelacées */}
      <circle cx="106" cy="52" r="20" stroke="url(#wedGold)" strokeWidth="5" />
      <circle cx="134" cy="52" r="20" stroke="url(#wedGold)" strokeWidth="5" />
      <path d="M92 42 A 15 15 0 0 1 104 33" stroke="#f2dc9d" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M146 44 A 14.5 14.5 0 0 0 136 34.5" stroke="#f2dc9d" strokeWidth="2.2" strokeLinecap="round" />

      {/* petit cœur au-dessus */}
      <path
        d="M12 21S4 15.5 4 10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z"
        transform="translate(108 0) scale(1)"
        fill="#c1552c"
      />
      {/* feuilles sous les alliances */}
      <Leaf x={98} y={76} rot={210} s={0.7} />
      <Leaf x={142} y={76} rot={-30} s={0.7} />
    </svg>
  );
}

/** Séparateur : filets dorés + cœur */
export function HeartDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 26" className={className} aria-hidden="true" fill="none">
      <path d="M14 13 L86 13" stroke="#c9a24b" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M134 13 L206 13" stroke="#c9a24b" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M86 13 L92 9.5 L98 13 L92 16.5 Z" fill="#c9a24b" />
      <path d="M122 13 L128 9.5 L134 13 L128 16.5 Z" fill="#c9a24b" />
      <path
        d="M12 21S4 15.5 4 10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z"
        transform="translate(98 1.5) scale(1)"
        fill="#c1552c"
      />
    </svg>
  );
}

/** Branche de laurier seule (pour le médaillon « & ») */
export function LaurelBranch({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 92"
      className={className}
      aria-hidden="true"
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M48 86 C 30 66, 24 40, 34 8" stroke="#8a9a5b" strokeWidth="2.2" strokeLinecap="round" />
      <Leaf x={45} y={82} rot={165} s={1} />
      <Leaf x={34} y={72} rot={115} s={0.95} />
      <Leaf x={27} y={58} rot={90} s={0.9} />
      <Leaf x={27} y={44} rot={68} s={0.82} />
      <Leaf x={31} y={30} rot={45} s={0.74} />
      <Leaf x={38} y={18} rot={24} s={0.62} />
    </svg>
  );
}

/** Médaillon « & » entouré de lauriers */
export function AmpMedallion() {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" aria-hidden="true">
      <LaurelBranch className="h-16 sm:h-20" />
      <div
        className="grid place-items-center rounded-full border-2 shadow-md"
        style={{
          width: 52,
          height: 52,
          background: "radial-gradient(circle at 35% 28%, #7c8c4e, #5f6f3c 62%, #47542e)",
          borderColor: "rgba(201,162,75,0.85)",
        }}
      >
        <span
          className="font-serif italic font-semibold text-2xl"
          style={{ color: "#f7ecd2", textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
        >
          &amp;
        </span>
      </div>
      <LaurelBranch className="h-16 sm:h-20" flip />
    </div>
  );
}

/** Bouquet d'angle floral — à placer dans les 4 coins (miroirs CSS) */
export function FloralCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="wedGold2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ecd28c" />
          <stop offset="50%" stopColor="#c9a24b" />
          <stop offset="100%" stopColor="#a67f2e" />
        </linearGradient>
      </defs>

      {/* rubans dorés */}
      <path d="M4 158 C 44 146, 62 112, 66 62" stroke="url(#wedGold2)" strokeWidth="6" strokeLinecap="round" />
      <path d="M0 186 C 56 174, 88 128, 100 58" stroke="url(#wedGold2)" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
      <path d="M120 4 C 130 34, 122 62, 104 84" stroke="url(#wedGold2)" strokeWidth="4" strokeLinecap="round" opacity="0.85" />

      {/* feuillage */}
      <Leaf x={104} y={86} rot={55} s={1.25} />
      <Leaf x={84} y={148} rot={130} s={1.15} fill="#7c8c4e" dark="#47542e" />
      <Leaf x={22} y={112} rot={-75} s={1.05} fill="#7c8c4e" dark="#47542e" />
      <Leaf x={148} y={44} rot={30} s={1.1} />
      <Leaf x={52} y={188} rot={200} s={0.95} />
      <Leaf x={160} y={92} rot={80} s={0.9} />

      {/* roses */}
      <Rose x={56} y={96} r={38} base="#c1552c" mid="#9e4423" dark="#7c3418" light="#e0925f" />
      <Rose x={122} y={44} r={26} base="#f3dfc4" mid="#d9b98c" dark="#b98f3d" light="#fff6e4" />
      <Rose x={30} y={178} r={21} base="#d3683a" mid="#a94f28" dark="#8f3a1e" light="#e8a06c" />
      <Rose x={104} y={150} r={17} base="#f7ecd2" mid="#d9b98c" dark="#c9a24b" light="#fffdf7" />

      {/* gypsophile + points dorés */}
      <Breath x={162} y={26} s={1.1} />
      <Breath x={26} y={134} s={0.8} />
      <Breath x={146} y={120} s={0.75} />
      <circle cx="186" cy="60" r="2.4" fill="#c9a24b" />
      <circle cx="196" cy="78" r="1.8" fill="#c9a24b" />
      <circle cx="176" cy="94" r="1.8" fill="#c9a24b" />
      <circle cx="120" cy="196" r="2.2" fill="#c9a24b" />
    </svg>
  );
}
