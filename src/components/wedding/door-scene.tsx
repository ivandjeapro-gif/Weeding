"use client";

import Image from "next/image";
import { MousePointerClick } from "lucide-react";
import coupleCutout from "@/assets/norbe-ericka.webp";
import { RingsLaurel, BokehBackground } from "./ornaments";

export type DoorPhase = "closed" | "opening" | "fading";

const SPARKS: Array<{ dx: string; d: string }> = [
  { dx: "-72px", d: "0.5s" },
  { dx: "-40px", d: "0.72s" },
  { dx: "-14px", d: "0.56s" },
  { dx: "18px", d: "0.8s" },
  { dx: "46px", d: "0.62s" },
  { dx: "76px", d: "0.92s" },
  { dx: "-92px", d: "1.02s" },
  { dx: "98px", d: "1.08s" },
  { dx: "-26px", d: "1.16s" },
  { dx: "34px", d: "1.22s" },
];

/**
 * Scène d'ouverture : la grande porte de célébration.
 * Un clic (ou Entrée / Espace au clavier) fait pivoter les deux vantails
 * et laisse entrer la lumière — puis l'invitation.
 */
export function DoorScene({ phase, onOpen }: { phase: DoorPhase; onOpen: () => void }) {
  const opening = phase !== "closed";

  return (
    <div
      className={`door-overlay ${opening ? "is-opening" : ""} ${phase === "fading" ? "is-fading" : ""}`}
      aria-hidden={opening}
    >
      <BokehBackground />

      {/* Entête au-dessus de la porte */}
      <div className="door-intro flex flex-col items-center text-center gap-1">
        <RingsLaurel className="w-40 sm:w-52" />
        <p className="door-label px-4">Vous êtes invités à la célébration de</p>
        <p className="door-names">
          NORBÉ <span className="amp">&amp;</span> ERICKA
        </p>
        <p className="door-date-script">le 21 novembre 2026</p>
      </div>

      {/* La porte cliquable */}
      <button
        type="button"
        className="door-button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Ouvrez la grande porte de célébration pour découvrir l'invitation"
      >
        <span className="door-crest" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="#c1552c">
            <path d="M12 21S4 15.5 4 10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z" />
          </svg>
        </span>
        <span className="door-frame block">
          <span className="door-wall block">
            <span className="door-glow" aria-hidden="true" />
            {/* Norbé & Ericka apparaissent dans la lumière dès que les vantails s'écartent */}
            <span className="door-reveal" aria-hidden="true">
              <span className="reveal-halo" />
              <Image
                src={coupleCutout}
                alt=""
                className="reveal-couple"
                priority
                placeholder="empty"
              />
            </span>
            <span className="door-stage" aria-hidden="true">
              {/* vantail gauche */}
              <span className="door-panel left">
                <span className="panel-inset upper">
                  <span className="panel-initial" style={{ fontSize: "clamp(2.4rem, 9vw, 3.6rem)" }}>
                    N
                  </span>
                </span>
                <span className="panel-inset lower">
                  <span className="panel-lines">
                    <span />
                    <span />
                    <span />
                  </span>
                </span>
                <span className="handle-plate" style={{ right: 10 }} />
                <span className="handle-ring" style={{ right: 17 }} />
              </span>
              {/* vantail droit */}
              <span className="door-panel right">
                <span className="panel-inset upper">
                  <span className="panel-initial" style={{ fontSize: "clamp(2.4rem, 9vw, 3.6rem)" }}>
                    E
                  </span>
                </span>
                <span className="panel-inset lower">
                  <span className="panel-lines">
                    <span />
                    <span />
                    <span />
                  </span>
                </span>
                <span className="handle-plate" style={{ left: 10 }} />
                <span className="handle-ring" style={{ left: 17 }} />
              </span>
              {/* étincelles dorées */}
              {SPARKS.map((s, i) => (
                <span
                  key={i}
                  className="spark"
                  style={{ "--dx": s.dx, "--d": s.d } as React.CSSProperties}
                />
              ))}
            </span>
          </span>
        </span>
        {/* seuil + ombre au sol */}
        <span className="door-threshold block" aria-hidden="true" />
        <span className="door-shadow block" aria-hidden="true" />
      </button>

      {/* Indication */}
      <div className="door-hint">
        <span className="door-hint-btn">
          <MousePointerClick className="h-4 w-4" aria-hidden="true" />
          Touchez la porte pour entrer
        </span>
      </div>
    </div>
  );
}
