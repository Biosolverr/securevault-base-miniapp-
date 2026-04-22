import { createPublicClient, http, webSocket } from "viem";
import { base } from "wagmi/chains";
import { CONTRACT_ADDRESS, SECURE_VAULT_ABI } from "./contract";

const httpClient = createPublicClient({
  chain: base,
  transport: http(),
});

const wsClient = createPublicClient({
  chain: base,
  transport: webSocket(import.meta.env.VITE_BASE_WS_URL || ""),
});

export function subscribeEvents(onEvent: (e: any) => void) {
  // WS primary
  const unsub = wsClient.watchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: SECURE_VAULT_ABI,
    onLogs: (logs) => {
      logs.forEach(onEvent);
    },
  });

  // fallback polling
  const interval = setInterval(async () => {
    const logs = await httpClient.getLogs({
      address: CONTRACT_ADDRESS,
      abi: SECURE_VAULT_ABI,
      fromBlock: "latest",
    });

    logs.forEach(onEvent);
  }, 5000);

  return () => {
    unsub();
    clearInterval(interval);
  };
}
