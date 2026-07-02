"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/tools",          label: "Quick Solve", desc: "One answer, any question." },
  { href: "/tools/dosage-calculator", label: "Dosage",     desc: "Reconstitute & calculate syringe units." },
  { href: "/tools/cycle-calculator",  label: "Cycle",      desc: "Plan a cycle & find the cheapest supplier combo." },
];

export default function ToolsTabBar() {
  const pathname = usePathname();

  return (
    <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0a1628] border-b border-white/5">
      {/* Title section */}
      <div className="max-w-[76rem] mx-auto px-4 pt-10 pb-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Peptide Tools &{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Calculators
          </span>
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Free tools for peptide research — reconstitution, dosage, and cycle planning.
        </p>
      </div>

      {/* Tab bar */}
      <div className="max-w-[76rem] mx-auto px-4 pb-2 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-5 py-3 text-sm font-bold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                  active
                    ? "bg-white text-indigo-900 border-emerald-500 shadow-sm"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-transparent"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
