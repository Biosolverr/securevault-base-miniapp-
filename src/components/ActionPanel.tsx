import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS, SECURE_VAULT_ABI, QUARANTINE_STAKE } from "../lib/contract";

export function ActionPanel() {
  const { writeContract } = useWriteContract();

  return (
    <div style={{ display: "grid", gap: 10 }}>
      
      <button
        onClick={() =>
          writeContract({
            address: CONTRACT_ADDRESS,
            abi: SECURE_VAULT_ABI,
            functionName: "deposit",
            value: parseEther("0.01")
          })
        }
      >
        Deposit
      </button>

      <button
        onClick={() =>
          writeContract({
            address: CONTRACT_ADDRESS,
            abi: SECURE_VAULT_ABI,
            functionName: "lock"
          })
        }
      >
        Lock
      </button>

      <button
        onClick={() =>
          writeContract({
            address: CONTRACT_ADDRESS,
            abi: SECURE_VAULT_ABI,
            functionName: "execute"
          })
        }
      >
        Execute
      </button>

      <button
        onClick={() =>
          writeContract({
            address: CONTRACT_ADDRESS,
            abi: SECURE_VAULT_ABI,
            functionName: "refund"
          })
        }
      >
        Refund
      </button>

      <button
        onClick={() =>
          writeContract({
            address: CONTRACT_ADDRESS,
            abi: SECURE_VAULT_ABI,
            functionName: "initiateQuarantine",
            value: QUARANTINE_STAKE
          })
        }
      >
        Quarantine
      </button>
    </div>
  );
}
