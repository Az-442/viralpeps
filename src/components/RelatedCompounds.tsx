import Link from "next/link";
import { ClassGroup, RelatedItem } from "@/data/compound-classes";

interface Props {
  currentName: string;
  group: ClassGroup | null;
  related: RelatedItem[];
}

/**
 * "Related peptides" block — server rendered so the links are in the initial
 * HTML (crawlable). Styled to match the existing navy/blue card language.
 */
export default function RelatedCompounds({ currentName, group, related }: Props) {
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-peptides" className="bg-blue-50 border-t border-blue-100 py-12">
      <div className="max-w-[76rem] mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <h2 id="related-peptides" className="text-2xl font-bold text-gray-900">
              Related peptides
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {group
                ? `Other ${group.label.toLowerCase()} compared on ViralPeps`
                : `Other research peptides compared on ViralPeps`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {group && (
              <Link
                href={`/compounds#class-${group.slug}`}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors"
              >
                All {group.short} &rarr;
              </Link>
            )}
            <Link
              href="/compounds"
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors"
            >
              Browse all peptides
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/compounds/${r.slug}`}
                className="group flex h-full flex-col justify-between bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm rounded-xl p-4 transition-all"
                title={`Compare ${r.name} prices in the UK`}
              >
                <span className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[#162d50] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {r.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {r.name}
                    </span>
                    <span className="block text-[11px] text-gray-500 mt-0.5">Price comparison</span>
                  </span>
                </span>
                <span className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
                  <span className="text-xs font-semibold text-blue-600">
                    {r.minPrice !== null ? `FROM £${r.minPrice.toFixed(2)}` : "Compare prices"}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all text-sm font-bold"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-[11px] text-gray-400 mt-4">
          Related to {currentName}. For in-vitro research use only.
        </p>
      </div>
    </section>
  );
}
