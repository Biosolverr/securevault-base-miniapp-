import { VAULT_STATES } from "../lib/contract";

export function StateMachine({ currentState }: any) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {VAULT_STATES.map((s, i) => (
        <div
          key={s}
          style={{
            padding: 6,
            border: currentState === i ? "1px solid #00ffb2" : "1px solid #333"
          }}
        >
          {s}
        </div>
      ))}
    </div>
  );
}
