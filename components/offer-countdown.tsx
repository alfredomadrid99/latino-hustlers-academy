"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

const duration = 10 * 60;
const storageKey = "lha-registration-countdown";

export function OfferCountdown() {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const now = Date.now();
    let deadline = now + duration * 1000;
    try {
      const stored = Number(sessionStorage.getItem(storageKey));
      if (Number.isFinite(stored) && stored > 0 && stored <= deadline) {
        deadline = stored;
      } else {
        sessionStorage.setItem(storageKey, String(deadline));
      }
    } catch {
      // Storage can be disabled. The countdown can still run on this page.
    }

    function update() {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSeconds(remaining);
      return remaining;
    }

    if (!update()) return;
    const interval = window.setInterval(() => {
      if (!update()) window.clearInterval(interval);
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const time = [Math.floor(seconds / 60), seconds % 60]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");

  return (
    <div className="offer-countdown">
      <span className="offer-clock">
        <Clock3 size={17} aria-hidden="true" />
        <span
          role="timer"
          aria-label="Tiempo sugerido para registrar tu interés"
        >
          {time}
        </span>
      </span>
      <span>
        {seconds ? "Tiempo sugerido" : "Registro disponible"}
      </span>
    </div>
  );
}
