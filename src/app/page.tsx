"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DoorScene } from "@/components/wedding/door-scene";
import { Invitation } from "@/components/wedding/invitation";
import { PetalRain } from "@/components/wedding/petals";

type Phase = "closed" | "opening" | "fading" | "opened";

/** Les vantails sont grands ouverts → l'overlay commence à s'estomper */
const FADE_AT = 2300;
/** L'overlay est retiré → l'invitation prend toute la scène */
const REMOVE_AT = 3600;

export default function Home() {
  const [phase, setPhase] = useState<Phase>("closed");
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const openDoor = useCallback(() => {
    if (phase !== "closed") return;
    setPhase("opening");
    timers.current.push(window.setTimeout(() => setPhase("fading"), FADE_AT));
    timers.current.push(window.setTimeout(() => setPhase("opened"), REMOVE_AT));
  }, [phase]);

  const replay = useCallback(() => {
    clearTimers();
    window.scrollTo({ top: 0 });
    setPhase("closed");
  }, [clearTimers]);

  // Nettoyage des minuteries au démontage
  useEffect(() => clearTimers, [clearTimers]);

  // Verrouille le défilement tant que la porte est fermée
  useEffect(() => {
    const scrollable = phase === "fading" || phase === "opened";
    document.body.style.overflow = scrollable ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const showInvitation = phase === "fading" || phase === "opened";

  return (
    <>
      {showInvitation && (
        <>
          <Invitation onReplay={replay} />
          <PetalRain />
        </>
      )}
      {phase !== "opened" && <DoorScene phase={phase} onOpen={openDoor} />}
    </>
  );
}
