"use client";

// Owner sidebar — visually identical to the supplier sidebar
// (SellerSidebar.tsx) so the two dashboards read as one product.
// Same: 264px fixed rail, white bg, brand hexagon, supplier-card block,
// uppercase section labels, lucide-style line icons, dark CTA, support/
// back/sign-out footer. Only the nav ITEMS differ (owner sections).

import { type ReactNode } from "react";

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

const NetworkIcon = () => (
  <Ic>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </Ic>
);

const UsersIcon = () => (
  <Ic>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Ic>
);

const BellIcon = () => (
  <Ic>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Ic>
);

const TagIcon = () => (
  <Ic>
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
  </Ic>
);

const ShieldIcon = () => (
  <Ic>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
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

const LogOutIcon = () => (
  <Ic>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
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
    items: [{ id: "network", label: "Network performance", Icon: NetworkIcon }],
  },
  {
    label: "Suppliers",
    items: [
      { id: "sellers", label: "Registered sellers", Icon: UsersIcon },
      { id: "requests", label: "Join requests", Icon: BellIcon },
      { id: "claims", label: "Claim requests", Icon: TagIcon },
    ],
  },
  {
    label: "Moderation",
    items: [{ id: "reviews", label: "Profile review", Icon: ShieldIcon }],
  },
] as const;

export type AdminTab = "network" | "sellers" | "requests" | "reviews" | "claims";

export default function AdminSidebar({
  active,
  onSelect,
  ownerName,
  badges,
}: {
  active: string;
  onSelect: (id: AdminTab) => void;
  ownerName: string;
  badges?: Partial<Record<AdminTab, number>>;
}) {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BrandHexagon />
          <div>
            <div className="font-semibold text-sm leading-tight">Owner Dashboard</div>
            <div className="text-[10px] tracking-widest text-gray-600">VIRALPEPS</div>
          </div>
        </div>
      </div>

      {/* Account card */}
      <div className="px-3 pt-3">
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
            {(ownerName || "O").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-800 truncate">{ownerName || "Owner"}</div>
            <a
              href="/"
              className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-0.5"
            >
              View live site <span aria-hidden>↗</span>
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
            {section.items.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => onSelect(id as AdminTab)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left ${
                  active === id ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon /> {label}
                {badges?.[id as AdminTab] ? (
                  <span className="ml-auto bg-rose-600 text-white text-[10px] font-bold px-2 py-[1px] rounded-full">
                    {badges[id as AdminTab]}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* CTA — mirrors the supplier sidebar's Get Featured button */}
      <div className="px-3 pb-2">
        <a
          href="/contact"
          className="flex items-center justify-center gap-1.5 bg-[#0b1a2e] text-white text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-[#12243c]"
        >
          <span className="text-amber-400"><SparklesIcon /></span>
          Support
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
        <form
          action="/api/owner/logout"
          method="POST"
          onSubmit={async (e) => {
            e.preventDefault();
            await fetch("/api/owner/logout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
        >
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 text-left text-gray-600">
            <LogOutIcon /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
