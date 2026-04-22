import { keccak256, encodeAbiParameters } from "viem";

export function verifyEventSignature(event: any, expectedHash: string) {
  const encoded = encodeAbiParameters(
    [{ type: "address" }, { type: "uint256" }],
    [event.args.sender, event.args.amount]
  );

  const hash = keccak256(encoded);

  return hash === expectedHash;
}
