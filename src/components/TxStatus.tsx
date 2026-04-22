export function TxStatus({ status }: any) {
  if (status === "idle") return null;

  return (
    <div
      style={{
        padding: 10,
        borderRadius: 12,
        marginBottom: 10,
        background:
          status === "pending"
            ? "#1e293b"
            : status === "success"
            ? "#064e3b"
            : "#7f1d1d",
        color: "white",
        fontSize: 12,
      }}
    >
      {status.toUpperCase()}
    </div>
  );
}
