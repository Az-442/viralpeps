#!/usr/bin/env python3
import re, html, ssl, urllib.request
ctx = ssl._create_unverified_context()
HDRS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36", "Accept-Language": "en-GB,en;q=0.9"}

def text(u):
    try:
        h = urllib.request.urlopen(urllib.request.Request(u, headers=HDRS), timeout=25, context=ctx).read().decode("utf-8","ignore")
    except Exception as e:
        return f"ERR {e}"
    h = re.sub(r"<script[\s\S]*?</script>"," ",h); h = re.sub(r"<style[\s\S]*?</style>"," ",h)
    h = re.sub(r"<[^>]+>"," ",h)
    return html.unescape(re.sub(r"\s+"," ",h))

for u in ["https://peptideglobal.co.uk/", "https://peptideglobal.co.uk/shipping/", "https://peptideglobal.co.uk/about/"]:
    t = text(u)
    print("==", u)
    for kw in ["payment","pay","card","bank transfer","open banking","crypto","coinbase","klarna","paypal",
               "founded","established","company number","PEPTIDE GLOBAL LTD","registered","dispatch","tracked","24","48",
               "free delivery","free shipping","cutoff","cut-off","2pm","international","worldwide","laboratories"]:
        m = re.search(r".{70}" + re.escape(kw) + r".{90}", t, re.I)
        if m:
            s = re.sub(r"\s+"," ",m.group(0)).strip()
            if "dataLayer" in s or "gtag" in s: continue
            print(f"   [{kw}] ...{s[:200]}")
