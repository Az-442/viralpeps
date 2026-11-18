"use client";

import { useState } from "react";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export default function ClaimForm({ vendors }: { vendors: { slug: string; name: string }[] }) {
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [domainMatch, setDomainMatch] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("loading");
    try {
      const r = await fetch("/api/claim-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, email, password }),
      });
      const data = await r.json();
      if (!r.ok || !data.ok) {
        setState("error");
        setError(data.error || "Could not submit. Please try again.");
        return;
      }
      setDomainMatch(data.domainMatch === true);
      setState("success");
    } catch {
      setState("error");
      setError("Network error — please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="min-h-screen bg-white">
        <HeaderNav />
        <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Claim submitted</h1>
            <p className="text-gray-300 text-lg max-w-lg mx-auto">
              We&apos;ll verify you own this listing{domainMatch ? " (your email matches the listing&apos;s domain — good sign)" : ""} and email you login details once approved.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Back to Home</Link>
              <Link href="/vendors" className="px-6 py-3 bg-white/10 text-gray-300 rounded-lg text-sm font-semibold hover:bg-white/20 transition">View Suppliers</Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-16">
        <div className="max-w-[76rem] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Claim your listing</h1>
          <p className="text-gray-300 text-base max-w-xl mx-auto">
            Already listed on ViralPeps? Claim your profile to manage your products, prices and TrustScore.
          </p>
        </div>
      </section>

      <div className="max-w-xl mx-auto px-4 py-10">
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Your listing <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white"
            >
              <option value="" disabled>Select your business…</option>
              {vendors.map((v) => (
                <option key={v.slug} value={v.slug}>{v.name}</option>
              ))}
            </select>
            {vendors.length === 0 && (
              <p className="text-xs text-gray-500 mt-2">All current listings have an owner. If you think this is wrong, contact us.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Work email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@yourbusiness.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <p className="text-xs text-black mt-1.5">Use an email on your business&apos;s domain — it speeds up verification.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8+ characters"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
              <p className="font-semibold text-red-700">Could not submit</p>
              <p className="text-red-600 mt-1">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={state === "loading" || vendors.length === 0}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition"
          >
            {state === "loading" ? "Submitting…" : "Submit claim"}
          </button>
        </form>
        <p className="text-xs text-black text-center mt-6">
          Already have an account?{" "}
          <Link href="/sellers/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
