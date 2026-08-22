"use client";

// TrustScore icon — a shield that doubles as a score gauge (0-100), with a checkmark.
// Designed for the homepage hero banner and any trust-related placement.
export default function TrustScoreIcon({
  className = "w-8 h-8",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield body with brand gradient */}
      <defs>
        <linearGradient id="tsGrad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#2563eb" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path
        d="M24 2l18 7v13c0 11-8 20-18 24C14 42 6 33 6 22V9l18-7z"
        fill="url(#tsGrad)"
      />
      {/* Inner shield highlight */}
      <path
        d="M24 6.5L38 12v10c0 8.5-6 15.5-14 19-8-3.5-14-10.5-14-19V12l14-5.5z"
        fill="white"
        fillOpacity="0.08"
      />
      {/* Score gauge arc */}
      <path
        d="M14 26a10 10 0 0116-6"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Score needle */}
      <line
        x1="24"
        y1="24"
        x2="30"
        y2="19"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Checkmark */}
      <path
        d="M19 24l3.5 3.5L29 21"
        stroke="#4ade80"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
