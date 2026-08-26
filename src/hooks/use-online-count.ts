"use client";

import { useEffect, useState } from "react";

const HEARTBEAT_MS = 15_000;
const VISITOR_ID_KEY = "rv-visitor-id";

function getVisitorId(): string {
  let id = sessionStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export interface OnlinePresence {
  count: number;
  byCountry: Record<string, number>;
}

/** Live presence on the site (total + per-country breakdown), kept fresh via periodic heartbeats. */
export function useOnlinePresence(): OnlinePresence | null {
  const [presence, setPresence] = useState<OnlinePresence | null>(null);

  useEffect(() => {
    const visitorId = getVisitorId();
    let cancelled = false;

    const beat = async () => {
      try {
        const res = await fetch("/api/online", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setPresence(data);
      } catch {
        // Network hiccup — next heartbeat will retry.
      }
    };

    beat();
    const interval = setInterval(beat, HEARTBEAT_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return presence;
}
