import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, SECURE_VAULT_ABI } from "../lib/contract";

export function useVault() {
  const { data } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SECURE_VAULT_ABI,
    functionName: "currentState"
  });

  return {
    currentState: Number(data ?? 0)
  };
}
