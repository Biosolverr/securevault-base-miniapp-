export const CONTRACT_ADDRESS =
  "0xcc3ecd133d27e2c9f0d6ae1701d8f70364efdc34";

export const QUARANTINE_STAKE = BigInt("10000000000000000");

export const SECURE_VAULT_ABI = [/* твой ABI вставь сюда */];

export const VAULT_STATES = [
  "INIT",
  "FUNDED",
  "LOCKED",
  "EXECUTION_PENDING",
  "EXECUTED",
  "REFUNDED"
] as const;
