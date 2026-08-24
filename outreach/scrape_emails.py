#!/usr/bin/env python3
"""Scrape contact emails from supplier sites. Fetches homepage + /contact page."""
import json, re, subprocess, concurrent.futures, time

EMAIL_RE = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
SKIP = re.compile(r'\b(sentry|wixpress|example|test|noreply|no-reply|email\.com|yourname|info@example|godaddy|schema|domain\.com|\.png|\.jpg|\.svg|@2x|\.webp|\.gif)\b', re.I)

def fetch(url, timeout=15):
    try:
        r = subprocess.run(
            ["curl", "-sL", "--max-time", str(timeout), "-A",
             "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
             url], capture_output=True, text=True)
        return r.stdout
    except Exception:
        return ""

def home_email(site, name):
    found = {}
    candidates = [site.rstrip('/') + '/', site.rstrip('/') + '/contact', site.rstrip('/') + '/contact-us', site.rstrip('/') + '/pages/contact-us', site.rstrip('/') + '/about']
    seen_dom = set()
    for u in candidates:
        html = fetch(u)
        if not html:
            continue
        for m in EMAIL_RE.findall(html):
            if SKIP.search(m):
                continue
            m = m.lower()
            dom = m.split('@')[1]
            # avoid the privacy/support pixel domains
            if dom in ('wixpress.com','godaddy.com','sentry.io','2x.png'):
                continue
            if 'schema.org' in m: continue
            found.setdefault(m, u)
        time.sleep(0.4)
    if not found:
        return ""
    # prefer a non-generic one containing the brand, else first
    brand = name.lower().replace(' ','')
    for em in found:
        if brand[:5] in em or brand in em:
            return em
    # return most common
    return list(found.keys())[0]

def main():
    d = json.load(open('/Users/time4you/viralpeps/src/data/vendors.json'))
    vendors = d if isinstance(d, list) else d.get('vendors', d)
    results = {}
    # sequential to be gentle + capture rate limits
    for x in vendors:
        nm = x.get('name',''); site = x.get('website','')
        if not site:
            results[nm] = ""; continue
        em = home_email(site, nm)
        results[nm] = em
        print(f"{nm}: {em}")
        time.sleep(0.6)
    json.dump(results, open('/tmp/supplier_emails.json','w'), indent=2)
    print("\nDONE", len(results))

if __name__ == "__main__":
    main()
