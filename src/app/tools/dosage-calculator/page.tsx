"use client";

import { useState } from "react";
import ToolsCardGrid from "@/components/ToolsCardGrid";

const doses = [100, 250, 500, 1000, 2000, 2500, 5000, 7500, 10000, 12500, 15000];
const strengths = [1, 5, 10, 15, 20, 50];
const waters = [0.5, 1, 1.5, 2, 2.5, 3];

export default function DosageCalculatorPage() {
  const [doseMcg, setDoseMcg] = useState<number>(500);
  const [strengthMg, setStrengthMg] = useState<number>(5);
  const [waterMl, setWaterMl] = useState<number>(1);

  const totalMcg = strengthMg * 1000;
  const mcgPerMl = totalMcg / waterMl;
  const mcgPerUnit = mcgPerMl / 100;
  const unitsForDose = doseMcg / mcgPerUnit;
  const valid = doseMcg > 0 && strengthMg > 0 && waterMl > 0;

  return (
    <>
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0a1628]">
        <ToolsCardGrid />

        <div className="max-w-[76rem] mx-auto px-4 pb-6">
          {/* Disclaimer strip */}
          <div className="bg-amber-50/10 border border-amber-200/20 rounded-lg px-4 py-2.5 text-center mt-6">
            <p className="text-xs text-amber-200/80">
              All content is for educational and research reference purposes only. It does not constitute medical advice, diagnosis, or treatment recommendations. All peptides are for in-vitro research use only.
            </p>
          </div>

          {/* Result hero */}
          {valid && (
            <div className="mt-6 bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-600 rounded-2xl p-8 text-center shadow-2xl">
              <p className="text-white/80 text-sm mb-1">Draw exactly</p>
              <p className="text-5xl md:text-6xl font-bold text-white">
                {Math.round(unitsForDose * 10) / 10}
                <span className="text-2xl md:text-3xl text-white/70 ml-2">units</span>
              </p>
              <p className="text-white/60 text-xs mt-2">
                {Math.round(mcgPerUnit * 10) / 10} mcg per unit &middot; {strengthMg}mg vial reconstituted with {waterMl}mL
              </p>
            </div>
          )}

          {!valid && (
            <div className="mt-6 bg-white/[0.05] border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-gray-400 text-sm">Pick dose, strength &amp; water above</p>
              <p className="text-gray-500 text-xs mt-1">We'll show your exact syringe units in real time.</p>
            </div>
          )}
        </div>

        {/* Step 1 - Dose */}
        <div className="max-w-[76rem] mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">STEP 1</span>
              <h3 className="text-sm font-bold text-gray-900">Dose of peptide</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {doses.map((d) => (
                <button
                  key={d}
                  onClick={() => setDoseMcg(d)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    doseMcg === d
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {d >= 1000 ? `${d / 1000}mg` : `${d}mcg`}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 - Strength */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">STEP 2</span>
              <h3 className="text-sm font-bold text-gray-900">Vial strength</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {strengths.map((s) => (
                <button
                  key={s}
                  onClick={() => setStrengthMg(s)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    strengthMg === s
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {s}mg
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 - Water */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">STEP 3</span>
              <h3 className="text-sm font-bold text-gray-900">Water added</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {waters.map((w) => (
                <button
                  key={w}
                  onClick={() => setWaterMl(w)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    waterMl === w
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {w}mL
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-[76rem] mx-auto px-4 mt-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">How It Works</h3>
            <p className="text-sm text-gray-500 mb-6">Three inputs, one answer.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", label: "Dose", desc: "Select the dose of peptide you want to inject (micrograms, or mg for larger doses).", color: "bg-indigo-100 text-indigo-700" },
                { step: "2", label: "Strength", desc: "Enter the total amount of peptide in your vial (in milligrams).", color: "bg-blue-100 text-blue-700" },
                { step: "3", label: "Water", desc: "How much bacteriostatic water you added to reconstitute (in mL).", color: "bg-emerald-100 text-emerald-700" },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className={`${item.color} w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0`}>
                    {item.step}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{item.label}</div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-6">Based on a standard 100-unit insulin syringe. For in-vitro research use only.</p>
          </div>
        </div>
      </div>
    </>
  );
}
