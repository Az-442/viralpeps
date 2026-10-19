#!/usr/bin/env python3
"""For each vendor with 404s, determine whether the vendor still sells that compound
via a working URL found from their sitemap/shop. Distinguishes:
  URL-CHANGED  -> vendor still lists the compound, our stored URL is stale
  GONE         -> no equivalent product found on vendor site
"""
import json, re, ssl, urllib.request, urllib.error
from collections import defaultdict

ROOT = "/Users/time4you/viralpeps"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE


def get(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception:
        return None, ""


rec = json.load(open(f"{ROOT}/scripts/delisted_recheck.json"))
dead = [r for r in rec if r["recheck"] in (404, 410)]

vsite = {}
data = json.load(open(f"{ROOT}/src/data/compounds.json"))
for c in data:
    for s in c.get("sources", []):
        u = s.get("url", "")
        if u.startswith("http"):
            p = u.split("/")
            if len(p) > 2:
                vsite.setdefault(s["vendor"], f"{p[0]}//{p[2]}")

by = defaultdict(list)
for r in dead:
    by[r["vendor"]].append(r)

# sitemap-based index per vendor, limited
print("vendor | sitemap_urls | searched compound hits")
out = {}
for v, rs in by.items():
    site = vsite.get(v)
    sm_urls = []
    for cand in (f"{site}/sitemap.xml", f"{site}/sitemap_index.xml", f"{site}/wp-sitemap.xml"):
        st, body = get(cand)
        if st == 200 and "<" in body:
            locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", body)
            # follow sub-sitemaps one level
            subs = [l for l in locs if l.endswith(".xml")][:6]
            sm_urls.extend([l for l in locs if not l.endswith(".xml")])
            for s2 in subs:
                st2, b2 = get(s2)
                if st2 == 200:
                    sm_urls.extend(re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", b2))
            if sm_urls:
                break
    slugs = {r["slug"] for r in rs}
    hits = defaultdict(list)
    for u in sm_urls:
        key = u.lower()
        for s in slugs:
            core = s.replace("-", "")
            if s in key or core in key.replace("-", ""):
                hits[s].append(u)
    out[v] = {"sitemap_count": len(sm_urls), "hits": {k: v2[:3] for k, v2 in hits.items()},
              "dead": [(r["slug"], r["url"]) for r in rs]}
    print(f"{v[:22]:22} sitemap={len(sm_urls):5} compounds_with_live_url={len(hits)}/{len(slugs)}")

json.dump(out, open(f"{ROOT}/scripts/sitemap_check.json", "w"), indent=1)
