"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ fontFamily: "monospace", padding: 24, whiteSpace: "pre-wrap" }}>
      <h1 style={{ fontSize: 18, fontWeight: 700 }}>Seller page error</h1>
      <div style={{ color: "#b91c1c", marginTop: 8 }}>{error.message}</div>
      <div style={{ color: "#666", marginTop: 8, fontSize: 12 }}>{error.digest}</div>
      <pre style={{ fontSize: 11, marginTop: 12, color: "#444", maxHeight: 400, overflow: "auto" }}>{error.stack}</pre>
    </div>
  );
}
