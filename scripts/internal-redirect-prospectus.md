# Internal Redirect System — Prospectus & Guidelines

## Purpose
Route all outbound links through `/go/{vendor}/{target}` to:
- Track click-through rates per vendor & compound
- Build data on which compounds/suppliers drive engagement
- Keep outbound links clean and audit-able
- Enable future ad-sales pitch ("X researchers clicked through to vendor Y last month")

## URL Structure
```
/go/{vendor-slug}/{compound-slug}
/go/{vendor-slug}/home              ← for vendor logo / "Visit" CTA (homepage link)
/go/amazon/{product-slug}           ← for Amazon affiliate links
```

All slugs are lowercase-hyphenated (already clean). Examples:
- `/go/uk-peptides/tirzepatide`
- `/go/kensington-labs/home`
- `/go/amazon/peptide-research-book`

## Which Links Need Changing
Every external outbound link on the site:
- **"Visit [vendor]" CTA button** on vendor profile pages (`vendors/[slug]/page.tsx`)
- **Compound comparison table** "Buy from [vendor]" links (`CompoundPageClient.tsx`)
- **Vendor logo clicks** on listing cards (`vendors/page.tsx`)
- **"View →" cards** on supplier directory
- **Footer external links**
- **Future affiliate links** (Amazon, etc.)

~500+ links total across the site.

## Amazon Affiliate Compatibility
Amazon uses Associates tracking via `?tag=yourname-21` parameter. The `/go/` redirect passes this through — Amazon counts the referral from the final destination URL. ✅ Compatible

**Rules:**
- Server-side 302 redirect only (no JavaScript redirects)
- Final URL includes full affiliate tag (`?tag=yourid-21`)
- No URL cloaking — destination must be visible in final URL
- Amazon's T&C: redirects are allowed as long as the final URL contains your tag

## Implementation Impact
- **Performance**: Negligible (~50ms per redirect). No page load, no JS.
- **SEO**: No impact. Redirects return 302 (temporary), not indexed by Google.
- **User experience**: Unchanged — users arrive at the same destination.
- **Build time**: ~30–60 minutes to build the route.

## Implementation Plan
1. Create `src/app/go/[vendor]/[slug]/page.tsx` — catches all `/go/...` requests
2. Look up vendor slug in `vendors.json`, compound slug in `compounds.json`
3. Log click (JSON file or SQLite): timestamp, vendor, compound, referrer
4. 302 redirect to destination URL (preserving any affiliate tags)
5. Update all outbound links across the site to use `/go/...` paths
