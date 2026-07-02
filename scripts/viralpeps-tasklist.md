# ViralPeps — Master Tasklist (Updated 1 Jul 2026)

## ✅ COMPLETED TO DATE

### Core Infrastructure
- [x] Site live at viralpeps.co.uk — Next.js on Vercel, auto-deploys on push to main
- [x] 14 suppliers with catalog data
- [x] 396 compound entries in compounds.json
- [x] All homepage/compound data computed live from compounds.json
- [x] Build passes consistently

### Compound Tabs (52 done)
- [x] Base slug resolution deployed — getBaseCompoundSlug() maps product variants to parent
- [x] 109+ variant product pages now show real tab content
- [x] Tab content frozen for all 52 approved compounds — never modify, only add new

### Vendors & Products
- [x] Supplier SOP saved as skill
- [x] Featured supplier: random when none pays
- [x] Biohack Peptides: 25 product images downloaded
- [x] Kensington Labs: 49 product images downloaded
- [x] ProductImage component rewritten with HEAD check
- [x] Vendor-stats.ts compound-duplication bug fixed (Raccoon 164→74)
- [x] Product card and profile page counts synced
- [x] 14 supplier logos in /public/images/vendors/

### Pages Built
- [x] Homepage (/)
- [x] Compounds directory (/compounds)
- [x] Individual compound pages (/compounds/[slug])
- [x] Vendors directory (/vendors)
- [x] Individual vendor pages (/vendors/[slug])
- [x] Vendor registration (/vendors/register)
- [x] Tools (/tools)
- [x] FAQ (/faq) — with FAQPage schema (8 questions)
- [x] Research library (/research) — filled with guide cards
- [x] About Us (/about)
- [x] Contact Us (/contact)
- [x] Privacy Policy (/privacy-policy)
- [x] Disclaimer (/disclaimer)

### Schema (all valid, no errors)
- [x] WebSite — every page
- [x] Organization — every page
- [x] FAQPage — FAQ page + compound pages (8 questions)

## 🔴 TONIGHT (Cron)
- [ ] **Cron "add-remaining-compound-tabs"** — 1am Jul 2 (job_id: 9eebf57b966c)
  - Adds remaining ~20 base compounds one-by-one, builds, deploys
  - Delivers results back to Telegram chat

## 🟡 PRE-LAUNCH
- [ ] Verify Biohack / Kensington product images load on live site
- [ ] Submit sitemap to Google Search Console (GSC)
- [ ] Set up analytics (GA4 or Plausible)
- [ ] Admin panel at /admin (mockup saved)
- [ ] Beehiiv newsletter account + setup

## 📋 MARKETING & SEO
- [ ] Content silos — 7 landing pages per top compound
- [ ] Top 20 compounds by search volume — build silos first
- [ ] Beehiiv newsletter campaigns

## 🟢 POST-LAUNCH
- [ ] Admin analytics dashboard
- [ ] Google Shopping feed
- [ ] Supplier payout/commission tracking
- [ ] Click tracking per supplier

## ⚠️ RULES
- No subagents for adding compound tabs
- Never modify approved tab content
- Every supplier addition: verify URLs, images, counts, build
- All IDs/slugs must be globally unique

## 📁 KEY FILES
- `/Users/time4you/viralpeps/src/data/compound-tabs.tsx`
- `/Users/time4you/viralpeps/src/data/compounds.json`
- `/Users/time4you/viralpeps/src/data/vendors.json`
- `/Users/time4you/viralpeps/scripts/remaining_tabs.py`
- `/Users/time4you/viralpeps/scripts/remaining-tabs-jobs.md`
