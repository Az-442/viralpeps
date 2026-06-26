"use client";

import { useState } from "react";
import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

const CATEGORIES = [
  "GLP-1 Agonists", "Growth Factors", "Melanotans", "GHRPs",
  "BPC/TB-500", "AOD/Fragments", "Cognitive", "Repair & Recovery",
  "Thymosin", "GH Releasing", "Other",
];

const COUNTRIES = [
  "USA", "UK", "Canada", "Australia", "Netherlands", "Germany",
  "France", "Spain", "Switzerland", "China", "India", "Other",
];

export default function VendorRegisterPage() {
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderNav />
        <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Registration Submitted
            </h1>
            <p className="text-gray-400 text-lg max-w-lg mx-auto">
              Thank you for applying to list your business on ViralPeps. Our team will review your submission and get back to you within 2&ndash;3 business days.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                Back to Home
              </Link>
              <Link href="/vendors" className="px-6 py-3 bg-white/10 text-gray-300 rounded-lg text-sm font-semibold hover:bg-white/20 transition">
                View Suppliers
              </Link>
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
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            List Your Business on{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ViralPeps
            </span>
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Join the most comprehensive peptide directory. Get discovered by thousands of researchers and enthusiasts every month.
          </p>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              ),
              title: "Secure Submission",
              desc: "Your data is encrypted",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ),
              title: "Manual Review",
              desc: "Every supplier vetted",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              ),
              title: "Free Listing",
              desc: "No upfront cost",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ),
              title: "Build Trust",
              desc: "Showcase your COAs",
            },
          ].map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">{t.icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                <p className="text-xs text-gray-500">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Business Name <span className="text-red-500">*</span>
            </label>
            <input type="text" required value={businessName} onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. UK Peptides"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Website URL <span className="text-red-500">*</span>
            </label>
            <input type="url" required value={website} onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://ukpeptides.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@ukpeptides.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Country <span className="text-red-500">*</span>
            </label>
            <select required value={country} onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-white">
              <option value="" disabled>Select country</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Product Categories <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">Select all that apply to your business.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <label key={cat}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition ${
                    selectedCategories.includes(cat)
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}>
                  <input type="checkbox" checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)} className="accent-blue-600" />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Business Description
            </label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your business — history, quality standards, shipping, etc."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-y" />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <div>
                <p className="font-semibold text-amber-800">Manual Review Required</p>
                <p className="text-amber-700 mt-1">
                  All vendor listings are manually reviewed by our team to ensure quality and authenticity.
                  You will be notified via email once your listing is approved (typically within 2&ndash;3 business days).
                </p>
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition">
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-6">
          By submitting, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link>{" "}
          and{" "}<Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
        </p>
      </div>

      <Footer />
    </div>
  );
}
