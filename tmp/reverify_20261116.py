#!/usr/bin/env python3
"""Verify & remove 2026-11-16 DELISTED products from compounds.json.

Parses the DELISTED section from price_check_20261116.log, re-probes each unique
URL via HTTP (browser UA, follow redirects), and (with --apply) removes source
entries whose URL is confirmed 404/410.
"""
import json, sys, time, urllib.request, urllib.error, ssl
from collections import Counter
from concurrent.futures import ThreadPoolExecutor

BASE = '/Users/time4you/viralpeps'
LOG = f'{BASE}/tmp/price_check_20261116.log'
COMP = f'{BASE}/src/data/compounds.json'
REV_OUT = f'{BASE}/scripts/delisted_reverify_20261116.json'
APPLY = '--apply' in sys.argv

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE


def parse_delisted():
    """Return list of {vendor, compound, url} from the DELISTED summary section."""
    lines = open(LOG, encoding='utf-8', errors='ignore').read().splitlines()
    out = []
    in_sec = False
    for ln in lines:
        if ln.strip() == 'DELISTED (78):':
            in_sec = True
            continue
        if not in_sec:
            continue
        s = ln.strip()
        if not s or s.startswith('ERRORS (') or s.startswith('=== '):
            break
        # format: "  Vendor | Compound | HTTP 404 | url"
        parts = s.split(' | ')
        if len(parts) < 4:
            continue
        vendor = parts[0].strip()
        compound = parts[1].strip()
        url = parts[-1].strip()
        out.append({'vendor': vendor, 'compound': compound, 'url': url})
    return out


def probe(x):
    url = x['url']
    out = dict(x)
    for attempt in range(2):
        try:
            req = urllib.request.Request(url, headers={
                'User-Agent': UA,
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'en-GB,en;q=0.9',
            })
            with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
                body = r.read(300000).decode('utf-8', 'ignore')
                out['final_status'] = r.status
                out['final_url'] = r.geturl()
                low = body.lower()
                out['notfound_text'] = any(t in low for t in
                    ['404', 'page not found', 'product not found', 'no longer available',
                     'has been removed', "doesn't exist", 'does not exist'])
                return out
        except urllib.error.HTTPError as e:
            out['final_status'] = e.code
            out['final_url'] = url
            return out
        except Exception as e:
            if attempt == 1:
                out['final_status'] = None
                out['final_url'] = url
                out['error'] = type(e).__name__
                return out
            time.sleep(3)


def main():
    entries = parse_delisted()
    print(f"parsed {len(entries)} DELISTED entries")

    # dedupe by url, keep first (vendor/compound) for labelling
    seen, uniq = set(), []
    for e in entries:
        if e['url'] in seen:
            continue
        seen.add(e['url'])
        uniq.append(e)
    print(f"unique URLs: {len(uniq)}")

    with ThreadPoolExecutor(max_workers=8) as ex:
        res = list(ex.map(probe, uniq))

    json.dump(res, open(REV_OUT, 'w'), indent=1)

    confirmed = [r for r in res if r.get('final_status') in (404, 410)]
    confirmed_urls = set(r['url'] for r in confirmed)
    # Browser-verified 404 (server drops conn for non-browser clients):
    BROWSER_CONFIRMED = {'https://peptidesnextday.co.uk/product/cjc-1295-mod-grf-1-29-without-dac-2mg/'}
    confirmed_urls |= BROWSER_CONFIRMED
    print(f"(+{len(BROWSER_CONFIRMED)} browser-verified 404 added to confirmed set)")
    live_200 = [r for r in res if r.get('final_status') == 200]
    err = [r for r in res if r.get('final_status') not in (404, 410, 200)]

    print(f"\nconfirmed 404/410: {len(confirmed)}")
    print(f"returned 200 (recovered?): {len(live_200)}")
    print(f"other (timeout/down): {len(err)}")

    if live_200:
        print("\n!! 200 responses (NOT removing these):")
        for r in live_200:
            print(f"   {r['vendor']:20s} {r['compound'][:30]:30s} {r['url']}")
    if err:
        print("\n!! errors (NOT removing):")
        for r in err:
            print(f"   [{r.get('error') or r.get('final_status')}] {r['vendor']:20s} {r['url']}")

    if not APPLY:
        print("\nDRY RUN — no changes written. Re-run with --apply to remove confirmed.")
        return

    comp = json.load(open(COMP))
    before_c = len(comp)
    before_s = sum(len(c.get('sources', [])) for c in comp)

    removed, emptied, new_comp = [], [], []
    for c in comp:
        src = c.get('sources', [])
        keep, drop = [], []
        for s in src:
            if s.get('url') in confirmed_urls:
                drop.append(s)
            else:
                keep.append(s)
        for s in drop:
            removed.append((c.get('slug'), c.get('name'), s.get('vendor'), s.get('price'), s.get('url')))
        if not keep and src:
            emptied.append((c.get('slug'), c.get('name'), sorted(set(s.get('vendor') for s in drop))))
            continue  # drop whole compound
        c['sources'] = keep
        new_comp.append(c)

    after_s = sum(len(c.get('sources', [])) for c in new_comp)
    print(f"\ncompounds: {before_c} -> {len(new_comp)}")
    print(f"sources:   {before_s} -> {after_s}  (removed {before_s - after_s})")
    print(f"\nremoved source entries: {len(removed)}")
    print(f"compounds deleted entirely: {len(emptied)}")
    for e in emptied:
        print("   -", e[0], "|", e[1], "|", e[2])

    print("\nremovals by vendor:")
    for v, n in Counter(r[2] for r in removed).most_common():
        print(f"  {n:3d}  {v}")

    stamp = time.strftime('%Y%m%d-%H%M%S')
    import shutil
    shutil.copy(COMP, f'{BASE}/scripts/compounds.json.bak.{stamp}')
    json.dump(new_comp, open(COMP, 'w'), indent=2, ensure_ascii=False)
    json.dump([{'slug': r[0], 'name': r[1], 'vendor': r[2], 'price': r[3], 'url': r[4]}
               for r in removed],
              open(f'{BASE}/scripts/removed_delisted_{stamp}.json', 'w'), indent=1)
    print(f"\nbackup: scripts/compounds.json.bak.{stamp}")
    print(f"removal log: scripts/removed_delisted_{stamp}.json")


if __name__ == '__main__':
    main()
