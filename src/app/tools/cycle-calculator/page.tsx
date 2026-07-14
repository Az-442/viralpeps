"use client";

import { useState } from "react";
import ToolsCardGrid from "@/components/ToolsCardGrid";

const frequencies = [
  { label: "Daily", mult: 7 },
  { label: "Every other day", mult: 3.5 },
  { label: "Twice weekly", mult: 2 },
  { label: "Weekly", mult: 1 },
  { label: "Every 2 weeks", mult: 0.5 },
  { label: "Twice daily", mult: 14 },
];

export default function CycleCalculatorPage() {
  const [peptide, setPeptide] = useState("BPC-157");
  const [doseMcg, setDoseMcg] = useState(500);
  const [freq, setFreq] = useState(frequencies[0]);
  const [weeks, setWeeks] = useState(4);
  const [calculated, setCalculated] = useState(false);

  const totalDoses = Math.round(weeks * freq.mult);
  const totalMg = (doseMcg * totalDoses) / 1000;

  const calc = () => setCalculated(true);

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

          {/* Form */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Plan your cycle</h2>
            <p className="text-sm text-gray-500 mb-6">
              Work out how much peptide you need for the full duration.
            </p>

            {/* Example link */}
            <button
              onClick={() => {
                setPeptide("BPC-157");
                setDoseMcg(500);
                setFreq(frequencies[0]);
                setWeeks(4);
                setCalculated(true);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 underline mb-6 block"
            >
              Try an example: BPC-157, 500mcg daily for 4 weeks
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Peptide */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Peptide</label>
                <select
                  value={peptide}
                  onChange={(e) => { setPeptide(e.target.value); setCalculated(false); }}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 bg-white"
                >
                  {[
                    "BPC-157", "TB-500", "GHK-Cu", "Tirzepatide", "Semaglutide",
                    "Retatrutide", "CJC-1295", "CJC-1295 (no DAC)", "Ipamorelin",
                    "Tesamorelin", "Sermorelin", "MOTS-c", "NAD+", "AOD-9604",
                    "GLOW Blend", "Epitalon", "Thymalin", "KPV", "LL-37", "SS-31",
                  ].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Dosage */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">
                  Dosage per administration (mcg)
                </label>
                <input
                  type="number"
                  value={doseMcg || ""}
                  onChange={(e) => { setDoseMcg(parseFloat(e.target.value) || 0); setCalculated(false); }}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 bg-white"
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {frequencies.map((f) => (
                    <button
                      key={f.label}
                      onClick={() => { setFreq(f); setCalculated(false); }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        freq.label === f.label
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Duration (weeks)</label>
                <div className="flex flex-wrap gap-2">
                  {[2, 4, 6, 8, 10, 12, 16, 20].map((w) => (
                    <button
                      key={w}
                      onClick={() => { setWeeks(w); setCalculated(false); }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        weeks === w
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {w} weeks
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={calc}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
            >
              Calculate
            </button>
          </div>

          {/* Results */}
          {calculated && (
            <div className="mt-6 bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-600 rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-white/70 text-xs mb-1">Total doses</p>
                  <p className="text-3xl font-bold text-white">{totalDoses}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Total peptide needed</p>
                  <p className="text-3xl font-bold text-white">{totalMg >= 1 ? `${Math.round(totalMg * 10) / 10} mg` : `${Math.round(totalMg * 1000)} mcg`}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Vials needed (5mg)</p>
                  <p className="text-3xl font-bold text-white">{Math.ceil(totalMg / 5)}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 text-center">
                <p className="text-white/60 text-xs">
                  For {peptide} &middot; {doseMcg}mcg {freq.label.toLowerCase()} &middot; {weeks} weeks
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
