import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { base } from "wagmi/chains";
import { CONTRACT_ADDRESS, SECURE_VAULT_ABI } from "../lib/contract";

const client = createPublicClient({
  chain: base,
  transport: http(import.meta.env.VITE_BASE_RPC_URL || "https://mainnet.base.org"),
});

export function useTxFeed() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const logs = await client.getLogs({
          address: CONTRACT_ADDRESS,
          abi: SECURE_VAULT_ABI,
          fromBlock: "latest",
        });

        setEvents(logs.reverse());
      } catch (e) {
        console.error("feed error:", e);
      }
    }

    load();
  }, []);

  return events;
}
