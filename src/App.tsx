import { useVault } from "./hooks/useVault";
import { ConnectWallet } from "./components/ConnectWallet";
import { ActionPanel } from "./components/ActionPanel";
import { StateMachine } from "./components/StateMachine";

export default function App() {
  const vault = useVault();

  return (
    <div style={{ padding: 20, maxWidth: 420, margin: "0 auto" }}>
      <h2>SecureVault Base Mainnet</h2>

      <ConnectWallet />

      <StateMachine currentState={vault.currentState} />

      <ActionPanel />
    </div>
  );
}
