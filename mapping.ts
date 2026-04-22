import { Deposited, Refunded, StateChanged } from "../generated/SecureVault/SecureVault";
import { Deposit, Refund, StateChange } from "../generated/schema";

export function handleDeposited(event: Deposited): void {
  const entity = new Deposit(event.transaction.hash.toHex());
  entity.sender = event.params.sender;
  entity.amount = event.params.amount;
  entity.block = event.block.number;
  entity.txHash = event.transaction.hash;
  entity.save();
}

export function handleRefunded(event: Refunded): void {
  const entity = new Refund(event.transaction.hash.toHex());
  entity.recipient = event.params.recipient;
  entity.amount = event.params.amount;
  entity.block = event.block.number;
  entity.txHash = event.transaction.hash;
  entity.save();
}

export function handleStateChanged(event: StateChanged): void {
  const entity = new StateChange(event.transaction.hash.toHex());
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.block = event.block.number;
  entity.txHash = event.transaction.hash;
  entity.save();
}
