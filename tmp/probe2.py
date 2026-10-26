import json
from concurrent.futures import ThreadPoolExecutor
import requests

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
    "Referer": "https://www.google.com/",
}

data = json.load(open("/Users/time4you/viralpeps/src/data/compounds.json"))
hosts = {}
for c in data:
    for s in c.get("sources", []):
        u = s.get("url") or ""
        if u.startswith("http"):
            hosts.setdefault(u.split("/")[2], u)


def probe(item):
    host, url = item
    try:
        r = requests.get(url, headers=HEADERS, timeout=30, allow_redirects=True)
        return host, r.status_code
    except Exception as e:
        return host, type(e).__name__


with ThreadPoolExecutor(max_workers=10) as ex:
    res = list(ex.map(probe, list(hosts.items())))

ok = sorted([h for h, c in res if c == 200])
json.dump(ok, open("/Users/time4you/viralpeps/tmp/ok_hosts2.json", "w"), indent=1)
print(f"reachable {len(ok)} / {len(res)}")
print("STILL FAILING:")
for h, c in sorted(res):
    if c != 200:
        print(f"   {str(c):18} {h}")
