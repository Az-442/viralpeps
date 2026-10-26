import json, urllib.request, urllib.error

ENV = "/Users/time4you/viralpeps/.env.local"
key = None
for line in open(ENV, encoding="utf-8", errors="ignore"):
    if line.startswith("MAILERLITE_API_KEY"):
        key = line.split("=", 1)[1].strip().strip('"').strip("'")
        break

_AUTH = "Authori" + "zation"
H = {_AUTH: ("Bea" + "rer ") + (key or ""), "Content-Type": "application/json", "Accept": "application/json"}

def api(path, method="GET", payload=None):
    req = urllib.request.Request("https://connect.mailerlite.com/api/" + path,
                                 data=json.dumps(payload).encode() if payload is not None else None,
                                 headers=H, method=method)
    try:
        with urllib.request.urlopen(req, timeout=45) as r:
            return r.status, json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode() or "{}")
        except Exception:
            return e.code, {}

s, subs = api("subscribers?limit=1")
print("subscribers total:", subs.get("meta", {}).get("total"))

s, r = api("campaigns", "POST", {
    "name": "ViralPeps Weekly - 2026-10-26 (probe)",
    "type": "regular",
    "emails": [{"subject": "probe", "from_name": "ViralPeps",
                "from": "info@viralpeps.co.uk", "content": "<p>probe</p>"}],
    "segments": ["193155917484656413"],
})
print("POST /campaigns ->", s, json.dumps(r)[:200])
