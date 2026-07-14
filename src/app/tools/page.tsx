"use client";

import { useState } from "react";
import ToolsCardGrid from "@/components/ToolsCardGrid";

const questions = [
  { id: "units", label: "How many units to draw", sub: "I know my research dose but not the units" },
  { id: "dose", label: "Find my research dose", sub: "I draw X units but don't know the mg" },
  { id: "water", label: "How much water to add", sub: "I want a certain # of units per dose" },
];

export default function QuickSolvePage() {
  const [question, setQuestion] = useState("units");
  const [form, setForm] = useState({ doseMcg: 0, peptideMg: 0, waterMl: 0, units: 0 });
  const [result, setResult] = useState<null | string>(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sendResult = async () => {
    if (!email || !result) return;
    setEmailSent("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, result }),
      });
      const data = await res.json();
      setEmailSent(data.ok || res.status === 200 ? "sent" : "error");
    } catch {
      setEmailSent("error");
    }
  };

  const solve = () => {
    if (question === "units" && form.peptideMg && form.waterMl && form.doseMcg) {
      const totalMcg = form.peptideMg * 1000;
      const mcgPerMl = totalMcg / form.waterMl;
      const mcgPerUnit = mcgPerMl / 100;
      const units = form.doseMcg / mcgPerUnit;
      setResult(`Draw ${Math.round(units * 10) / 10} units on an insulin syringe (${Math.round(mcgPerUnit * 10) / 10} mcg per unit)`);
    } else if (question === "dose" && form.peptideMg && form.waterMl && form.units) {
      const totalMcg = form.peptideMg * 1000;
      const mcgPerMl = totalMcg / form.waterMl;
      const mcgPerUnit = mcgPerMl / 100;
      const dose = form.units * mcgPerUnit;
      setResult(`Your dose is approximately ${Math.round(dose * 10) / 10} mcg (${Math.round(mcgPerUnit * 10) / 10} mcg per unit)`);
    } else if (question === "water" && form.peptideMg && form.units && form.doseMcg) {
      const totalMcg = form.peptideMg * 1000;
      const waterMl = (form.units / 100) * (totalMcg / form.doseMcg);
      if (waterMl > 0 && isFinite(waterMl)) {
        setResult(`Add approximately ${Math.round(waterMl * 10) / 10} mL of BAC water`);
      } else {
        setResult("Check your inputs — the numbers don't add up.");
      }
    } else {
      setResult(null);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#0a1628]">
        <ToolsCardGrid />

        <div className="max-w-[76rem] mx-auto px-4 mt-6">
          <div className="bg-amber-50/10 border border-amber-200/20 rounded-lg px-4 py-2.5 text-center">
            <p className="text-xs text-amber-200/80">
              All content is for educational and research reference purposes only. It does not constitute medical advice, diagnosis, or treatment recommendations. All peptides are for in-vitro research use only.
            </p>
          </div>
        </div>

        {/* Quick Solve form */}
        <div className="max-w-[76rem] mx-auto px-4 mt-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">What do you need to figure out?</h2>
            <p className="text-sm text-gray-500 mb-6">Choose your scenario and we'll ask for exactly what we need.</p>

            {/* Question selector */}
            <div className="grid md:grid-cols-3 gap-3 mb-8">
              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => { setQuestion(q.id); setResult(null); }}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    question === q.id
                      ? "border-indigo-500 bg-indigo-50 shadow-sm"
                      : "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-sm font-bold text-gray-900">{q.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{q.sub}</div>
                </button>
              ))}
            </div>

            {/* Dynamic form fields */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {question !== "dose" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Target dose (mcg)</label>
                  <input
                    type="number"
                    value={form.doseMcg || ""}
                    onChange={(e) => setForm({ ...form, doseMcg: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 bg-white"
                    placeholder="e.g. 500"
                  />
                </div>
              )}
              {question !== "water" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Peptide in vial (mg)</label>
                  <input
                    type="number"
                    value={form.peptideMg || ""}
                    onChange={(e) => setForm({ ...form, peptideMg: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 bg-white"
                    placeholder="e.g. 5"
                  />
                </div>
              )}
              {question !== "dose" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">BAC water (mL)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.waterMl || ""}
                    onChange={(e) => setForm({ ...form, waterMl: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 bg-white"
                    placeholder="e.g. 1"
                  />
                </div>
              )}
              {question === "dose" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Units you draw</label>
                  <input
                    type="number"
                    value={form.units || ""}
                    onChange={(e) => setForm({ ...form, units: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 bg-white"
                    placeholder="e.g. 20"
                  />
                </div>
              )}
              {question === "water" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Desired units per dose</label>
                  <input
                    type="number"
                    value={form.units || ""}
                    onChange={(e) => setForm({ ...form, units: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 bg-white"
                    placeholder="e.g. 10"
                  />
                </div>
              )}
            </div>

            <button
              onClick={solve}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
            >
              Solve
            </button>

            {result && (
              <div className="mt-4 space-y-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm">
                  <p className="text-emerald-900 font-semibold">{result}</p>
                </div>
                {emailSent === "sent" ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
                    <p className="text-blue-900 font-semibold">
                      ✅ Result sent — check your inbox! You're also subscribed to our weekly newsletter.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 outline-none focus:border-indigo-500 bg-white"
                    />
                    <button
                      onClick={sendResult}
                      disabled={!email || emailSent === "sending"}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-4 py-2.5 rounded-lg text-sm transition"
                    >
                      {emailSent === "sending" ? "Sending..." : "Email me results"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Syringe reference */}
        <div className="max-w-[76rem] mx-auto px-4 mt-6 pb-6">
          <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white/80 mb-3">Syringe Reference</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { size: "3.0 mL", units: "300 units" },
                { size: "1.0 mL", units: "100 units" },
                { size: "0.5 mL", units: "50 units" },
                { size: "0.3 mL", units: "30 units" },
              ].map((s) => (
                <div key={s.size} className="bg-white/10 rounded-lg px-3 py-2 text-center">
                  <div className="text-white font-bold text-xs">{s.size}</div>
                  <div className="text-gray-400 text-xs">{s.units}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">Based on a standard insulin syringe. For in-vitro research use only.</p>
          </div>
        </div>
      </div>
    </>
  );
}
