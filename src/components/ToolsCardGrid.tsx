"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  {
    href: "/tools",
    label: "Quick Solve",
    desc: "One answer, any question. Tell us what you need and we'll ask for the right info.",
  },
  {
    href: "/tools/dosage-calculator",
    label: "Dosage Calculator",
    desc: "Reconstitute & calculate syringe units. Vial strength, water, and target dose.",
  },
  {
    href: "/tools/cycle-calculator",
    label: "Cycle Calculator",
    desc: "Plan a cycle & find the cheapest supplier combo for the whole duration.",
  },
];

export default function ToolsCardGrid({ title, subtitle }: { title?: string; subtitle?: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* Title section */}
      <div className="max-w-[76rem] mx-auto px-4 pt-10 pb-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {title || (<>Peptide Tools &{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Calculators
            </span></>)}
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          {subtitle || "Free tools for peptide research — reconstitution, dosage, and cycle planning."}
        </p>
      </div>

      {/* Tool cards */}
      <div className="max-w-[76rem] mx-auto px-4 grid md:grid-cols-3 gap-4">
        {tools.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 ${
                active
                  ? "bg-white text-gray-900 shadow-xl shadow-black/20 ring-2 ring-emerald-400"
                  : "bg-white/[0.07] text-white border border-white/10 hover:bg-white hover:text-gray-900 hover:shadow-xl hover:shadow-black/20"
              }`}
            >
              <h3 className={`text-lg font-bold mb-1 ${active ? "" : "group-hover:text-gray-900"}`}>
                {active && (
                  <span className="inline-flex items-center gap-1.5 mr-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-600 rounded-full text-xs font-bold">
                    Active
                  </span>
                )}
                {t.label}
              </h3>
              <p className={`text-sm ${active ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"}`}>
                {t.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
