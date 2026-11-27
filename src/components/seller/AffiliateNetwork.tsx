"use client";

import { useState } from "react";

export interface AffiliateSale {
  id: number;
  order_id: string;
  order_value: number;
  commission_amount: number;
  status: string;
  customer_type: string | null;
  created_at: string;
  ignored_reason?: string | null;
}

export interface AffiliateConnection {
  connected: boolean;
  token_hint: string | null;
  connected_at: string | null;
  store_url: string | null;
}

/**
 * The Affiliate Network tab.
 *
 * Three states: not connected (show the install steps + a way to mint a claim
 * code), connected (show what's live + recent conversions), and error.
 *
 * The claim code is the only secret the supplier ever handles. It is shown
 * once, is single-use, and dies after 24 hours — so the page deliberately
 * does not persist it anywhere.
 */
export default function AffiliateNetwork(props: {
  slug: string;
  connection: AffiliateConnection;
  sales: AffiliateSale[];
  commissionRate: number;
}) {
  const [claimCode, setClaimCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const connected = props.connection?.connected;
  const pluginUrl = "/downloads/viralpeps-affiliate-1.0.0.zip";

  async function generateCode() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/affiliate/claim-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendor_slug: props.slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Could not generate a claim code.");
      } else {
        setClaimCode(data.claim_code);
        setExpiresAt(data.expires_at);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copyCode() {
    if (!claimCode) return;
    try {
      await navigator.clipboard.writeText(claimCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy — select the code manually.");
    }
  }

  const commissionRate = props.commissionRate ?? 20;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Affiliate network</h2>
        <p className="text-sm text-gray-600 mt-1">
          Connect your store so orders from ViralPeps visitors are tracked and
          commission is calculated automatically.
        </p>
      </div>

      {/* ── status ─────────────────────────────────────────────────── */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  connected ? "bg-emerald-500" : "bg-gray-300"
                }`}
              />
              <span className="font-medium text-gray-900">
                {connected ? "Connected" : "Not connected"}
              </span>
            </div>
            {connected ? (
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div>
                  Store token:{" "}
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                    {props.connection.token_hint ?? "—"}
                  </code>
                </div>
                {props.connection.store_url && (
                  <div>
                    Store:{" "}
                    <span className="text-gray-800">{props.connection.store_url}</span>
                  </div>
                )}
                {props.connection.connected_at && (
                  <div>
                    Connected since{" "}
                    {new Date(props.connection.connected_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-600 max-w-lg">
                Install the plugin on your WooCommerce store, then connect it with a
                claim code generated here.
              </p>
            )}
          </div>

          {!connected && (
            <button
              onClick={generateCode}
              disabled={busy}
              className="shrink-0 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
            >
              {busy ? "Generating…" : claimCode ? "New code" : "Generate claim code"}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        )}

        {claimCode && (
          <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              Your claim code — shown once
            </div>
            <div className="mt-2 flex items-center gap-3">
              <code className="select-all rounded bg-white px-3 py-2 font-mono text-base tracking-wider text-gray-900 border border-amber-300">
                {claimCode}
              </code>
              <button
                onClick={copyCode}
                className="rounded border border-amber-400 bg-white px-3 py-2 text-xs font-medium text-amber-900 hover:bg-amber-100"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-xs text-amber-900">
              Single use. Expires{" "}
              {expiresAt
                ? new Date(expiresAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "in 24 hours"}
              . Paste it into the plugin&apos;s setup screen.
            </p>
          </div>
        )}
      </div>

      {/* ── install steps ──────────────────────────────────────────── */}
      {!connected && (
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="font-medium text-gray-900">Set up in four steps</h3>
          <ol className="mt-3 space-y-4 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                1
              </span>
              <div>
                <div className="font-medium text-gray-900">Download the plugin</div>
                <a
                  href={pluginUrl}
                  className="mt-1 inline-block text-blue-700 hover:underline"
                  download
                >
                  viralpeps-affiliate-1.0.0.zip
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  Also installable directly from the WordPress plugin directory.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                2
              </span>
              <div>
                <div className="font-medium text-gray-900">Upload and activate</div>
                <p className="mt-1 text-xs text-gray-500">
                  WordPress admin → Plugins → Add New → Upload Plugin → choose the zip
                  → Install → Activate. Requires WooCommerce.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                3
              </span>
              <div>
                <div className="font-medium text-gray-900">Generate a claim code</div>
                <p className="mt-1 text-xs text-gray-500">
                  Use the button above. The code is single use and expires after 24
                  hours.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">
                4
              </span>
              <div>
                <div className="font-medium text-gray-900">Paste it into the plugin</div>
                <p className="mt-1 text-xs text-gray-500">
                  WooCommerce → ViralPeps Affiliate → paste the claim code → Connect
                  store. The plugin fetches its own token; you never see or handle it.
                </p>
              </div>
            </li>
          </ol>
        </div>
      )}

      {/* ── how commission works ───────────────────────────────────── */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="font-medium text-gray-900">How you earn</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md bg-gray-50 p-4">
            <div className="text-2xl font-semibold text-gray-900">{commissionRate}%</div>
            <div className="mt-1 text-xs text-gray-600">New customers you sell to</div>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <div className="text-2xl font-semibold text-gray-900">90 days</div>
            <div className="mt-1 text-xs text-gray-600">Attribution window per click</div>
          </div>
          <div className="rounded-md bg-gray-50 p-4">
            <div className="text-2xl font-semibold text-gray-900">14 days</div>
            <div className="mt-1 text-xs text-gray-600">Held before commission matures</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Commission is calculated on what the customer actually paid for goods —
          shipping is excluded and refunds reverse the commission on the refunded
          amount. A customer you acquired through ViralPeps stays yours, so their repeat
          orders still pay.
        </p>
      </div>

      {/* ── recent conversions ─────────────────────────────────────── */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="font-medium text-gray-900">Recent conversions</h3>
        {props.sales.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">
            No conversions yet. Once your store is connected, referred orders will
            appear here automatically.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wide text-gray-500">
                <tr className="border-b border-gray-200">
                  <th className="py-2 text-left font-medium">Order</th>
                  <th className="py-2 text-left font-medium">Date</th>
                  <th className="py-2 text-left font-medium">Type</th>
                  <th className="py-2 text-right font-medium">Value</th>
                  <th className="py-2 text-right font-medium">Commission</th>
                  <th className="py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {props.sales.slice(0, 25).map((s) => (
                  <tr key={s.id} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 font-mono text-xs text-gray-700">{s.order_id}</td>
                    <td className="py-2 text-gray-600">
                      {new Date(s.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="py-2 text-gray-600">
                      {s.customer_type === "existing" ? "Repeat" : "New"}
                    </td>
                    <td className="py-2 text-right text-gray-800">
                      £{Number(s.order_value).toFixed(2)}
                    </td>
                    <td className="py-2 text-right font-medium text-gray-900">
                      £{Number(s.commission_amount).toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      <StatusPill status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    completed: "bg-emerald-50 text-emerald-800 border-emerald-200",
    pending: "bg-amber-50 text-amber-800 border-amber-200",
    refunded: "bg-red-50 text-red-800 border-red-200",
    cancelled: "bg-gray-100 text-gray-700 border-gray-200",
    failed: "bg-red-50 text-red-800 border-red-200",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-700 border-gray-200";
  return (
    <span className={`inline-block rounded border px-2 py-0.5 text-xs capitalize ${cls}`}>
      {status}
    </span>
  );
}
