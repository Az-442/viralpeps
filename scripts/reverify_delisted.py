#!/usr/bin/env python3
"""Re-verify flagged delisted URLs live (follow redirects)."""
import json, time, urllib.request, urllib.error, ssl
from concurrent.futures import ThreadPoolExecutor

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

d = json.load(open('/Users/time4you/viralpeps/scripts/delisted_v3.json'))

BAD_TEXT = ["404", "page not found", "product not found", "not found", "no longer available",
            "discontinued", "has been removed", "doesn't exist", "does not exist"]


def probe(x):
    url = x['url']
    out = dict(x)
    for attempt in range(2):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": UA,
                "Accept": "text/html,application/xhtml+xml",
                "Accept-Language": "en-GB,en;q=0.9",
            })
            with urllib.request.urlopen(req, timeout=25, context=ctx) as r:
                body = r.read(400000).decode('utf-8', 'ignore')
                out['final_status'] = r.status
                out['final_url'] = r.geturl()
                low = body.lower()
                title = ''
                if '<title' in low:
                    try:
                        title = body[low.index('<title'):low.index('</title>')+8]
                    except Exception:
                        title = ''
                out['title'] = title[:160]
                out['flag_text'] = [t for t in BAD_TEXT if t in low]
                out['len'] = len(body)
                return out
        except urllib.error.HTTPError as e:
            out['final_status'] = e.code
            out['final_url'] = url
            out['flag_text'] = ['HTTP %d' % e.code]
            return out
        except Exception as e:
            if attempt == 1:
                out['final_status'] = None
                out['final_url'] = url
                out['flag_text'] = ['ERR: %s' % type(e).__name__]
                return out
            time.sleep(3)


with ThreadPoolExecutor(max_workers=8) as ex:
    res = list(ex.map(probe, d))

json.dump(res, open('/Users/time4you/viralpeps/scripts/delisted_reverify.json', 'w'), indent=1)

from collections import Counter
print("status counts:", Counter(r.get('final_status') for r in res))
for r in res:
    st = r.get('final_status')
    mark = ''
    if st in (404, 410):
        mark = 'CONFIRMED-GONE'
    elif st is None:
        mark = 'ERROR-SKIP'
    elif r.get('final_url') != r['url']:
        mark = 'REDIRECTED'
    else:
        mark = 'LIVE-CHECK'
    print(f"{str(st):5s} {mark:16s} {r['vendor']:22s} {r['slug'][:28]:28s} {r['url'][:80]}")
