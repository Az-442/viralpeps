#!/usr/bin/env python3
"""
REMOVE Kings BioLabs (www.kingsbiolabs.co.uk) — site is DOWN.

Evidence (verified 19 Sep 2026):
  - Homepage, /sitemap.xml, /robots.txt ALL return HTTP 404
  - The 404 is Webflow's own error page (app-assets.website-files.com/css/webflow-https-errors.webflow.css)
  - DNS points to Webflow CDN (198.202.211.1) with MX -> Google Workspace
     => domain is live but the Webflow SITE has been unpublished/deleted
  - cf-cache-status: HIT, max-age=432000 -> a ~5-day cached 404
  - Wayback Machine has NEVER archived the domain
  - Web search returns no results for the brand

Per the standing rule "Never ship a placeholder again" + the soft-404 guard, a vendor
that cannot be verified live must not be listed. All 13 product URLs are dead.

Action: remove vendor entry, all 13 source entries, and the logo + product images.
Keeps the site data clean; can be re-added if the supplier comes back online.
"""
import json, os, shutil

DATA_C = 'src/data/compounds.json'
DATA_V = 'src/data/vendors.json'
VENDOR = 'Kings BioLabs'
SLUG = 'kings-bio-labs'

c = json.load(open(DATA_C))
v = json.load(open(DATA_V))

# 1. remove source entries
removed_sources = []
for comp in c:
    before = len(comp.get('sources', []))
    kept = [s for s in comp.get('sources', []) if s.get('vendor') != VENDOR]
    if len(kept) != before:
        removed_sources.append((comp['slug'], before - len(kept)))
        comp['sources'] = kept

json.dump(c, open(DATA_C, 'w'), indent=2)

# 2. remove vendor entry
before_v = len(v)
v = [x for x in v if x.get('name') != VENDOR]
json.dump(v, open(DATA_V, 'w'), indent=2)

print(f"vendor entries removed: {before_v - len(v)}")
print(f"source entries removed: {sum(n for _, n in removed_sources)} across {len(removed_sources)} compounds")
for slug, n in removed_sources:
    print(f"   {slug} ({n})")

# 3. move images out (don't hard-delete - park in tmp for recovery)
for d in ['public/images/vendors/kings-bio-labs.png', 'public/images/products/kings-bio-labs']:
    if os.path.exists(d):
        dest = os.path.join('tmp/removed-kings-bio-labs', os.path.basename(d.rstrip('/')))
        os.makedirs(os.path.dirname(dest.rstrip('/')) if False else 'tmp/removed-kings-bio-labs', exist_ok=True)
        if os.path.exists(dest):
            if os.path.isdir(dest):
                shutil.rmtree(dest)
            else:
                os.remove(dest)
        shutil.move(d, dest)
        print(f"parked: {d} -> {dest}")
    else:
        print(f"not present: {d}")
