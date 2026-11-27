"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared date-range dropdown used by BOTH the owner dashboard and the
 * supplier portal so the two portals behave identically.
 *
 * Options: Last 7 days / Last 30 days / Last 90 days / All time / Custom range.
 * Custom range = two native date inputs + Apply; the value is reported back as
 * absolute epoch milliseconds so callers never have to reason about presets.
 *
 * `variant` only switches the chrome (dark = on navy hero, light = on white).
 */

export type DateRange = {
  /** Reported label, e.g. "Last 30 days" or "12/11/2026 – 27/11/2026" */
  label: string;
  /** Epoch ms inclusive start; 0 = unbounded */
  from: number;
  /** Epoch ms inclusive end; 0 = unbounded (now) */
  to: number;
  /** Preset key when a preset is active, otherwise "custom" */
  key: "7" | "30" | "90" | "all" | "custom";
};

export function presetRange(key: "7" | "30" | "90" | "all"): DateRange {
  if (key === "all") return { label: "All time", from: 0, to: 0, key: "all" };
  const days = Number(key);
  return {
    label: `Last ${days} days`,
    from: Date.now() - days * 24 * 3600 * 1000,
    to: 0,
    key,
  };
}

export const DEFAULT_RANGE: DateRange = presetRange("30");

const PRESETS = [
  { key: "7", label: "Last 7 days" },
  { key: "30", label: "Last 30 days" },
  { key: "90", label: "Last 90 days" },
  { key: "all", label: "All time" },
] as const;

function toInput(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function fmtShort(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export default function DateRangeFilter({
  value,
  onChange,
  variant = "light",
}: {
  value: DateRange;
  onChange: (r: DateRange) => void;
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(() => {
    const base = value.from ? new Date(value.from) : new Date(Date.now() - 30 * 864e5);
    return toInput(base);
  });
  const [to, setTo] = useState(() => toInput(value.to ? new Date(value.to) : new Date()));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function applyCustom() {
    const f = new Date(`${from}T00:00:00`);
    const t = new Date(`${to}T23:59:59`);
    if (isNaN(f.getTime()) || isNaN(t.getTime())) return;
    if (f.getTime() > t.getTime()) return;
    onChange({
      label: `${fmtShort(f)} – ${fmtShort(t)}`,
      from: f.getTime(),
      to: t.getTime(),
      key: "custom",
    });
    setOpen(false);
  }

  const trigger =
    variant === "dark"
      ? "bg-white/10 border border-white/15 text-white hover:bg-white/20"
      : "bg-white border border-gray-200 text-gray-900 hover:bg-gray-50";

  const panel =
    variant === "dark"
      ? "bg-[#0f1b3d] border-white/15 text-white"
      : "bg-white border-gray-200 text-gray-900";

  const itemIdle =
    variant === "dark" ? "text-white/80 hover:bg-white/10" : "text-gray-700 hover:bg-gray-50";

  const activeItem = variant === "dark" ? "bg-white/15 text-white" : "bg-blue-50 text-blue-700";

  const inputCls =
    variant === "dark"
      ? "bg-white/10 border border-white/15 rounded-lg px-2 py-1.5 text-white text-xs [color-scheme:dark]"
      : "border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-900";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium ${trigger}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 shrink-0"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span>{value.label}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-3.5 h-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute right-0 z-40 mt-2 w-64 rounded-xl border shadow-lg p-1.5 ${panel}`}
          role="menu"
        >
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              role="menuitem"
              onClick={() => {
                onChange(presetRange(p.key));
                setOpen(false);
              }}
              className={`w-full text-left text-sm rounded-lg px-3 py-2 ${
                value.key === p.key ? activeItem : itemIdle
              }`}
            >
              {p.label}
            </button>
          ))}

          <div
            className={`mt-1 border-t pt-2 px-2 pb-1 ${
              variant === "dark" ? "border-white/15" : "border-gray-200"
            }`}
          >
            <div className="text-xs font-semibold mb-2">Custom range</div>
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={from}
                max={to}
                onChange={(e) => setFrom(e.target.value)}
                className={inputCls}
                aria-label="From date"
              />
              <span className="text-xs opacity-60">to</span>
              <input
                type="date"
                value={to}
                min={from}
                onChange={(e) => setTo(e.target.value)}
                className={inputCls}
                aria-label="To date"
              />
            </div>
            <button
              type="button"
              onClick={applyCustom}
              className="mt-2 w-full rounded-lg bg-blue-600 text-white text-sm font-medium py-1.5 hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
