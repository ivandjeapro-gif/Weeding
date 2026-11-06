"use client";

import { useSyncExternalStore } from "react";

/** 21 novembre 2026, 09h30 (heure de la cérémonie à la mairie) */
const TARGET = new Date(2026, 10, 21, 9, 30, 0).getTime();

const pad = (n: number) => n.toString().padStart(2, "0");

/** Horloge externe : un « tick » par seconde */
const subscribe = (onStoreChange: () => void) => {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
};
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => 0;

/** Compte à rebours avant le grand jour */
export function Countdown() {
  const tick = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (tick === 0) {
    // instant de pré-rendu / hydratation : cellules encore vides
    return (
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-md mx-auto" aria-hidden="true">
        {["—", "—", "—", "—"].map((v, i) => (
          <div key={i} className="cd-box text-center">
            <div className="cd-num">{v}</div>
            <div className="cd-label">&nbsp;</div>
          </div>
        ))}
      </div>
    );
  }

  const diff = Math.max(0, TARGET - tick * 1000);

  if (TARGET - tick * 1000 <= 0) {
    return (
      <p className="script-closing text-center text-xl sm:text-2xl" role="status">
        Le grand jour est arrivé !
      </p>
    );
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor(diff / 3_600_000) % 24;
  const minutes = Math.floor(diff / 60_000) % 60;
  const seconds = Math.floor(diff / 1_000) % 60;

  const cells: Array<[string, string]> = [
    [days.toString(), "Jours"],
    [pad(hours), "Heures"],
    [pad(minutes), "Minutes"],
    [pad(seconds), "Secondes"],
  ];

  return (
    <div
      className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-md mx-auto"
      role="timer"
      aria-label="Compte à rebours avant le mariage"
    >
      {cells.map(([value, label]) => (
        <div key={label} className="cd-box text-center">
          <div className="cd-num">{value}</div>
          <div className="cd-label">{label}</div>
        </div>
      ))}
    </div>
  );
}
