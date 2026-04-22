import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div>
        <p>{address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );

  return (
    <div>
      {connectors.map((c) => (
        <button key={c.id} onClick={() => connect({ connector: c })}>
          Connect Base Wallet
        </button>
      ))}
    </div>
  );
}
