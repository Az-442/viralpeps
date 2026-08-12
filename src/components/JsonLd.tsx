import vendors from "@/data/vendors.json";

export const SITE_URL = "https://www.viralpeps.co.uk";
export const SITE_NAME = "ViralPeps";
export const LOGO_URL = `${SITE_URL}/images/viralpeps-logo.png`;

// ── Helpers ──
export function parsePrice(price: string): number | null {
  if (!price) return null;
  const n = parseFloat(price.replace(/[£$€,]/g, ""));
  if (isNaN(n) || n <= 0) return null; // invalid or zero → not real
  return n;
}

export function vendorSlugByName(name: string): string {
  const v = vendors.find((v) => v.name === name);
  // Mirror CompoundPageClient: fallback to lowercased-hyphenated name if no vendor match
  return v?.slug || name.toLowerCase().replace(/\s+/g, "-");
}

function absolute(rel: string): string {
  if (/^https?:\/\//.test(rel)) return rel;
  return `${SITE_URL}${rel.startsWith("/") ? rel : `/${rel}`}`;
}

// ── Reusable JSON-LD renderer ──
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  );
}

// 1. Organization (sitewide, referenced by @id)
// NOTE: logo references the real served asset /images/viralpeps-logo.png.
// sameAs intentionally omitted — no verified ViralPeps social profiles exist.
export const siteOrganization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absolute(LOGO_URL),
};

export const siteWebsite = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// 3. Product + AggregateOffer on compound page. Only emitted when ≥1 valid vendor price.
// One Offer per distinct vendor (using that vendor's lowest valid price — matches the "From £X" shown).
export function compoundProduct(compound: {
  name: string;
  slug: string;
  description?: string;
  sources: { vendor: string; url: string; price: string; inStock?: boolean }[];
}): Record<string, unknown> | null {
  // Deduplicate by vendor: keep lowest valid price + any inStock=false signal for that vendor
  const byVendor = new Map<string, { url: string; price: number; inStock: boolean }>();
  for (const s of compound.sources) {
    const price = parsePrice(s.price);
    if (price === null) continue; // skip zero/invalid
    const cur = byVendor.get(s.vendor);
    if (!cur || price < cur.price) {
      byVendor.set(s.vendor, { url: s.url, price, inStock: s.inStock !== false });
    }
  }

  const offers = [...byVendor.entries()].map(([vendor, o]) => {
    const slug = vendorSlugByName(vendor);
    return {
      "@type": "Offer",
      price: o.price.toFixed(2),
      priceCurrency: "GBP",
      url: absolute(`/go/${slug}/${compound.slug}`),
      itemCondition: "https://schema.org/NewCondition",
      availability: o.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: vendor,
        ...(slug ? { url: absolute(`/vendors/${slug}`) } : {}),
      },
    };
  });

  if (offers.length === 0) return null; // CRITICAL: no real prices → no pricing markup

  const prices = offers.map((o: any) => parseFloat(o.price));
  const lowPrice = Math.min(...prices);
  const highPrice = Math.max(...prices);

  return {
    "@type": "Product",
    name: compound.name,
    description: compound.description ? compound.description.slice(0, 250) : undefined,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GBP",
      lowPrice: lowPrice.toFixed(2),
      highPrice: highPrice.toFixed(2),
      offerCount: offers.length,
      offers,
    },
  };
}

// 2. BreadcrumbList — item names use the real page titles/H1s, not raw slugs
export function breadcrumb(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absolute(it.url),
    })),
  };
}

// 4. ItemList — hub pages (/compounds, /vendors), in visible page order
export function itemList<T extends { name: string; url: string }>(items: T[]): Record<string, unknown> {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absolute(it.url),
    })),
  };
}

// 5. Vendor Organization. AggregateRating omitted entirely — no real reviewCount in data.
export function vendorOrganization(v: {
  name: string;
  slug: string;
  website?: string;
  description?: string;
}): Record<string, unknown> {
  return {
    "@type": "Organization",
    name: v.name,
    url: absolute(`/vendors/${v.slug}`),
    ...(v.website ? { sameAs: [v.website] } : {}),
    ...(v.description ? { description: v.description.slice(0, 250) } : {}),
  };
}

// 8. SoftwareApplication — tools, marked as utility app, not medical
export function softwareApplication(opts: {
  name: string;
  url: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@type": "SoftwareApplication",
    name: opts.name,
    url: absolute(opts.url),
    description: opts.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
