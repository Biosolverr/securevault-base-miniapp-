import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS, SECURE_VAULT_ABI } from "../lib/contract";
import { useTxLifecycle } from "../hooks/useTxLifecycle";
import { writeSafe } from "../lib/writeSafe";
import { TxStatus } from "./TxStatus";

export function ActionPanel() {
  const { writeContract } = useWriteContract();
  const { status, setStatus } = useTxLifecycle();

  return (
    <div style={{ display: "grid", gap: 10 }}>

      <TxStatus status={status} />

      <button
        onClick={() =>
          writeSafe(writeContract, setStatus, {
            address: CONTRACT_ADDRESS,
            abi: SECURE_VAULT_ABI,
            functionName: "deposit",
            value: parseEther("0.01"),
          })
        }
      >
        Deposit
      </button>

      <button
        onClick={() =>
          writeSafe(writeContract, setStatus, {
            address: CONTRACT_ADDRESS,
            abi: SECURE_VAULT_ABI,
            functionName: "lock",
          })
        }
      >
        Lock
      </button>

      <button
        onClick={() =>
          writeSafe(writeContract, setStatus, {
            address: CONTRACT_ADDRESS,
            abi: SECURE_VAULT_ABI,
            functionName: "execute",
          })
        }
      >
        Execute
      </button>

    </div>
  );
}
