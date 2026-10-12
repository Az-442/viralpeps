#!/usr/bin/env python3
"""Peptide Global — contact, shipping, home, about details."""
import re, ssl, urllib.request, html

ctx = ssl._create_unverified_context()
HDRS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36", "Accept-Language": "en-GB,en;q=0.9"}

def get(u):
    try:
        return urllib.request.urlopen(urllib.request.Request(u, headers=HDRS), timeout=25, context=ctx).read().decode("utf-8","ignore")
    except Exception as e:
        return f"ERR {e}"

for path in ["", "contact/", "shipping/", "delivery/", "about/", "terms/", "faq/"]:
    u = "https://peptideglobal.co.uk/" + path
    h = get(u)
    if h.startswith("ERR"):
        print("==", u, h); continue
    t = re.search(r"<title>(.*?)</title>", h, re.I|re.S)
    title = html.unescape(t.group(1).strip()) if t else ""
    # email
    emails = sorted(set(re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", h)))
    emails = [e for e in emails if not e.endswith((".png",".jpg",".webp",".js",".css"))][:6]
    # shipping text
    ship = re.findall(r"[^<>]{0,90}(?:free (?:UK )?(?:shipping|delivery)|tracked|Royal Mail|DPD|delivery within|next[- ]day|dispatch)[^<>]{0,90}", h, re.I)[:6]
    addr = re.findall(r'streetAddress["\s:]+"?([^",]+)|addressLocality["\s:]+"?([^",]+)|postalCode["\s:]+"?([^",]+)', h)
    phone = re.findall(r"\+44[\d\s-]{8,}", h)[:3]
    print("==", u, "|", title)
    if emails: print("   emails:", emails)
    if phone: print("   phone:", phone)
    if addr: print("   addr:", list(dict.fromkeys([x for tup in addr for x in tup if x]))[:5])
    for s in ship[:4]: print("   ship:", re.sub(r"\s+"," ", html.unescape(s)).strip()[:150])
