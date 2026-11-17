"use client";

import { type ReactNode } from "react";

// ── Icon set (Lucide-style line icons, no emoji) ────────────────────────
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-[18px] h-[18px] shrink-0",
  "aria-hidden": true,
};

function Ic({ children }: { children: ReactNode }) {
  return <svg {...iconProps}>{children}</svg>;
}

const DashboardIcon = () => (
  <Ic>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </Ic>
);

const AnalyticsIcon = () => (
  <Ic>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </Ic>
);

const SearchIcon = () => (
  <Ic>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Ic>
);

const PackageIcon = () => (
  <Ic>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </Ic>
);

const BadgeIcon = () => (
  <Ic>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </Ic>
);

export const FileTextIcon = () => (
  <Ic>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </Ic>
);

const NetworkIcon = () => (
  <Ic>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </Ic>
);

const ShieldIcon = () => (
  <Ic>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Ic>
);

const ReceiptIcon = () => (
  <Ic>
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 17.5v-11" />
  </Ic>
);

const ScaleIcon = () => (
  <Ic>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </Ic>
);

const LifeBuoyIcon = () => (
  <Ic>
    <circle cx="12" cy="12" r="10" />
    <path d="m4.93 4.93 4.24 4.24" />
    <path d="m14.83 9.17 4.24-4.24" />
    <path d="m14.83 14.83 4.24 4.24" />
    <path d="m9.17 14.83-4.24 4.24" />
    <circle cx="12" cy="12" r="4" />
  </Ic>
);

const ArrowLeftIcon = () => (
  <Ic>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </Ic>
);

const SparklesIcon = () => (
  <Ic>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </Ic>
);

function BrandHexagon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-blue-600 shrink-0"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="M12 7.5v9" />
      <path d="m8.5 10 7 4" />
      <path d="m15.5 10-7 4" />
    </svg>
  );
}

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", Icon: DashboardIcon },
      { id: "analytics", label: "Analytics", Icon: AnalyticsIcon },
      { id: "ranking", label: "Search Ranking", Icon: SearchIcon },
    ],
  },
  {
    label: "Your listing",
    items: [
      { id: "products", label: "Products", Icon: PackageIcon },
      { id: "badge", label: "Website Badge", Icon: BadgeIcon },
      { id: "price-feed", label: "Price Feed", Icon: FileTextIcon },
    ],
  },
  {
    label: "Growth",
    items: [{ id: "affiliate", label: "Affiliate Network", Icon: NetworkIcon }],
  },
  {
    label: "Account",
    items: [
      { id: "profile", label: "Profile & TrustScore", Icon: ShieldIcon },
      { id: "invoices", label: "Invoices", Icon: ReceiptIcon },
      { id: "documents", label: "Documents", Icon: FileTextIcon },
      { id: "terms", label: "Terms & Conditions", Icon: ScaleIcon },
    ],
  },
] as const;

export default function SellerSidebar({
  name,
  slug,
  active,
  onSelect,
}: {
  name: string;
  slug: string;
  active: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BrandHexagon />
          <div>
            <div className="font-semibold text-sm leading-tight">Supplier Portal</div>
            <div className="text-[10px] tracking-widest text-gray-600">VIRALPEPS</div>
          </div>
        </div>
      </div>

      {/* Supplier selection */}
      <div className="px-3 pt-3">
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
            {name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-800 truncate">{name}</div>
            <a
              href={`/vendors/${slug}`}
              className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5"
            >
              View public listing <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 text-sm">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="mt-2 first:mt-0">
            <div className="px-3 pb-1 text-[10px] font-semibold tracking-widest text-gray-600 uppercase">
              {section.label}
            </div>
            {section.items.map(({ id, label, Icon }) =>
              onSelect ? (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left ${
                    active === id ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon /> {label}
                </button>
              ) : (
                <a
                  key={id}
                  href={`/sellers/${slug}`}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left ${
                    active === id ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon /> {label}
                </a>
              )
            )}
          </div>
        ))}
      </nav>

      {/* Get Featured CTA */}
      <div className="px-3 pb-2">
        <a
          href="/contact"
          className="flex items-center justify-center gap-1.5 bg-[#0b1a2e] text-white text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-[#12243c]"
        >
          <span className="text-amber-400"><SparklesIcon /></span>
          Get Featured
        </a>
      </div>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-gray-100 text-xs text-gray-700 space-y-1">
        <a href="/contact" className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 text-gray-700">
          <LifeBuoyIcon /> Support
        </a>
        <a href="/" className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 text-gray-700">
          <ArrowLeftIcon /> Back to Site
        </a>
        <form action="/api/sellers/logout" method="POST">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 text-left text-gray-600">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
