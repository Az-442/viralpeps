/**
 * Class taxonomy for internal linking.
 *
 * - CLASS_GROUPS: canonical pharmacological classes → ordered member slugs.
 *   Members are the "head" compounds (the canonical slug for each research
 *   topic). Also used to build the class-grouped index on /compounds and the
 *   class hub link on every compound page.
 *
 * - relatedSlugs(): for any compound (head OR a product/variant page such as
 *   "bpc-157-5mg"), resolve its class via slug-prefix matching and return 3-4
 *   siblings from the same class. This gives every one of the ~400 compound
 *   pages a crawlable path to related pages, while keeping the links topical.
 */

export interface ClassGroup {
  slug: string;
  label: string;
  short: string;
  members: string[];
  /** Slug-prefixes used to attach variant/product pages to this class. */
  match: string[];
}

/** Order-preserving dedupe for class member lists. */
function uniq(list: string[]): string[] {
  return Array.from(new Set(list));
}

export const CLASS_GROUPS: ClassGroup[] = [
  {
    slug: "glp-1-incretin",
    label: "GLP-1 / Incretin Peptides",
    short: "GLP-1 & Incretin",
    members: [
      "retatrutide",
      "tirzepatide",
      "semaglutide",
      "mazdutide",
      "survodutide",
      "liraglutide",
      "cagrilintide",
    ],
    match: [
      "retatrutide", "tirzepatide", "semaglutide", "mazdutide", "survodutide",
      "liraglutide", "cagrilintide", "gagrilintide", "eloralintide", "glp-3",
      "sterling-tirzepatide", "sterling-tirz3", "sterling-retatrutide",
      "sterling-cagrilintide", "adipotide",
    ],
  },
  {
    slug: "gh-secretagogues",
    label: "GH Secretagogues / GHRPs",
    short: "Growth Hormone",
    members: [
      "ipamorelin",
      "cjc-1295",
      "cjc-1295-ipamorelin",
      "ghrp-2",
      "ghrp-6",
      "hexarelin",
      "sermorelin",
      "tesamorelin",
      "mk-677-ibutamoren-10mg-100-tablets",
      "hgh-97",
      "hgh-fragment-176-191-5mg",
      "cjc-1295-no-dac",
      "cjc-1295-dac",
      "modified-grf-1-29-2mg",
      "mgf",
      "peg-mgf",
    ],
    match: [
      "ipamorelin", "cjc-1295", "cjc-1295-no-dac", "cjc-1295-dac", "ghrp-2",
      "ghrp-6", "hexarelin", "sermorelin", "tesamorelin", "mk-677-ibutamoren",
      "hgh-97",
      "hgh-fragment", "fragment-176-191", "ghrh", "modified-grf", "mod-grf",
      "mgf", "igf-1", "igf1", "hgh-191", "ipam-cjc", "ipam-tesa", "peg-mgf",
      "tesamorelin-ipamorelin", "sermorelin-grf", "bundle-gh-stack",
      "bundle-premium-gh-stack", "premium-ipamorelin", "premium-ghrp-2",
      "premium-ghrp-6", "premium-mod-grf", "premium-ghk-cu",
    ],
  },
  {
    slug: "healing-repair",
    label: "Healing & Tissue Repair",
    short: "Healing & Repair",
    members: ["bpc-157", "tb-500", "bpc-157-tb-500", "ghk-cu", "bpc-157-oral"],
    match: [
      "bpc-157", "bpc-5mg", "bpc-10mg", "tb-500", "tb500", "thymosin-beta-4",
      "ghk-cu", "wolverine", "bpc-157-tb-500", "b7-33", "ll-37", "pentosan",
      "bpc-157-tb500", "premium-bpc-157",
    ],
  },
  {
    slug: "cosmetic-skin",
    label: "Cosmetic & Skin",
    short: "Cosmetic & Skin",
    members: [
      "glow",
      "klow",
      "melanotan-ii",
      "melanotan-i",
      "snap-8",
      "matrixyl-3000",
      "pal-ghk",
      "ahk-cu",
    ],
    match: [
      "glow", "klow", "melanotan", "mt2", "snap-8", "snap-8-argireline",
      "argireline", "matrixyl", "pal-ghk", "ahk-cu", "melatonin", "tp2",
      "cartalax", "premium-ghk-cu", "ahk-cu",
    ],
  },
  {
    slug: "nootropic-neuro",
    label: "Nootropic & Neuro Peptides",
    short: "Nootropic & Neuro",
    members: [
      "semax",
      "selank",
      "cerebrolysin",
      "dihexa",
      "phenylpiracetam",
      "p21",
      "noopept",
      "semax-5mg",
      "selank-5mg",
      "semax-5mg-imperial",
      "selank-5mg-imperial",
      "selank-semax-blend",
      "pinealon",
      "pe-22-28",
      "cerebrolysin",
    ],
    match: [
      "semax", "selank", "n-acetyl-semax", "n-acetyl-selank", "cerebrolysin",
      "dihexa", "phenylpiracetam", "p21", "noopept", "pramipexole", "pinealon",
      "pe-22-28", "orexin", "cognitive-signalling-set", "vilon", "cortagen",
    ],
  },
  {
    slug: "mito-metabolic",
    label: "Mitochondrial & Metabolic",
    short: "Mitochondrial",
    members: ["mots-c", "ss-31", "aicar", "5-amino-1mq", "nad-plus", "bam15", "slu-pp-332"],
    match: [
      "mots-c", "ss-31", "aicar", "5-amino-1mq", "nad-plus", "nad-", "bam15",
      "slu-pp-332", "methylene-blue", "lipo-c", "l-carnitine", "mq-nad-c",
      "bundle-mito-stack",
    ],
  },
  {
    slug: "sexual-health",
    label: "Sexual Health",
    short: "Sexual Health",
    members: [
      "pt-141-bremelanotide",
      "pt-141",
      "kisspeptin-10",
      "kisspeptin-nasal-spray",
      "oxytocin",
      "pt-141-10mg",
      "pt-141-nasal-spray",
      "oxytocin-nasal-spray",
      "kisspeptin-5mg",
    ],
    match: ["pt-141", "bremelanotide", "kisspeptin", "oxytocin"],
  },
  {
    slug: "longevity",
    label: "Longevity",
    short: "Longevity",
    members: [
      "epitalon",
      "thymosin-alpha-1",
      "thymalin",
      "foxo4-dr1",
      "epithalon",
      "humanin",
      "klotho",
      "thymulin",
      "epithalon-vial-express",
    ],
    match: [
      "epitalon", "epithalon", "thymosin-alpha", "thymosin-alpha1", "thymalin",
      "foxo4-dr1", "humanin", "klotho", "thymulin",
    ],
  },
  {
    slug: "fertility",
    label: "Fertility & Hormonal",
    short: "Fertility",
    members: [
      "hcg",
      "hmg",
      "gonadorelin",
      "follistatin-344",
      "gonadorelin-acetategnrh-2mg",
      "hcg-human-chorionic-gonadotropin",
    ],
    match: ["hcg", "hmg", "gonadorelin", "follistatin", "kisspeptin"],
  },
  {
    slug: "sleep-other",
    label: "Sleep & Other",
    short: "Sleep & Other",
    members: ["dsip", "aod-9604", "fragment-176-191", "kpv", "dsip-5mg", "kpv-5mg"],
    match: ["dsip", "aod-9604", "kpv", "fragment-176-191", "adipotide", "ll-37"],
  },
];

/** Lookup: group slug → group */
export const CLASS_BY_SLUG: Record<string, ClassGroup> = Object.fromEntries(
  CLASS_GROUPS.map((g) => [g.slug, g])
);

/** Lookup: member/head slug → group slug */
export const HEAD_TO_CLASS: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const g of CLASS_GROUPS) for (const m of g.members) map[m] = g.slug;
  return map;
})();

/**
 * Resolve the class of any compound slug: exact head match first, then the
 * longest matching prefix (so "bpc-157-5mg-imperial" → healing-repair).
 */
export function classForSlug(slug: string): ClassGroup | null {
  if (HEAD_TO_CLASS[slug]) return CLASS_BY_SLUG[HEAD_TO_CLASS[slug]];
  let best: ClassGroup | null = null;
  let bestLen = 0;
  for (const g of CLASS_GROUPS) {
    for (const p of g.match) {
      if (slug === p || slug.startsWith(p + "-") || slug.startsWith(p)) {
        if (p.length > bestLen) {
          best = g;
          bestLen = p.length;
        }
      }
    }
  }
  return best;
}

/** Human label for a slug, derived from the slug itself. */
export function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => {
      if (/^\d+$/.test(w)) return w;
      if (/^(mg|mcg|ml|iu|gm)$/i.test(w)) return w.toLowerCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ")
    .replace(/\bUk\b/g, "UK")
    .replace(/\bPtp\b/g, "")
    .trim();
}

/**
 * Pick 3-4 siblings from the same class.
 * Prefers the class "members" (head pages with real price data) and excludes
 * the current slug. Deterministic ordering so the build is stable.
 * If the class has too few members (variant pages, one-off compounds), top up
 * with popular compounds so the page still has outbound topical links.
 */
const POPULAR_FALLBACK = ["bpc-157", "tb-500", "tirzepatide", "retatrutide", "ghk-cu", "ipamorelin"];

export function pickSiblings(slug: string, count = 4, allSlugs?: string[]): string[] {
  const g = classForSlug(slug);
  const out: string[] = [];
  if (g) {
    const pool = g.members.filter((m) => m !== slug);
    if (pool.length > 0) {
      const start = slug.length % pool.length;
      const rotated = [...pool.slice(start), ...pool.slice(0, start)];
      out.push(...rotated.slice(0, count));
    }
  }
  if (out.length < 3) {
    for (const f of POPULAR_FALLBACK) {
      if (out.length >= 3) break;
      if (f === slug || out.includes(f)) continue;
      if (allSlugs && !allSlugs.includes(f)) continue;
      out.push(f);
    }
  }
  return out.slice(0, count);
}

export interface RelatedItem {
  slug: string;
  name: string;
  minPrice: number | null;
}

type AnyCompound = {
  slug: string;
  name?: string;
  redirect?: string;
  sources?: { price?: string }[];
};

function minPriceOf(c: AnyCompound): number | null {
  const prices = (c.sources || [])
    .map((s) => parseFloat(String(s.price || "").replace(/[£$€,]/g, "")))
    .filter((p) => !isNaN(p) && p > 0);
  return prices.length ? Math.min(...prices) : null;
}

/** Build the related-compound card list for a page. */
export function getRelated(slug: string, all: AnyCompound[], count = 4): RelatedItem[] {
  const bySlug = new Map(all.map((c) => [c.slug, c]));
  const allSlugs = all.filter((c) => !c.redirect).map((c) => c.slug);
  return pickSiblings(slug, count, allSlugs)
    .map((s) => bySlug.get(s))
    .filter((c): c is AnyCompound => !!c && !c.redirect)
    .map((c) => ({
      slug: c.slug,
      name: c.name || labelFromSlug(c.slug),
      minPrice: minPriceOf(c),
    }));
}

/** Class-grouped index for the /compounds hub: only slugs that exist. */
export function getClassIndex(
  all: AnyCompound[],
  opts: { exclude?: string[] } = {}
): { group: ClassGroup; items: RelatedItem[] }[] {
  const bySlug = new Map(all.map((c) => [c.slug, c]));
  const used = new Set<string>(opts.exclude || []);
  const out: { group: ClassGroup; items: RelatedItem[] }[] = [];
  for (const g of CLASS_GROUPS) {
    const items: RelatedItem[] = [];
    for (const m of g.members) {
      const c = bySlug.get(m);
      if (!c || c.redirect || used.has(m)) continue;
      used.add(m);
      items.push({ slug: m, name: c.name || labelFromSlug(m), minPrice: minPriceOf(c) });
    }
    if (items.length) out.push({ group: g, items });
  }
  return out;
}
