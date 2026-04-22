import { useTxFeed } from "../hooks/useTxFeed";

export function Feed() {
  const events = useTxFeed();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {events.map((e, i) => (
        <div
          key={i}
          style={{
            padding: 12,
            border: "1px solid #1f2937",
            borderRadius: 12,
            background: "#0b0f17",
          }}
        >
          <div style={{ fontSize: 11, opacity: 0.6 }}>
            onchain event
          </div>

          <div style={{ fontWeight: 600 }}>
            {e.eventName ?? "Vault Event"}
          </div>
        </div>
      ))}
    </div>
  );
}
