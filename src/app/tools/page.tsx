'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ToolsPage() {
  const [recon, setRecon] = useState({ peptideMg: 0, waterMl: 0, doseMcg: 0 });
  const [reconResult, setReconResult] = useState<null | { unitsPerDose: number; mcgPerUnit: number }>(null);

  const [convert, setConvert] = useState({ value: 0, from: 'mcg', to: 'mg' });
  const [convertResult, setConvertResult] = useState<null | number>(null);

  const [half, setHalf] = useState({ substance: 'Tirzepatide', customHalfLife: '' });
  const [halfResult, setHalfResult] = useState<null | string>(null);

  const halfLives: Record<string, string> = {
    'Tirzepatide': '5 days',
    'Semaglutide': '7 days',
    'Retatrutide': '6 days',
    'BPC-157': '4 hours',
    'TB-500': '2-4 days',
    'CJC-1295': '6-8 days',
    'CJC-1295 (no DAC)': '30 minutes',
    'IGF-1 LR3': '20-30 hours',
    'AOD-9604': '30 minutes',
    'Melanotan II': '30 minutes',
    'GHK-Cu': '20 minutes',
    'Semax': '15-30 minutes',
    'Selank': '15-30 minutes',
    'Tesamorelin': '30-60 minutes',
    'Sermorelin': '12-20 minutes',
    'Epitalon': '10 minutes',
    'Custom': '—',
  };

  const calcRecon = () => {
    if (!recon.peptideMg || !recon.waterMl || !recon.doseMcg) return;
    const totalMcg = recon.peptideMg * 1000;
    const mcgPerMl = totalMcg / recon.waterMl;
    const mcgPerUnit = mcgPerMl / 100;
    const unitsForDose = recon.doseMcg / mcgPerUnit;
    setReconResult({ unitsPerDose: Math.round(unitsForDose * 10) / 10, mcgPerUnit: Math.round(mcgPerUnit * 10) / 10 });
  };

  const calcConvert = () => {
    if (!convert.value) return;
    const factors: Record<string, number> = { mcg: 1, mg: 1000, g: 1000000 };
    const result = (convert.value * factors[convert.from]) / factors[convert.to];
    setConvertResult(result);
  };

  const calcHalfLife = () => {
    setHalfResult(halfLives[half.substance] || half.customHalfLife || 'Unknown');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect width="28" height="28" rx="7" fill="url(#tLg)" /><path d="M7 17.5v-7l6 3.5-6 3.5z" fill="white" fillOpacity="0.3" /><path d="M8.5 16v-4l4.5 2-4.5 2z" fill="white" /><defs><linearGradient id="tLg" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#2563eb" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs></svg>
              <span className="font-bold text-lg text-gray-900">ViralPeps</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/compounds" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Compounds</Link>
              <Link href="/vendors" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Vendors</Link>
              <Link href="/tools" className="text-sm text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Tools</Link>
              <Link href="/research" className="text-sm text-gray-600 hover:text-blue-600 font-medium">Research</Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 font-medium">About</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Peptide Tools & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Calculators</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">Free calculators for peptide research — reconstitution, dosage conversion, and half-life reference.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">

        {/* RECONSTITUTION */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">🧪 Reconstitution Calculator</h2>
          <p className="text-xs text-gray-500 mb-5">Enter values then press Calculate.</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-900 font-semibold block mb-1">Peptide amount (mg)</label>
              <input type="number" value={recon.peptideMg} onChange={e => setRecon({...recon, peptideMg: parseFloat(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-900 font-semibold block mb-1">BAC water (ml)</label>
              <input type="number" value={recon.waterMl} onChange={e => setRecon({...recon, waterMl: parseFloat(e.target.value) || 0})} step="0.1" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-900 font-semibold block mb-1">Target dose (mcg)</label>
              <input type="number" value={recon.doseMcg} onChange={e => setRecon({...recon, doseMcg: parseFloat(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500" />
            </div>
            <button onClick={calcRecon} className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Calculate</button>
            {reconResult && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm space-y-1">
                <p className="text-gray-900 font-medium">{reconResult.unitsPerDose} units on an insulin syringe</p>
                <p className="text-gray-700 text-xs">{reconResult.mcgPerUnit} mcg per unit</p>
              </div>
            )}
          </div>
        </div>

        {/* DOSAGE CONVERTER */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">⚖️ Dosage Converter</h2>
          <p className="text-xs text-gray-500 mb-5">Convert between mcg, mg, and grams.</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-900 font-semibold block mb-1">Value</label>
              <input type="number" value={convert.value} onChange={e => setConvert({...convert, value: parseFloat(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-900 font-semibold block mb-1">From</label>
                <select value={convert.from} onChange={e => setConvert({...convert, from: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 bg-white">
                  <option value="mcg">mcg (µg)</option>
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-900 font-semibold block mb-1">To</label>
                <select value={convert.to} onChange={e => setConvert({...convert, to: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 bg-white">
                  <option value="mcg">mcg (µg)</option>
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                </select>
              </div>
            </div>
            <button onClick={calcConvert} className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Convert</button>
            {convertResult !== null && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
                <p className="text-gray-900 font-medium">{convert.value} {convert.from} = <strong>{convertResult.toLocaleString()}</strong> {convert.to}</p>
              </div>
            )}
          </div>
        </div>

        {/* HALF-LIFE */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">⏱️ Half-Life Reference</h2>
          <p className="text-xs text-gray-500 mb-5">Select a peptide, then press Look Up.</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-900 font-semibold block mb-1">Peptide</label>
              <select value={half.substance} onChange={e => setHalf({...half, substance: e.target.value, customHalfLife: ''})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500 bg-white">
                {Object.keys(halfLives).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            {half.substance === 'Custom' && (
              <div>
                <label className="text-xs text-gray-900 font-semibold block mb-1">Enter half-life</label>
                <input type="text" value={half.customHalfLife} onChange={e => setHalf({...half, customHalfLife: e.target.value})} placeholder="e.g. 2 hours" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:border-blue-500" />
              </div>
            )}
            <button onClick={calcHalfLife} className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">Look Up</button>
            {halfResult && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm">
                <p className="text-gray-900 font-medium">{half.substance}: <strong>{halfResult}</strong></p>
              </div>
            )}
          </div>
        </div>

      </div>

      <footer className="bg-[#0b1a2e] text-gray-400 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill="url(#fL2)" /><path d="M7 15V9l5 3-5 3z" fill="white" fillOpacity="0.4" /><path d="M8 14V10l4 2-4 2z" fill="white" /><defs><linearGradient id="fL2" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#2563eb" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs></svg>
              <span className="font-bold text-white">ViralPeps</span>
            </div>
            <p className="text-xs leading-relaxed">For laboratory research use only. © 2026 ViralPeps.</p>
          </div>
          <div><h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Directory</h4>
            <Link href="/compounds" className="block text-xs mb-2 hover:text-white">All Compounds</Link>
            <Link href="/vendors" className="block text-xs mb-2 hover:text-white">Vendors</Link>
            <Link href="/vendors/register" className="block text-xs mb-2 hover:text-white">List Your Business</Link>
          </div>
          <div><h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Resources</h4>
            <Link href="/tools" className="block text-xs mb-2 hover:text-white">Peptide Tools</Link>
            <Link href="/research" className="block text-xs mb-2 hover:text-white">Research Library</Link>
          </div>
          <div><h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Legal</h4>
            <Link href="/privacy" className="block text-xs mb-2 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block text-xs mb-2 hover:text-white">Terms</Link>
            <Link href="/disclaimer" className="block text-xs mb-2 hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
