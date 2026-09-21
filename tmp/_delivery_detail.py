import ssl, urllib.request, re

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/120 Safari/537.36')

def txt(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9'})
    return urllib.request.urlopen(req, timeout=30, context=ctx).read().decode('utf-8', errors='ignore')

def clean(h):
    h = re.sub(r'<script.*?</script>', ' ', h, flags=re.S|re.I)
    h = re.sub(r'<style.*?</style>', ' ', h, flags=re.S|re.I)
    h = re.sub(r'<[^>]+>', ' ', h)
    h = re.sub(r'&nbsp;', ' ', h)
    h = re.sub(r'&amp;', '&', h)
    return re.sub(r'\s+', ' ', h)

print("===== CLARIPEP shipping =====")
t = clean(txt("https://claripep.co.uk/shipping/"))
for m in re.finditer(r'.{160}(?:Royal Mail|tracked|dispatch|free|£\d).{220}', t, re.I):
    print(" ...", m.group(0).strip()[:420], "\n")

print("\n===== VIALVERSE delivery =====")
t = clean(txt("https://vialverse.com/contact-us"))
for m in re.finditer(r'.{140}(?:free uk delivery|royal mail|tracked|delivery).{220}', t, re.I):
    print(" ...", m.group(0).strip()[:420], "\n")

print("\n===== KBL shipping-returns =====")
t = clean(txt("https://www.kingsbiolabs.co.uk/shipping-returns"))
for m in re.finditer(r'.{120}(?:£4\.99|tracked|delivery|Royal Mail).{200}', t, re.I):
    print(" ...", m.group(0).strip()[:380], "\n")
