#!/usr/bin/env python3
"""Download product images for Peptides Online UK supplier and the vendor logo."""
import os, urllib.request, ssl, time

BASE = "/Users/time4you/viralpeps/public/images/products/peptides-online-uk"
LOGO_DIR = "/Users/time4you/viralpeps/public/images/vendors"
os.makedirs(BASE, exist_ok=True)
os.makedirs(LOGO_DIR, exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# product fingerprint -> (fullsize_url, dest_filename)
# (derived by stripping the -300x### dimension suffix; og:image pattern confirmed on BPC-157)
products = [
    ("acetic-acid-10ml", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/Acetic-Acid-0.6.png"),
    ("bacteriostatic-water", "https://www.peptidesonline.uk/wp-content/uploads/2026/06/bacteriostatic-water-3ml.webp"),
    ("bpc-157", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/bpc-157-5mg-1.webp"),
    ("cjc-1295-ipamorelin-blend", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/cjc-1295-and-ipamorelin-blend-5mg-5mg-1.webp"),
    ("cjc-1295-no-dac", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/cjc-1295-no-dac-2mg-1.webp"),
    ("cjc-1295-with-dac", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/cjc-1295-with-dac-2mg-1.webp"),
    ("dsip", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/dsip-5mg-1.webp"),
    ("epitalon", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/epithalon-10mg-1.webp"),
    ("ghk-cu", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/ghk-cu-50mg-1.webp"),
    ("ghrp-2", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/ghrp-2-5mg-1.webp"),
    ("ghrp-6", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/ghrp-6-5mg-1.webp"),
    ("glow", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/glow-blend-70mg-1.webp"),
    ("igf-1-lr3", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/igf-1-lr3-1mg-1.webp"),
    ("ipamorelin", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/ipamorelin-5mg-1.webp"),
    ("melanotan-ii", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/melanotan-2-10mg-1.webp"),
    ("mots-c", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/mots-c-10mg-1.webp"),
    ("nad-plus", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/nad-500mg-1.webp"),
    ("pt-141-bremelanotide", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/pt-141-10mg-1.webp"),
    ("semax", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/semax-5mg-1.webp"),
    ("ss-31", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/ss-31-10mg-1.webp"),
    ("tb-500", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/tb-500-2mg-1.webp"),
    ("tesamorelin", "https://www.peptidesonline.uk/wp-content/uploads/2026/07/tesamorelin-2mg-1.webp"),
]

def download(url, dest, is_logo=False):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"})
        data = urllib.request.urlopen(req, context=ctx, timeout=30).read()
        # detect HTML
        head = data[:512].decode("utf-8", errors="ignore").lower()
        if "<html" in head or "<!doctype" in head:
            print(f"HTML BLOCK: {dest} from {url}")
            return False
        with open(dest, "wb") as f:
            f.write(data)
        size = os.path.getsize(dest)
        print(f"OK {size:>8} {dest}")
        return size > 1000
    except Exception as e:
        print(f"FAIL {dest} :: {e}")
        return False

ok = 0
for slug, url in products:
    dest = os.path.join(BASE, f"{slug}.webp")
    if download(url, dest):
        ok += 1
    time.sleep(0.3)

# Logo
logo_dest = os.path.join(LOGO_DIR, "peptides-online-uk.png")
logo_url = "https://www.peptidesonline.uk/wp-content/uploads/2026/07/logo.webp"
if download(logo_url, logo_dest, is_logo=True):
    ok += 1

print(f"\nDONE: {ok}/{len(products)+1} files downloaded")
