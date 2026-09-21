import ssl, urllib.request, re, json, time

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def fetch(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9'})
    r = urllib.request.urlopen(req, timeout=30, context=ctx)
    return r.getcode(), r.read().decode('utf-8', errors='ignore')

EMAIL_RE = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
PHONE_RE = re.compile(r'(?:\+44\s?|0)(?:\d[\s-]?){9,11}')

PAGES = {
 "claripep":   ["https://claripep.co.uk/", "https://claripep.co.uk/contact/", "https://claripep.co.uk/shipping/", "https://claripep.co.uk/delivery/", "https://claripep.co.uk/terms/"],
 "vialverse":  ["https://vialverse.com/", "https://vialverse.com/contact-us", "https://vialverse.com/shipping", "https://vialverse.com/delivery", "https://vialverse.com/terms-and-conditions", "https://vialverse.com/customer-service"],
 "kbl":        ["https://www.kingsbiolabs.co.uk/", "https://www.kingsbiolabs.co.uk/contact", "https://www.kingsbiolabs.co.uk/shipping-returns", "https://www.kingsbiolabs.co.uk/faqs", "https://www.kingsbiolabs.co.uk/terms"],
}

for name, urls in PAGES.items():
    print(f"\n========== {name} ==========")
    for u in urls:
        try:
            code, body = fetch(u)
            emails = sorted(set(e for e in EMAIL_RE.findall(body) if not e.endswith(('.png','.jpg','.webp','.gif'))))[:6]
            # delivery signals
            ship = []
            for kw in ["free delivery","free shipping","free uk delivery","next day","next-day","tracked","royal mail","dpd","evri","24 hours","48 hours","1-2 working","same day","special delivery","£4.99","£3.99","£5.99","uk only","worldwide","international"]:
                if kw.lower() in body.lower():
                    ship.append(kw)
            print(f"  {code} {u}")
            print(f"      emails: {emails}")
            print(f"      ship signals: {sorted(set(ship))}")
        except Exception as e:
            print(f"  ERR {u}: {str(e)[:70]}")
        time.sleep(0.2)
