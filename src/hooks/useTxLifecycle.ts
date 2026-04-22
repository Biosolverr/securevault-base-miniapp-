import { useState } from "react";

export function useTxLifecycle() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  const [hash, setHash] = useState<string | null>(null);

  return {
    status,
    hash,
    setStatus,
    setHash,
  };
}
