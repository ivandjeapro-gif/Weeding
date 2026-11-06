"use client";

import { Church, Landmark, RotateCcw, Wine } from "lucide-react";
import {
  AmpMedallion,
  BokehBackground,
  FloralCorner,
  HeartDivider,
  RingsLaurel,
} from "./ornaments";
import { Countdown } from "./countdown";

const PROGRAMME = [
  {
    icon: Landmark,
    tone: "olive" as const,
    chip: "Union civile",
    time: "09h30",
    place: "Mairie d'Agnibilékrou",
  },
  {
    icon: Church,
    tone: "terra" as const,
    chip: "Cérémonie religieuse",
    time: "12h00",
    place: "Église des Assemblées de Dieu d'Agnibilékrou, Temple du Salut.",
  },
  {
    icon: Wine,
    tone: "olive" as const,
    chip: "Réception",
    time: "14h00",
    place: "Dans la cour de l'église.",
  },
];

const d = (s: string) => ({ "--d": s } as React.CSSProperties);

/**
 * L'invitation complète, révélée après l'ouverture de la porte.
 * Contenu fidèle à l'invitation imprimée : versets, date, programme.
 */
export function Invitation({ onReplay }: { onReplay: () => void }) {
  return (
    <main className="invitation-root">
      <BokehBackground />

      <div className="relative z-10 px-2 sm:px-4">
        <article className="inv-card">
          {/* bouquets floraux aux quatre coins */}
          <FloralCorner className="corner-floral corner-tl" />
          <FloralCorner className="corner-floral corner-tr" />
          <FloralCorner className="corner-floral corner-bl" />
          <FloralCorner className="corner-floral corner-br" />

          <div className="relative z-10 text-center">
            <h1 className="sr-only">
              Norbé &amp; Ericka — Invitation à notre mariage, le 21 novembre 2026 à
              Agnibilékrou
            </h1>

            {/* Entête */}
            <header className="reveal" style={d("0.05s")}>
              <RingsLaurel className="w-40 sm:w-52 mx-auto" />
              <p className="inv-label mt-2">
                En union avec
                <br />
                leurs familles respectives
              </p>
              <HeartDivider className="w-44 sm:w-52 mx-auto mt-3" />
            </header>

            {/* Les mariés */}
            <div className="mt-6 sm:mt-8">
              <p className="name-serif name-terra reveal" style={d("0.2s")}>
                NORBÉ
              </p>
              <blockquote className="verse max-w-md mx-auto mt-3 reveal" style={d("0.3s")}>
                « Chaque maison est construite par quelqu&apos;un, mais celui qui a construit
                toutes choses, c&apos;est Dieu. »
                <span className="verse-ref block mt-1.5">— Hébreux 3:4</span>
              </blockquote>

              <div className="my-5 sm:my-6 reveal" style={d("0.42s")}>
                <AmpMedallion />
              </div>

              <p className="name-serif name-olive reveal" style={d("0.52s")}>
                ERICKA
              </p>
              <blockquote className="verse max-w-md mx-auto mt-3 reveal" style={d("0.62s")}>
                « Et si quelqu&apos;un est plus fort qu&apos;un seul, les deux peuvent lui
                résister ; et la corde à trois fils ne se rompt pas facilement. »
                <span className="verse-ref block mt-1.5">— Ecclésiaste 4:12</span>
              </blockquote>
            </div>

            {/* Invitation */}
            <p className="invite-text max-w-lg mx-auto mt-7 reveal" style={d("0.74s")}>
              ont l&apos;immense plaisir de vous convier à la célébration de leur union{" "}
              <strong className="invite-strong">civile et religieuse</strong> qui aura lieu
            </p>

            {/* Date */}
            <div className="mt-5 reveal" style={d("0.85s")}>
              <div className="date-banner mx-auto">
                <span className="date-text block">21 NOVEMBRE 2026</span>
              </div>
            </div>

            {/* Compte à rebours */}
            <section className="mt-7 sm:mt-8 reveal" style={d("0.95s")} aria-label="Compte à rebours">
              <Countdown />
            </section>

            {/* Programme */}
            <section className="mt-8 sm:mt-10 reveal" style={d("1.05s")} aria-label="Programme de la journée">
              <p className="inv-label">Programme de la journée</p>
              <HeartDivider className="w-40 mx-auto mt-2.5" />

              <ol className="mt-6 space-y-6 sm:space-y-7 text-left max-w-md mx-auto">
                {PROGRAMME.map((item, i) => (
                  <li
                    key={item.time}
                    className="prog-line flex items-center gap-4 sm:gap-5 pl-14 pr-1"
                  >
                    <span className="prog-dot" aria-hidden="true" />
                    <span className={`prog-icon ${item.tone}`} aria-hidden="true">
                      <item.icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="prog-time block">{item.time}</span>
                      <span className="prog-place block mt-0.5">{item.place}</span>
                      <span className="prog-chip mt-2">{item.chip}</span>
                    </span>
                    <span className="sr-only">
                      Étape {i + 1} du programme.
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Conclusion */}
            <footer className="mt-9 sm:mt-11 reveal" style={d("1.2s")}>
              <RingsLaurel className="w-36 sm:w-44 mx-auto opacity-90" />
              <p className="script-closing mt-1">Nous vous attendons avec joie !</p>
              <p className="inv-label mt-5" style={{ letterSpacing: "0.22em" }}>
                Norbé &amp; Ericka — 21.11.2026
              </p>
              <div className="mt-5">
                <button type="button" className="replay-btn" onClick={onReplay}>
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Revoir l&apos;ouverture de la porte
                </button>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </main>
  );
}
