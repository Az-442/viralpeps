#!/usr/bin/env python3
"""Faster concurrent email scraper - homepage + contact page per site."""
import json, re, subprocess, concurrent.futures, time, sys

EMAIL_RE = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
SKIP_DOM = {'wixpress.com','godaddy.com','sentry.io','2x.png','example.com','test.com','yourdomain.com','domain.com','schema.org'}
SKIP_PAT = re.compile(r'(sentry|wixpress|example|noreply|no-reply|yourname|\.png|\.jpg|\.svg|\.webp|\.gif|\.css|\.js)', re.I)

def fetch(url, timeout=12):
    try:
        r = subprocess.run(
            ["curl", "-sL", "--compressed", "--max-time", str(timeout), "-A",
             "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
             url], capture_output=True, text=True, timeout=timeout+3)
        return r.stdout
    except Exception:
        return ""

def emails_from(html):
    out = set()
    for m in EMAIL_RE.findall(html):
        ml = m.lower()
        dom = ml.split('@')[1]
        if dom in SKIP_DOM: continue
        if SKIP_PAT.search(ml): continue
        out.add(ml)
    return out

def scrape_one(item):
    nm, site = item
    if not site:
        return nm, ""
    base = site.rstrip('/')
    urls = [base + '/']
    # include a contact attempt only if likely
    urls += [base + '/contact', base + '/contact-us', base + '/pages/contact', base + '/about', base + '/pages/contact-us']
    found = set()
    for u in urls:
        html = fetch(u)
        if html:
            found |= emails_from(html)
            # if we hit an email-containing page, stop trying more
            if found:
                break
        time.sleep(0.25)
    # pick a 'support/info/sales' style over obfuscated; prefer shortest-brand matching
    if not found:
        return nm, ""
    brand = nm.lower().replace(' ','').replace('&','')
    ranked = sorted(found, key=lambda e: (0 if brand[:4] in e else 1, e))
    return nm, ranked[0]

def main():
    d = json.load(open('/Users/time4you/viralpeps/src/data/vendors.json'))
    vendors = d if isinstance(d, list) else d.get('vendors', d)
    items = [(v.get('name',''), v.get('website','')) for v in vendors]
    results = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(scrape_one, it): it for it in items}
        done = 0
        for fu in concurrent.futures.as_completed(futs):
            nm, em = fu.result()
            results[nm] = em
            done += 1
            print(f"[{done}/{len(items)}] {nm}: {em or '(none)'}", flush=True)
            sys.stdout.flush()
    json.dump(results, open('/tmp/supplier_emails.json','w'), indent=2)
    found = sum(1 for e in results.values() if e)
    print(f"\nDONE. Found emails for {found}/{len(results)}", flush=True)

if __name__ == "__main__":
    main()
