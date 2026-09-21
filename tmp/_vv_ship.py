import ssl, urllib.request, re, json

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36')

def txt(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9'})
    return urllib.request.urlopen(req, timeout=30, context=ctx).read().decode('utf-8', errors='ignore')

def clean(h):
    h = re.sub(r'<script.*?</script>', ' ', h, flags=re.S|re.I)
    h = re.sub(r'<style.*?</style>', ' ', h, flags=re.S|re.I)
    h = re.sub(r'<[^>]+>', ' ', h)
    h = h.replace('&nbsp;',' ').replace('&amp;','&').replace('&#xE313;','')
    return re.sub(r'\s+', ' ', h)

# find VialVerse shipping page URL from the contact page
c = txt("https://vialverse.com/contact-us")
links = sorted(set(re.findall(r'href="(https://vialverse\.com/[^"]*)"', c)))
print("VV links mentioning ship/term/policy:")
for l in links:
    if any(k in l.lower() for k in ["ship", "deliver", "term", "policy", "refund", "return", "about", "contact"]):
        print("  ", l)
