import { useEffect, useState } from "react";
import { createPublicClient, http, webSocket } from "viem";
import { base } from "wagmi/chains";
import { CONTRACT_ADDRESS, SECURE_VAULT_ABI } from "../lib/contract";
import { reorgGuard } from "../lib/reorgGuard";

const httpClient = createPublicClient({
  chain: base,
  transport: http(import.meta.env.VITE_BASE_RPC_URL || "https://mainnet.base.org"),
});

const wsClient = createPublicClient({
  chain: base,
  transport: webSocket(import.meta.env.VITE_BASE_WS_URL || ""),
});

export function useTxFeed() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    let active = true;

    // 🔹 1. initial load (last events)
    async function loadInitial() {
      const logs = await httpClient.getLogs({
        address: CONTRACT_ADDRESS,
        abi: SECURE_VAULT_ABI,
        fromBlock: "latest",
      });

      if (!active) return;

      setEvents(
        logs.map((l) => reorgGuard(l)).filter(Boolean).reverse()
      );
    }

    loadInitial();

    // 🔹 2. realtime WS (if available)
    let unsubscribe: any;

    try {
      unsubscribe = wsClient.watchContractEvent({
        address: CONTRACT_ADDRESS,
        abi: SECURE_VAULT_ABI,
        onLogs: (logs) => {
          const parsed = logs.map((l) => reorgGuard(l)).filter(Boolean);

          setEvents((prev) => {
            const merged = [...parsed, ...prev];

            // dedupe tx hash
            const seen = new Set();
            return merged.filter((e) => {
              const key = e.transactionHash;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
          });
        },
      });
    } catch (e) {
      console.warn("WS not available, fallback active only");
    }

    // 🔹 3. fallback polling (Base-safe)
    const interval = setInterval(async () => {
      const logs = await httpClient.getLogs({
        address: CONTRACT_ADDRESS,
        abi: SECURE_VAULT_ABI,
        fromBlock: "latest",
      });

      if (!logs.length) return;

      const parsed = logs.map((l) => reorgGuard(l)).filter(Boolean);

      setEvents((prev) => {
        const merged = [...parsed, ...prev];
        const seen = new Set();

        return merged.filter((e) => {
          if (seen.has(e.transactionHash)) return false;
          seen.add(e.transactionHash);
          return true;
        });
      });
    }, 4000);

    return () => {
      active = false;
      clearInterval(interval);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return events;
}
