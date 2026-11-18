"use client";

import { useState } from "react";

export default function SellerProfile(props: {
  slug: string;
  email: string;
  commissionRate: number;
  apiKey: string;
  trustScore: number;
  trustTicks: string[];
}) {
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ruo, setRuo] = useState("");
  const [shipping, setShipping] = useState("");
  const [entityType, setEntityType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      const r = await fetch("/api/sellers/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: companyName || null,
          contact_email: contactEmail || null,
          contact_phone: contactPhone || null,
          address: address || null,
          ruo_statement: ruo || null,
          shipping_info: shipping || null,
          entity_type: entityType || null,
          payment_method: paymentMethod || null,
        }),
      });
      const j = await r.json();
      setStatus(j.ok ? "Saved ✓" : `Error: ${j.error ?? "unknown"}`);
    } catch (e) {
      setStatus("Network error");
    } finally {
      setSaving(false);
    }
  }

  const input =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="font-semibold mb-1">Account</h2>
        <div className="text-sm text-gray-700 space-y-1">
          <div>Email: <span className="text-gray-800">{props.email}</span></div>
          <div>Commission rate: <span className="text-gray-800">{props.commissionRate}%</span></div>
          <div className="flex items-center gap-2">
            API key (for postbacks):
            <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{props.apiKey || "—"}</code>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold">Company details</h2>
          <span className="text-xs text-emerald-600">contact self-edit · entity/payment need review</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div>
            <label className="text-xs text-gray-700">Company name</label>
            <input className={input} value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder={props.slug} />
          </div>
          <div>
            <label className="text-xs text-gray-700">Contact email</label>
            <input className={input} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="hello@…" />
          </div>
          <div>
            <label className="text-xs text-gray-700">Contact phone</label>
            <input className={input} value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+44…" />
          </div>
          <div>
            <label className="text-xs text-gray-700">Address</label>
            <input className={input} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, city, postcode" />
          </div>
          <div>
            <label className="text-xs text-gray-700">Entity type</label>
            <select className={input} value={entityType} onChange={(e) => setEntityType(e.target.value)}>
              <option value="">—</option>
              <option value="ltd">Limited company</option>
              <option value="sole_trader">Sole trader</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-700">Payment method</label>
            <select className={input} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="">—</option>
              <option value="card">Card</option>
              <option value="bank">Bank transfer</option>
              <option value="crypto">Crypto</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="font-semibold mb-1">TrustScore inputs</h2>
        <p className="text-xs text-gray-600 mb-3">These feed your TrustScore. COA, reviews and domain are verified by us — you can&apos;t self-claim those.</p>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-700">RUO compliance statement</label>
            <textarea className={input} rows={2} value={ruo} onChange={(e) => setRuo(e.target.value)} placeholder="Research-use-only disclaimer on your site" />
          </div>
          <div>
            <label className="text-xs text-gray-700">Shipping info</label>
            <input className={input} value={shipping} onChange={(e) => setShipping(e.target.value)} placeholder="e.g. tracked 24h, free over £50" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="font-semibold mb-2">How to raise your score</h2>
        <ul className="text-sm space-y-2 text-gray-900">
          <li><span className="text-emerald-600 font-medium">+25</span> — Add a COA / lab report to your site, then let us verify it.</li>
          <li><span className="text-emerald-600 font-medium">+15</span> — Install the TrustScore badge on your site (we confirm domain ownership).</li>
          <li><span className="text-emerald-600 font-medium">+15</span> — Verified entity + card/bank payment (book the recertification audit).</li>
          <li><span className="text-emerald-600 font-medium">+10</span> — Collect independent reviews (Trustpilot / Reviews.io).</li>
          <li><span className="text-emerald-600 font-medium">+10</span> — Clear RUO disclaimer on site and products.</li>
          <li><span className="text-emerald-600 font-medium">+10</span> — Advertise tracked shipping.</li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {status && <span className="text-sm text-gray-900">{status}</span>}
      </div>
    </div>
  );
}
