import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { base } from "wagmi/chains";
import { CONTRACT_ADDRESS, SECURE_VAULT_ABI } from "../lib/contract";

type VaultEvent = {
  eventName: string;
  args: any;
  blockNumber: bigint;
  transactionHash: string;
};

const client = createPublicClient({
  chain: base,
  transport: http(import.meta.env.VITE_BASE_RPC_URL || "https://mainnet.base.org"),
});

export function useTxFeed() {
  const [events, setEvents] = useState<VaultEvent[]>([]);

  useEffect(() => {
    let active = true;

    // 1. INITIAL LOAD (last events)
    async function loadInitial() {
      const logs = await client.getLogs({
        address: CONTRACT_ADDRESS,
        abi: SECURE_VAULT_ABI,
        fromBlock: "latest",
        toBlock: "latest",
      });

      if (!active) return;

      const parsed = logs.map((log: any) => ({
        eventName: log.eventName,
        args: log.args,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
      }));

      setEvents(parsed.reverse());
    }

    loadInitial();

    // 2. REALTIME LISTENER (polling-style lightweight stream)
    const interval = setInterval(async () => {
      try {
        const latest = await client.getLogs({
          address: CONTRACT_ADDRESS,
          abi: SECURE_VAULT_ABI,
          fromBlock: "latest",
          toBlock: "latest",
        });

        if (latest.length === 0) return;

        const parsed = latest.map((log: any) => ({
          eventName: log.eventName,
          args: log.args,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
        }));

        setEvents((prev) => {
          const merged = [...parsed, ...prev];

          // dedupe by tx hash
          const seen = new Set();
          return merged.filter((e) => {
            if (seen.has(e.transactionHash)) return false;
            seen.add(e.transactionHash);
            return true;
          });
        });
      } catch (e) {
        console.error("realtime feed error:", e);
      }
    }, 4000); // Base-friendly polling (NOT spam RPC)

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return events;
}

    load();
  }, []);

  return events;
}
