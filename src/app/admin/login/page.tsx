"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function OwnerLoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [checked, setChecked] = useState(false);

  // Ask the server whether any owner exists yet. If none, this is first run.
  useEffect(() => {
    fetch("/api/owner/status")
      .then((r) => r.json())
      .then((j) => setIsSetup(j?.needsSetup === true))
      .catch(() => setIsSetup(false))
      .finally(() => setChecked(true));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (isSetup) {
      if (password !== confirm) {
        setError("Passwords do not match");
        return;
      }
    }

    setBusy(true);
    try {
      if (isSetup) {
        // 1. create the first owner
        const c = await fetch("/api/owner/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ setup: true, email, password, name: name || "Owner" }),
        });
        const cj = await c.json();
        if (!cj.ok) {
          setError(cj.error ?? "Setup failed");
          return;
        }
      }
      // 2. sign in
      const r = await fetch("/api/owner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const j = await r.json();
      if (j.ok) {
        router.push(next);
      } else {
        setError(j.error ?? "Login failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-2xl">◆</div>
          <h1 className="text-lg font-bold mt-1">Owner Dashboard</h1>
          <div className="text-[10px] tracking-widest text-gray-400">VIRALPEPS</div>
        </div>

        <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          {isSetup && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
              First-run setup. Create the owner account. This can only be done once —
              once an owner exists this screen disappears.
            </div>
          )}

          {isSetup && (
            <div>
              <label className="text-xs text-gray-500">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Azar Hussain"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-gray-500">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@viralpeps.co.uk"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>

          {isSetup && (
            <div>
              <label className="text-xs text-gray-500">Confirm password</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {error && <div className="text-sm text-rose-600">{error}</div>}

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {busy ? (isSetup ? "Creating…" : "Signing in…") : isSetup ? "Create owner account" : "Sign in"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Supplier? <a href="/sellers/login" className="text-blue-600 hover:underline">Supplier portal</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function OwnerLoginPage() {
  return (
    <Suspense>
      <OwnerLoginForm />
    </Suspense>
  );
}
