const seen = new Map<string, number>();

export function reorgGuard(event: any) {
  const key = event.transactionHash;
  const confirmations = event.blockNumber ?? 0;

  const prev = seen.get(key);

  // ignore reorged / unstable events
  if (prev && confirmations < prev + 2n) {
    return null;
  }

  seen.set(key, confirmations);
  return event;
}
