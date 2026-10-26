#!/usr/bin/env python3
"""
Price checker for ViralPeps (v3 - variant aware, strict).

Extraction strategy per page:
  A. WooCommerce variation JSON (data-product_variations) -> {size_label: price}
  B. JSON-LD offers with GBP -> list of (sku/name, price)
  C. Single price signals (meta / woo .price block / data-price) -> scalar

Then match to the stored source "dosage" field:
  - if the page has variants, only write when exactly one variant's label matches dosage
  - if page has a single price and source has no dosage -> safe write
  - if page has a single price but source has a dosage -> only write if the page is
    clearly a single-SKU page (no variant selectors) - else NO_PRICE (ambiguous)

Usage:
  python3 scripts/price_check.py --limit 400 --hosts-file tmp/ok_hosts.json
  python3 scripts/price_check.py --limit 400 --hosts-file tmp/ok_hosts.json --apply
"""

import json
import re
import html as htmlmod
import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

import requests

COMPOUNDS = "/Users/time4you/viralpeps/src/data/compounds.json"
RESULTS = "/Users/time4you/viralpeps/tmp/price_check_results.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
}

LD_RE = re.compile(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', re.S | re.I)
VAR_RE = re.compile(r'data-product_variations="(.*?)"\s*>', re.S)
META_RE = [
    re.compile(r'<meta[^>]+(?:property|name)="(?:product:price:amount|og:price:amount)"[^>]+content="(\d+(?:\.\d{1,2})?)"', re.I),
    re.compile(r'<meta[^>]+content="(\d+(?:\.\d{1,2})?)"[^>]+(?:property|name)="(?:product:price:amount|og:price:amount)"', re.I),
]
WOO_PRICE_RE = re.compile(r'<p[^>]*class="[^"]*\bprice\b[^"]*"[^>]*>(.*?)</p>', re.S | re.I)
BDI_RE = re.compile(r'<bdi>\s*£\s?([\d,]+(?:\.\d{1,2})?)\s*</bdi>', re.I)
POUND_RE = re.compile(r'£\s?([\d,]+(?:\.\d{1,2})?)')
DATA_PRICE_RE = re.compile(r'data-(?:product-)?price="(\d+(?:\.\d{1,2})?)"', re.I)
VARIANT_SELECT_RE = re.compile(r'<select[^>]+(?:variation|pa_)[^>]*>', re.I)

NOT_FOUND_MARKERS = ("page not found", "404", "not found", "nothing found", "no products were found")

# ------------------------------------------------ normalisation
UNIT_NORM = {
    "mg": "mg", "milligram": "mg", "milligrams": "mg",
    "mcg": "mcg", "ug": "mcg", "iu": "iu",
    "ml": "ml", "%": "%",
}


def normalise_size(label):
    """'10mg' / '10 mg' / '10MG' / '10000iu' -> ('10','mg')"""
    if not label:
        return None
    s = str(label).lower().strip()
    s = s.replace("&nbsp;", " ").replace(",", "")
    m = re.search(r"(\d+(?:\.\d+)?)\s*(mg|mcg|ug|iu|ml|%)", s)
    if not m:
        m = re.search(r"^(\d+(?:\.\d+)?)$", s)
        if m:
            return (m.group(1), "")
        return None
    unit = UNIT_NORM.get(m.group(2), m.group(2))
    return (m.group(1), unit)


def sizes_match(a, b):
    na, nb = normalise_size(a), normalise_size(b)
    if not na or not nb:
        return False
    if na[0] != nb[0]:
        return False
    # unit must match, or one side has no unit
    return na[1] == nb[1] or not na[1] or not nb[1]


# ------------------------------------------------ extractors
def prices_from_variations(html):
    """Return list of (label, price) from WooCommerce variation JSON."""
    out = []
    m = VAR_RE.search(html)
    if not m:
        return out
    raw = htmlmod.unescape(m.group(1))
    try:
        vars_ = json.loads(raw)
    except Exception:
        return out
    for v in vars_ or []:
        if not isinstance(v, dict):
            continue
        price = v.get("display_price")
        if price in (None, "", 0):
            price = v.get("display_regular_price")
        try:
            price = float(price)
        except (TypeError, ValueError):
            continue
        if price <= 0:
            continue
        attrs = v.get("attributes") or {}
        label = " ".join(str(x) for x in attrs.values() if x)
        out.append((label.strip(), price))
    return out


def prices_from_jsonld(html):
    """Return list of (label, price) for GBP offers."""
    out = []
    for m in LD_RE.finditer(html):
        raw = re.sub(r"^\s*<!--|-->\s*$", "", m.group(1).strip())
        try:
            obj = json.loads(raw)
        except Exception:
            continue
        stack = [obj]
        while stack:
            node = stack.pop()
            if isinstance(node, list):
                stack.extend(node); continue
            if not isinstance(node, dict):
                continue
            offers = node.get("offers")
            if isinstance(offers, dict):
                offers = [offers]
            if isinstance(offers, list):
                for o in offers:
                    if not isinstance(o, dict):
                        continue
                    cur = (o.get("priceCurrency") or "").upper()
                    p = o.get("price")
                    if p in (None, "") or cur != "GBP":
                        continue
                    try:
                        pf = float(str(p).replace(",", ""))
                    except ValueError:
                        continue
                    if pf <= 0:
                        continue
                    label = str(o.get("name") or o.get("sku") or "")
                    out.append((label, pf))
            for v in node.values():
                if isinstance(v, (dict, list)):
                    stack.append(v)
    return out


def single_price(html):
    for rx in META_RE:
        m = rx.search(html)
        if m:
            try:
                return float(m.group(1)), "meta"
            except ValueError:
                pass
    for m in WOO_PRICE_RE.finditer(html):
        block = m.group(1)
        found = [float(x.replace(",", "")) for x in BDI_RE.findall(block)]
        if not found:
            found = [float(x.replace(",", "")) for x in POUND_RE.findall(block)]
        if len(set(found)) == 1 and found[0] > 0:
            return found[0], "woo-price"
    dp = sorted({float(x) for x in DATA_PRICE_RE.findall(html) if float(x) > 0})
    if len(dp) == 1:
        return dp[0], "data-price"
    return None, None


def resolve_price(html, dosage):
    """Return (price, method, note)."""
    variants = prices_from_variations(html)
    if variants:
        if dosage:
            hits = {p for lbl, p in variants if sizes_match(lbl, dosage)}
            if len(hits) == 1:
                return hits.pop(), "variation", ""
            if len(hits) > 1:
                return None, "variation", f"multiple variants matched {dosage}: {sorted(hits)}"
            return None, "variation", f"no variant matched dosage {dosage!r} (have {[l for l,_ in variants]})"
        # no dosage stored, multiple sizes -> cannot assign one price
        return None, "variation", f"{len(variants)} variant prices, source has no dosage"

    offers = prices_from_jsonld(html)
    distinct = sorted({round(p, 2) for _, p in offers})
    if len(distinct) > 1:
        if dosage:
            hits = {p for lbl, p in offers if sizes_match(lbl, dosage)}
            if len(hits) == 1:
                return hits.pop(), "jsonld-variant", ""
        return None, "jsonld", f"ambiguous GBP offers {distinct[:6]}"
    if len(distinct) == 1:
        # single price. If dosage is set and the page advertises another size
        # elsewhere (e.g. dual "5mg & 10mg" pages), we cannot attribute it safely.
        if dosage:
            dual_size = re.search(r"\b(\d+(?:\.\d+)?\s*mg)\s*(?:&amp;|&|and|\+|/)\s*(\d+(?:\.\d+)?\s*mg)\b", (html or ""), re.I)
            if dual_size:
                return None, "jsonld", (f"page covers multiple sizes "
                                        f"({dual_size.group(1)}/{dual_size.group(2)}), single price {distinct[0]}")
        return distinct[0], "jsonld", ""

    p, method = single_price(html)
    if p is None:
        return None, None, "no price markup found"
    # page has variant selectors but we only found one price -> risky when dosage set
    if dosage and VARIANT_SELECT_RE.search(html):
        return None, method, f"variant selector present, single price {p} cannot be tied to {dosage}"
    return p, method, ""


def to_float_price(p):
    if not p:
        return None
    m = re.search(r"(\d+(?:\.\d{1,2})?)", str(p).replace(",", ""))
    return float(m.group(1)) if m else None


def check_one(w):
    rec = {"vendor": w["vendor"], "compound": w["compound"], "url": w["url"],
           "dosage": w.get("dosage"), "stored": w["price"], "status": None,
           "scraped": None, "method": "", "note": ""}
    try:
        r = requests.get(w["url"], headers=HEADERS, timeout=30, allow_redirects=True)
    except Exception as e:
        rec["status"] = "ERROR"; rec["note"] = type(e).__name__
        return rec

    if r.status_code == 404:
        rec["status"] = "DELISTED"; rec["note"] = "HTTP 404"
        return rec
    if r.status_code >= 400:
        rec["status"] = "ERROR"; rec["note"] = f"HTTP {r.status_code}"
        return rec

    # gated / redirected-away pages: not a delisting, we simply cannot read a price
    final_url = r.url.rstrip("/").lower()
    orig = w["url"].rstrip("/").lower()
    if ("login" in final_url or "my-account" in final_url or "signin" in final_url
            or "?ps_return=" in final_url or "/password" in final_url):
        rec["status"] = "GATED"
        rec["note"] = f"redirected to login/account page: {r.url[:90]}"
        return rec
    if final_url.split("?")[0] != orig.split("?")[0]:
        rec["status"] = "REDIRECTED"
        rec["note"] = f"-> {r.url[:90]}"
        return rec

    html = r.text
    low = html.lower()
    t = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
    rec["title"] = re.sub(r"\s+", " ", t.group(1)).strip()[:110] if t else ""
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S | re.I)
    rec["h1"] = re.sub(r"<[^>]+>", "", h1.group(1)).strip()[:90] if h1 else ""

    head = (rec["title"] + " " + rec["h1"]).lower()
    if any(k in head for k in NOT_FOUND_MARKERS):
        rec["status"] = "DELISTED"
        rec["note"] = f"title/h1: {rec['title'] or rec['h1']}"
        return rec

    price, method, note = resolve_price(html, w.get("dosage"))
    rec["method"] = method or ""
    rec["note"] = note
    if price is None or price <= 0:
        rec["status"] = "NO_PRICE"
        return rec

    rec["scraped"] = f"£{price:.2f}"
    stored = to_float_price(w["price"])
    if stored:
        pct = (price - stored) / stored * 100
        rec["pct"] = round(pct, 2)
        rec["status"] = "CHANGED" if abs(pct) > 5 else "OK"
    else:
        rec["status"] = "NO_STORED"

    if any(k in low for k in ("out of stock", "sold out", "currently unavailable")):
        rec["oos"] = True
    return rec


def build_work(data, args):
    ok_hosts = set(json.load(open(args.hosts_file))) if args.hosts_file else None
    work, seen = [], set()
    for ci, c in enumerate(data):
        if args.only_slug and c["slug"] != args.only_slug:
            continue
        for si, s in enumerate(c.get("sources", [])):
            u = s.get("url") or ""
            if not u.startswith("http"):
                continue
            if ok_hosts is not None and u.split("/")[2] not in ok_hosts:
                continue
            if args.vendor and args.vendor.lower() not in s["vendor"].lower():
                continue
            key = (u, s.get("dosage"), s.get("price"))
            if key in seen:
                continue
            seen.add(key)
            work.append({"ci": ci, "si": si, "vendor": s["vendor"], "compound": c["name"],
                         "url": u, "price": s.get("price", ""), "dosage": s.get("dosage")})
    return work


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=400)
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--vendor", default=None)
    ap.add_argument("--only-slug", default=None)
    ap.add_argument("--hosts-file", default=None)
    ap.add_argument("--workers", type=int, default=10)
    ap.add_argument("--offset", type=int, default=0)
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    data = json.load(open(COMPOUNDS))
    work = build_work(data, args)[args.offset: args.offset + args.limit]
    print(f"Checking {len(work)} entries...\n", flush=True)

    results = []
    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        for rec in ex.map(check_one, work):
            results.append(rec)
            if not args.quiet or rec["status"] in ("CHANGED", "DELISTED", "ERROR"):
                print(f"[{rec['status']:9}] {rec['vendor'][:24]:24} | {rec['compound'][:20]:20} | "
                      f"{str(rec['stored']):>9} -> {str(rec['scraped']):>9} | {rec['url'][:64]}", flush=True)

    counts = Counter(r["status"] for r in results)
    print("\n=== SUMMARY ===")
    for k, v in sorted(counts.items()):
        print(f"{k}: {v}")

    changed = [r for r in results if r["status"] == "CHANGED"]
    delisted = [r for r in results if r["status"] == "DELISTED"]
    noprice = [r for r in results if r["status"] == "NO_PRICE"]
    errors = [r for r in results if r["status"] == "ERROR"]
    oos = [r for r in results if r.get("oos")]

    print(f"\nCHANGED ({len(changed)}):")
    for r in changed:
        print(f"  {r['vendor']} | {r['compound']} | {r['dosage'] or '-'} | {r['stored']} -> {r['scraped']} "
              f"({r['pct']:+.1f}%) [{r['method']}] | {r['url']}")

    print(f"\nDELISTED ({len(delisted)}):")
    for r in delisted:
        print(f"  {r['vendor']} | {r['compound']} | {r['note']} | {r['url']}")

    print(f"\nERRORS ({len(errors)}):")
    for r in errors:
        print(f"  {r['vendor']} | {r['compound']} | {r['note']} | {r['url']}")

    gated = [r for r in results if r["status"] == "GATED"]
    redirected = [r for r in results if r["status"] == "REDIRECTED"]
    print(f"\nGATED / LOGIN-WALLED ({len(gated)}):")
    for r in gated:
        print(f"  {r['vendor']} | {r['compound']} | {r['note']} | {r['url']}")
    print(f"\nREDIRECTED ({len(redirected)}):")
    for r in redirected:
        print(f"  {r['vendor']} | {r['compound']} | {r['note']} | {r['url']}")

    print(f"\nNO PRICE / AMBIGUOUS ({len(noprice)}):")
    for r in noprice:
        print(f"  {r['vendor']} | {r['compound']} | {r['dosage'] or '-'} | {r['note']} | {r['url']}")

    print(f"\nOUT OF STOCK markers ({len(oos)}):")
    for r in oos:
        print(f"  {r['vendor']} | {r['compound']} | {r['dosage'] or '-'} | {r['url']}")

    for rec, w in zip(results, work):
        rec["ci"], rec["si"] = w["ci"], w["si"]
    json.dump(results, open(RESULTS, "w"), indent=2, ensure_ascii=False)

    if args.apply and changed:
        for r in changed:
            data[r["ci"]]["sources"][r["si"]]["price"] = r["scraped"]
        json.dump(data, open(COMPOUNDS, "w"), indent=2, ensure_ascii=False)
        print(f"\nApplied {len(changed)} price updates to compounds.json")


if __name__ == "__main__":
    main()
