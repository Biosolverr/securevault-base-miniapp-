import { useEffect, useState } from "react";
import { subscribeEvents } from "../lib/eventProvider";
import { reorgGuard } from "../lib/reorgGuard";

export function useTxFeed() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const cleanup = subscribeEvents((event) => {
      const safe = reorgGuard(event);
      if (!safe) return;

      setEvents((prev) => [safe, ...prev]);
    });

    return cleanup;
  }, []);

  return events;
}
