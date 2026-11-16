"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "60px auto", padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700 }}>Something went wrong</h1>
      <p style={{ color: "#b91c1c", marginTop: 12, whiteSpace: "pre-wrap" }}>{error.message || "Unknown error"}</p>
      {error.digest && <p style={{ color: "#9ca3af", fontSize: 12 }}>Digest: {error.digest}</p>}
      <button onClick={reset} style={{ marginTop: 16, padding: "8px 16px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
        Try again
      </button>
    </div>
  );
}
