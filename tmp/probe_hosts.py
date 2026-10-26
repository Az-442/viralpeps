import json
from concurrent.futures import ThreadPoolExecutor
import requests

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
}

data = json.load(open("/Users/time4you/viralpeps/src/data/compounds.json"))
hosts = {}
for c in data:
    for s in c.get("sources", []):
        u = s.get("url") or ""
        if not u.startswith("http"):
            continue
        host = u.split("/")[2]
        if host not in hosts:
            hosts[host] = u

def probe(item):
    host, url = item
    try:
        r = requests.get(url, headers=HEADERS, timeout=20, allow_redirects=True)
        return host, r.status_code, len(r.text)
    except Exception as e:
        return host, type(e).__name__, str(e)[:60]

with ThreadPoolExecutor(max_workers=12) as ex:
    res = sorted(ex.map(probe, list(hosts.items())))

ok = [r for r in res if r[1] == 200]
print(f"TOTAL HOSTS: {len(res)}  |  200 OK: {len(ok)}")
for h, code, extra in res:
    print(f"{str(code):>12}  {h:<45} {extra}")
