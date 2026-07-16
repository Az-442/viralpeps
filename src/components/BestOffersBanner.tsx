"use client";

import { useState } from "react";

export default function BestOffersBanner() {
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!visible) return null;

  const handleSubscribe = async () => {
    if (!email || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, result: "Never Overpay for Peptides" }),
      });
      if (res.ok || res.status === 409) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white">
      <div className="max-w-5xl mx-auto px-4 py-4 md:py-5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        {/* Icon + Text */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-2xl md:text-3xl">🔥</span>
          <div>
            <p className="text-sm md:text-base font-bold leading-tight">
              Save big on every peptide order
            </p>
            <p className="text-xs md:text-sm text-white/80 mt-0.5">
              Get weekly price drop alerts on every UK supplier — never overpay again.
            </p>
          </div>
        </div>

        {/* Email input + button */}
        {status === "sent" ? (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-semibold text-green-200">✅ You're in! Check your inbox.</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full md:w-56 px-3 py-2 rounded-lg text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            />
            <button
              onClick={handleSubscribe}
              disabled={!email || status === "sending"}
              className="whitespace-nowrap bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-500 disabled:cursor-not-allowed text-indigo-900 font-bold px-4 py-2 rounded-lg text-sm transition"
            >
              {status === "sending" ? "..." : "Get Alerts"}
            </button>
          </div>
        )}

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-3 md:static text-white/50 hover:text-white transition text-lg leading-none shrink-0"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
