import ssl, urllib.request, re

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36')

def get(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9'})
    return urllib.request.urlopen(req, timeout=25, context=ctx).read().decode('utf-8', errors='ignore')

# Reproduce the script's navMatch logic on the KBL homepage
home = get("https://www.kingsbiolabs.co.uk")
print("homepage bytes:", len(home))
navMatches = re.findall(r'href=["\']([^"\']*?)?["\'][^>]*>(?:<[^>]+>)*\s*(contact|shipping|faq|terms|notice|disclaimer|privacy|support)\s*', home, re.I)
print("navMatches found:", navMatches)
print()
print("hrefs containing shipping/returns:")
for m in sorted(set(re.findall(r'href="([^"]*)"', home))):
    if any(k in m.lower() for k in ["ship", "return", "faq", "contact", "term"]):
        print("   ", m)
