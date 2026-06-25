"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  "GLP-1 Agonists",
  "Growth Factors",
  "Melanotans",
  "GHRPs",
  "BPC/TB-500",
  "AOD/Fragments",
  "Cognitive",
  "Repair & Recovery",
  "Thymosin",
  "GH Releasing",
  "Other",
];

const COUNTRIES = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Netherlands",
  "Germany",
  "France",
  "Spain",
  "Switzerland",
  "China",
  "India",
  "Other",
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
    // Simulate API call — placeholder endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VP</span>
                </div>
                <span className="font-bold text-xl text-gray-900">ViralPeps</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/compounds" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Compounds</Link>
                <Link href="/vendors" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Vendors</Link>
                <Link href="/research" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Research</Link>
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 font-medium">About</Link>
              </div>
            </div>
          </div>
        </nav>

        <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Registration Submitted
            </h1>
            <p className="text-gray-400 text-lg max-w-lg mx-auto">
              Thank you for applying to list your business on ViralPeps. Our team will review your submission and get back to you within 2–3 business days.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Back to Home
              </Link>
              <Link
                href="/vendors"
                className="px-6 py-3 bg-white/10 text-gray-300 rounded-lg text-sm font-semibold hover:bg-white/20 transition"
              >
                View Vendors
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-[#0b1a2e] text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs">
            For research purposes only. © 2026 ViralPeps.
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VP</span>
              </div>
              <span className="font-bold text-xl text-gray-900">ViralPeps</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/compounds" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Compounds</Link>
              <Link href="/vendors" className="text-sm text-blue-600 font-medium">Vendors</Link>
              <Link href="/research" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Research</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 font-medium">About</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
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

      {/* TRUST BADGES */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔒", title: "Secure Submission", desc: "Your data is encrypted" },
            { icon: "✅", title: "Manual Review", desc: "Every vendor vetted" },
            { icon: "📈", title: "Free Listing", desc: "No upfront cost" },
            { icon: "⭐", title: "Build Trust", desc: "Showcase your COAs" },
          ].map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-lg flex-shrink-0">{t.icon}</div>
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
          {/* Business Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Peptide Sciences"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Website URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://peptidesciences.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@peptidesciences.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition bg-white"
            >
              <option value="" disabled>
                Select country
              </option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Product Categories <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Select all that apply to your business.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition ${
                    selectedCategories.includes(cat)
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="accent-blue-600"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
              Business Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your business — history, quality standards, shipping, etc."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition resize-y"
            />
          </div>

          {/* Review Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-amber-600 text-lg">📋</span>
              <div>
                <p className="font-semibold text-amber-800">Manual Review Required</p>
                <p className="text-amber-700 mt-1">
                  All vendor listings are manually reviewed by our team to ensure quality and authenticity.
                  You will be notified via email once your listing is approved (typically within 2–3 business days).
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>

        {/* Footer note */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By submitting, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
          For research purposes only.
        </p>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0b1a2e] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">VP</span>
              </div>
              <span className="font-bold text-white">ViralPeps</span>
            </div>
            <p className="text-xs leading-relaxed">The most comprehensive research peptide directory. For laboratory research use only.</p>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Directory</h4>
            <Link href="/compounds" className="block text-xs mb-2 hover:text-white">All Compounds</Link>
            <Link href="/vendors" className="block text-xs mb-2 hover:text-white">Vendors</Link>
            <Link href="/vendors/register" className="block text-xs mb-2 hover:text-white">List Your Business</Link>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Resources</h4>
            <Link href="/research" className="block text-xs mb-2 hover:text-white">Research Library</Link>
            <Link href="/about" className="block text-xs mb-2 hover:text-white">About Us</Link>
            <Link href="/contact" className="block text-xs mb-2 hover:text-white">Contact</Link>
          </div>
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Legal</h4>
            <Link href="/privacy" className="block text-xs mb-2 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block text-xs mb-2 hover:text-white">Terms</Link>
            <Link href="/disclaimer" className="block text-xs mb-2 hover:text-white">Disclaimer</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-gray-800 text-xs text-center">
          For research purposes only. Not for human consumption. © 2026 ViralPeps.
        </div>
      </footer>
    </div>
  );
}
