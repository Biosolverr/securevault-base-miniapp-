import { ConnectWallet } from "./components/ConnectWallet";
import { ActionPanel } from "./components/ActionPanel";
import { Feed } from "./components/Feed";
import { StateMachine } from "./components/StateMachine";
import { useVault } from "./hooks/useVault";
import { useNetworkGuard } from "./hooks/useNetworkGuard";

export default function App() {
  const vault = useVault();
  const { isCorrect, enforce } = useNetworkGuard();

  enforce(); // force Base network

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 20 }}>

      <ConnectWallet />

      {!isCorrect && (
        <div style={{ color: "red" }}>
          Switch to Base mainnet
        </div>
      )}

      <StateMachine currentState={vault.currentState} />

      <Feed />

      <ActionPanel />
    </div>
  );
}
