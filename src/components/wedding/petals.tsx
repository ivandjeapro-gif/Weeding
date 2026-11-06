"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";

const COLORS = ["#c1552c", "#d96c3f", "#e0a458", "#f3dfc4", "#8a9a5b", "#d98e5f"];

type PetalSpec = {
  id: number;
  left: number;
  delay: number;
  dur: number;
  size: number;
  color: string;
  sway: number;
  swayDur: number;
  swayDelay: number;
  opacity: number;
};

/** Pluie de pétales de roses (terracotta / crème / olive) */
export function PetalRain({ count = 26 }: { count?: number }) {
  const petals = useMemo<PetalSpec[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        dur: 9 + Math.random() * 9,
        size: 12 + Math.random() * 16,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        sway: 10 + Math.random() * 22,
        swayDur: 2.8 + Math.random() * 2,
        swayDelay: -Math.random() * 4,
        opacity: 0.65 + Math.random() * 0.3,
      })),
    [count]
  );

  return (
    <div className="petal-rain" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal-fall"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg
            className="petal-sway"
            width={p.size}
            height={p.size * 1.35}
            viewBox="0 0 24 32"
            style={
              {
                "--sway": `${p.sway}px`,
                animationDuration: `${p.swayDur}s`,
                animationDelay: `${p.swayDelay}s`,
                opacity: p.opacity,
                filter: "drop-shadow(0 2px 3px rgba(93, 48, 16, 0.25))",
              } as CSSProperties
            }
          >
            <path
              d="M12 1C20 8 21.5 17 12 31C2.5 17 4 8 12 1Z"
              fill={p.color}
            />
            <path
              d="M12 4C14.8 9 15.6 15.6 12.6 24"
              stroke="rgba(60,25,8,0.18)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
