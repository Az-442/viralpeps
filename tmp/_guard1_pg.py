#!/usr/bin/env python3
"""Guard 1 — GET + title content check for all Peptide Global URLs."""
import json, re, ssl, urllib.request, html

ctx = ssl._create_unverified_context()
HDRS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36", "Accept-Language": "en-GB,en;q=0.9"}
SITE = "Peptide Global"

data = json.load(open("tmp/_pg_scrape.json"))
CATEGORY = re.compile(r"/(shop|products?|store|category|collections?|product-category)/?$", re.I)
bad = 0
for o in data:
    u = o["url"]
    if CATEGORY.search(u):
        print("CATEGORY-URL", u); bad += 1; continue
    t = o.get("title", "")
    slug_words = [w for w in re.split(r"[-/]", u.rstrip("/").split("/product/")[-1]) if w and not w.isdigit()]
    # title must contain at least one distinctive compound token
    tokens = [w for w in slug_words if len(w) > 3 and w not in ("vial", "pen", "blend", "water", "dac")]
    named = any(tok.lower().replace("-", "") in t.lower().replace("-", "").replace(" ", "") for tok in tokens)
    generic = t.strip().lower() in (SITE.lower(), SITE.lower() + " - uk research peptide supplier")
    status = "OK" if (named and not generic) else "REJECT"
    if status == "REJECT": bad += 1
    print(status, "|", u.split("/product/")[-1], "|", o.get("stock"), "|", t[:75])
print("TOTAL", len(data), "BAD", bad)
