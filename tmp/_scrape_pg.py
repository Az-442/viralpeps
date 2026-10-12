#!/usr/bin/env python3
"""Scrape Peptide Global product pages: title, price, stock, image, dosage."""
import json, re, ssl, urllib.request, html

ctx = ssl._create_unverified_context()
HDRS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
        "Accept-Language": "en-GB,en;q=0.9"}

urls = [u.strip() for u in open("tmp/_pg_products.txt") if u.strip()]
out = []
for u in urls:
    try:
        req = urllib.request.Request(u, headers=HDRS)
        body = urllib.request.urlopen(req, timeout=25, context=ctx).read().decode("utf-8", "ignore")
    except Exception as e:
        out.append({"url": u, "error": str(e)[:80]})
        continue
    t = re.search(r"<title>(.*?)</title>", body, re.I | re.S)
    title = html.unescape(t.group(1).strip()) if t else ""
    # price: prefer JSON-LD offers price
    prices = re.findall(r'"price"\s*:\s*"?([0-9]+(?:\.[0-9]{1,2})?)', body)
    # wc price block
    wc = re.findall(r'woocommerce-Price-amount amount"><bdi>[^<]*<span[^>]*>&pound;</span>([0-9.,]+)', body)
    stock = "in stock" if re.search(r"\bIn stock\b", body, re.I) else ("out of stock" if re.search(r"Out of stock", body, re.I) else "?")
    og = re.search(r'og:image"\s+content="([^"]+)"', body)
    desc = re.search(r'name="description"\s+content="([^"]*)"', body)
    # look for dosage markers
    doses = sorted(set(re.findall(r"\b(\d+(?:\.\d+)?\s*(?:mg|mcg|ml))\b", body, re.I)))[:8]
    out.append({
        "url": u,
        "title": title,
        "jsonld_prices": prices[:4],
        "wc_prices": wc[:4],
        "stock": stock,
        "og_image": og.group(1) if og else "",
        "doses": doses,
        "desc": (html.unescape(desc.group(1)) if desc else "")[:200],
    })

json.dump(out, open("tmp/_pg_scrape.json", "w"), indent=2, ensure_ascii=False)
for o in out:
    print(o.get("url", "").split("/product/")[-1].strip("/"), "|", o.get("stock"), "|", o.get("jsonld_prices"), "|", o.get("wc_prices"), "|", (o.get("title") or "")[:70])
print("TOTAL", len(out))
