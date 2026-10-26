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
        r = requests.get(url, headers=HEADERS, timeout=25, allow_redirects=True)
        return host, r.status_code
    except Exception:
        return host, 0


with ThreadPoolExecutor(max_workers=12) as ex:
    res = list(ex.map(probe, list(hosts.items())))

ok = sorted([h for h, code in res if code == 200])
json.dump(ok, open("/Users/time4you/viralpeps/tmp/ok_hosts.json", "w"), indent=1)
print(f"reachable: {len(ok)} of {len(res)}")
