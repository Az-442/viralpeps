"use client";

import Link from "next/link";
import { useState } from "react";

export default function HeaderNav({ current }: { current?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const links = [
    { href: "/compounds", label: "Peptides" },
    { href: "/vendors", label: "Suppliers" },
    { href: "/research", label: "Research" },
    { href: "/guide", label: "Guide" },
  ];

  const rightLinks = [
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const toolLinks = [
    { href: "/tools", label: "Peptide Tools" },
    { href: "/tools#reconstitution", label: "Reconstitution Calculator" },
    { href: "/tools#converter", label: "Dosage Converter" },
    { href: "/tools#half-life", label: "Half-Life Reference" },
  ];

  return (
    <nav className="bg-white border-b border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
              <path d="M9 20V12l7 4-7 4z" fill="white" fillOpacity="0.3" />
              <path d="M10.5 18.5V13.5l5 2.5-5 2.5z" fill="white" />
              <circle cx="22" cy="11" r="3.5" fill="white" fillOpacity="0.3" />
              <circle cx="22" cy="11" r="2" fill="white" />
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#2563eb" />
                  <stop offset="0.5" stopColor="#6366f1" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-bold text-lg tracking-tight text-gray-900">VIRALPEPS</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  current === l.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="relative group">
              <button
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1 ${
                  current === "/tools"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Tools
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="absolute right-0 pt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="bg-white border border-black rounded-xl shadow-lg py-2">
                  {toolLinks.map((tl) => (
                    <Link
                      key={tl.href}
                      href={tl.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {tl.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {rightLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  current === l.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-black bg-white pb-3">
            <div className="max-w-7xl mx-auto px-4 pt-3 space-y-1">
              {/* Main links */}
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                >
                  {l.label}
                </Link>
              ))}
              {/* Tools dropdown in mobile */}
              <div>
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                >
                  Tools
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {toolsOpen && (
                  <div className="ml-4 space-y-1 pb-1">
                    {toolLinks.map((tl) => (
                      <Link
                        key={tl.href}
                        href={tl.href}
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        {tl.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Right links */}
              {rightLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
