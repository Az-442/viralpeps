import ssl, urllib.request, re

ctx = ssl._create_unverified_context()
UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36')

KW = ["tracked","tracking","royal mail","dpd","dhl","ups","next day","next-day",
      "signed for","delivery notification","free shipping","free delivery","free postage",
      "free uk shipping","free uk delivery","free tracked","free dispatch","free over","ships free"]

for u in ["https://www.kingsbiolabs.co.uk/shipping-returns",
          "https://www.kingsbiolabs.co.uk/faqs",
          "https://www.kingsbiolabs.co.uk/"]:
    req = urllib.request.Request(u, headers={'User-Agent': UA})
    body = urllib.request.urlopen(req, timeout=25, context=ctx).read().decode('utf-8', errors='ignore')
    low = body.lower()
    hits = [k for k in KW if k in low]
    print(f"{u}")
    print(f"   matches: {hits}")
    # show context
    for k in hits[:3]:
        i = low.find(k)
        print(f"   '{k}' -> ...{re.sub(chr(60)+'[^'+chr(62)+']+'+chr(62),' ', body[max(0,i-90):i+110])}...")
    print()
