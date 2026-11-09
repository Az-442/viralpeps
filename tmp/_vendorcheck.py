#!/usr/bin/env python3
"""Vendor-level health check for vendor groups with 404s."""
import ssl, urllib.request, urllib.error, re, time
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
sites = {
 "BuyReta": "https://www.buyreta.co.uk/product/bpc-157-uk",
 "JGPep+": "https://jgpeptidesplus.com/",
 "Phoenix BioLabs": "https://phoenixbiolabs.net/",
 "XL Peptides": "https://xlpeptides.com/",
 "PeptidesX": "https://www.peptidesx.uk/",
 "SPX Labs": "https://spxlabs.co.uk/",
 "Pyrox Labs": "https://pyroxlabs.co.uk/",
 "VialVerse": "https://vialverse.com/",
 "ThePeptideCode": "https://thepeptidecode.co.uk/products/retatrutide-30mg",
 "Total Peptides": "https://www.totalpeptides.uk/products/glp3",
 "Fat Pig Peptides": "https://fatpigpeptides.co.uk/",
 "Midshire Labs": "https://midshirelabs.co.uk/",
}
for v, u in sites.items():
    for attempt in range(2):
        try:
            req = urllib.request.Request(u, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=25, context=CTX) as r:
                b = r.read(150000).decode("utf-8", "replace")
            txt = re.sub(r"<[^>]+>", " ", b).lower()
            markers = [k for k in ("page not found", "404", "no longer available", "out of stock") if k in txt]
            print(f"{v:18} {r.status} bytes={len(b)} markers={markers}")
            break
        except urllib.error.HTTPError as e:
            print(f"{v:18} HTTPError {e.code}")
            break
        except Exception as e:
            print(f"{v:18} ERR {type(e).__name__}")
            time.sleep(2)
