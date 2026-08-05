#!/usr/bin/env python3
"""
ViralPeps — Scan external product image URLs, localize broken ones.

Scans all http(s) image references in src/data/compounds.json.
For each external image URL, checks if it returns a valid image (200 + image/* content-type).
Localizes images into public/images/products/<supplier>/ on a per-supplier basis, then
rewrites compounds.json refs to local /images/products/<supplier>/<file>.

Usage: run from repo root:  python3 scripts/fix_broken_images.py
"""
import json, os, re, sys, time, urllib.request, ssl

ROOT = '/Users/time4you/viralpeps'
DATA = os.path.join(ROOT, 'src/data/compounds.json')
IMG_BASE = os.path.join(ROOT, 'public/images/products')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}

def slugify(url):
    """Derive a supplier folder + safe filename from an external URL."""
    netloc = url.split('/')[2] if url.startswith('http') else ''
    domain = netloc.replace('www.', '').split('.')[0]
    supplier = domain.replace('-', '-')
    # last meaningful path segment before query
    path = url.split('?')[0]
    segs = [s for s in path.rstrip('/').split('/') if s]
    fname = segs[-1] if segs else 'image.jpg'
    # sanitize filename
    fname = re.sub(r'[^A-Za-z0-9._-]', '-', fname)
    # de-duplicate: prefix with supplier to avoid collisions
    return supplier, fname

def check(url):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=20, context=ctx) as r:
            ct = r.headers.get('Content-Type', '')
            data = r.read(200000)  # read up to 200KB to validate it's not an error page
            if ct.startswith('image/') and len(data) > 500:
                return True, ct
            return False, ct
    except Exception as e:
        return False, str(e)

def download(url, dest):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=30, context=ctx) as r:
            data = r.read()
            if len(data) > 500:
                with open(dest, 'wb') as f:
                    f.write(data)
                return True
    except Exception as e:
        print(f"    download error for {url}: {e}")
        return False
    return False

def main():
    data = json.load(open(DATA))
    # collect unique external urls
    ext_urls = {}
    for item in data:
        for s in item.get('sources') or []:
            img = s.get('image') or ''
            if str(img).startswith('http'):
                ext_urls.setdefault(str(img), []).append((item, s))

    print(f"Scanning {len(ext_urls)} external image URLs...")
    broken = []
    ok = 0
    for url in sorted(ext_urls.keys()):
        ok_flag, info = check(url)
        if ok_flag:
            ok += 1
        else:
            broken.append((url, info))
            print(f"  BROKEN: {url}  ({info})")
        time.sleep(0.2)

    print(f"\nOK: {ok}  |  BROKEN: {len(broken)}")

    if not broken:
        print("No broken images.")
        return

    print("\nLocalizing broken images...")
    localized = []
    for url, err in broken:
        supplier, fname = slugify(url)
        dest_dir = os.path.join(IMG_BASE, supplier)
        os.makedirs(dest_dir, exist_ok=True)
        # avoid overwrite collisions if same fname
        dest_path = os.path.join(dest_dir, fname)
        n = 1
        while os.path.exists(dest_path):
            stem, ext = os.path.splitext(fname)
            dest_path = os.path.join(dest_dir, f"{stem}-{n}{ext}")
            n += 1
        if download(url, dest_path):
            local_ref = os.path.join('/images/products', supplier, os.path.basename(dest_path)).replace(os.sep, '/')
            localized.append((url, local_ref))
            print(f"  LOCALIZED: {url} -> {local_ref}")
        else:
            print(f"  COULD NOT RE-DOWNLOAD: {url} (will need manual image)")
        time.sleep(0.3)

    # rewrite data
    if localized:
        loc_map = dict(localized)
        rewrites = 0
        for item in data:
            for s in item.get('sources') or []:
                img = s.get('image') or ''
                # strip query string for comparison
                if img in loc_map:
                    s['image'] = loc_map[img]
                    rewrites += 1
        json.dump(data, open(DATA, 'w'), indent=2, ensure_ascii=False)
        print(f"\nRewrote {rewrites} image refs in compounds.json")
    print("\nDone.")

if __name__ == '__main__':
    main()
