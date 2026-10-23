import Link from "next/link";
import { CLASS_GROUPS } from "@/data/compound-classes";

type AnyCompound = {
  slug: string;
  name?: string;
  category?: string;
  redirect?: string;
  sources?: { price?: string }[];
};

function minPriceOf(c: AnyCompound): number | null {
  const prices = (c.sources || [])
    .map((s) => parseFloat(String(s.price || "").replace(/[£$€,]/g, "")))
    .filter((p) => !isNaN(p) && p > 0);
  return prices.length ? Math.min(...prices) : null;
}

/**
 * Class-grouped A–Z index of every compound page.
 *
 * Server rendered and always in the HTML (not filtered by the client-side
 * search/tabs) so Googlebot has a crawlable path from /compounds to every
 * compound in two clicks. Each class is an anchored section.
 */
export default function CompoundClassIndex({ compounds }: { compounds: AnyCompound[] }) {
  const live = compounds.filter((c) => !c.redirect);
  const bySlug = new Map(live.map((c) => [c.slug, c]));
  const used = new Set<string>();

  const sections = CLASS_GROUPS.map((g) => {
    const items = g.members
      .filter((m) => bySlug.has(m) && !used.has(m))
      .map((m) => {
        used.add(m);
        const c = bySlug.get(m)!;
        return { slug: m, name: c.name || m, minPrice: minPriceOf(c) };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    return { group: g, items };
  }).filter((s) => s.items.length > 0);

  // Everything not covered by a class group (lab supplies, supplies, etc.)
  const remaining = live
    .filter((c) => !used.has(c.slug))
    .sort((a, b) => (a.name || a.slug).localeCompare(b.name || b.slug));

  const total = sections.reduce((n, s) => n + s.items.length, 0) + remaining.length;

  return (
    <section id="peptide-index" className="bg-blue-50 border-t border-blue-200 scroll-mt-20">
      <div className="max-w-[76rem] mx-auto px-4 py-12 md:py-16">
        <div className="bg-white border border-black rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-0.5 mb-5">
            <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            FULL PEPTIDE INDEX
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            All {total} research peptides, grouped by class
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
            Every compound page on ViralPeps, organised by pharmacological class. Pick a class to
            jump to the peptides inside it, then compare live UK supplier prices side-by-side.
          </p>

          {/* Class quick-nav */}
          <nav aria-label="Peptide classes" className="flex flex-wrap gap-2 mb-8">
            {sections.map((s) => (
              <a
                key={s.group.slug}
                href={`#class-${s.group.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full px-3 py-1.5 transition-colors"
              >
                {s.group.short}
                <span className="text-[10px] font-bold text-blue-500">{s.items.length}</span>
              </a>
            ))}
            {remaining.length > 0 && (
              <a
                href="#class-other"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 transition-colors"
              >
                Other &amp; Supplies
                <span className="text-[10px] font-bold text-gray-500">{remaining.length}</span>
              </a>
            )}
          </nav>

          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.group.slug} id={`class-${s.group.slug}`} className="scroll-mt-20">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 pb-2 mb-3">
                  <h3 className="text-base font-bold text-gray-900">{s.group.label}</h3>
                  <span className="text-[11px] text-gray-500">{s.items.length} compounds</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
                  {s.items.map((i) => (
                    <li key={i.slug} className="flex items-baseline justify-between gap-2">
                      <Link
                        href={`/compounds/${i.slug}`}
                        className="text-sm text-gray-700 hover:text-blue-600 hover:underline underline-offset-2 transition-colors"
                      >
                        {i.name}
                      </Link>
                      {i.minPrice !== null && (
                        <span className="text-[11px] font-semibold text-blue-600 whitespace-nowrap">
                          £{i.minPrice.toFixed(2)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {remaining.length > 0 && (
              <div id="class-other" className="scroll-mt-20">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 pb-2 mb-3">
                  <h3 className="text-base font-bold text-gray-900">Other &amp; Lab Supplies</h3>
                  <span className="text-[11px] text-gray-500">{remaining.length} compounds</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5">
                  {remaining.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/compounds/${c.slug}`}
                        className="text-sm text-gray-700 hover:text-blue-600 hover:underline underline-offset-2 transition-colors"
                      >
                        {c.name || c.slug}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
