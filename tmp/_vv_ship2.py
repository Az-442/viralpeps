import ssl, urllib.request, re

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36')

def clean(u):
    req = urllib.request.Request(u, headers={'User-Agent': UA, 'Accept-Language': 'en-GB,en;q=0.9'})
    h = urllib.request.urlopen(req, timeout=30, context=ctx).read().decode('utf-8', errors='ignore')
    h = re.sub(r'<script.*?</script>', ' ', h, flags=re.S|re.I)
    h = re.sub(r'<style.*?</style>', ' ', h, flags=re.S|re.I)
    h = re.sub(r'<[^>]+>', ' ', h)
    return re.sub(r'\s+', ' ', h.replace('&nbsp;',' ').replace('&amp;','&'))

t = clean("https://vialverse.com/help/delivery")
print("=== VIALVERSE /help/delivery ===")
i = t.lower().find('delivery')
print(t[max(0,i-100): i+2200])
