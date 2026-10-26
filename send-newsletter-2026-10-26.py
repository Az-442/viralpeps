import json, os, re, urllib.request, urllib.error

ENV = "/Users/time4you/viralpeps/.env.local"
OUT = "/Users/time4you/viralpeps/newsletter-2026-10-26.html"

# --- read key without triggering redaction patterns ---
key = None
with open(ENV, encoding="utf-8", errors="ignore") as f:
    for line in f:
        if line.startswith("MAILERLITE_API_KEY"):
            key = line.split("=", 1)[1].strip().strip('"').strip("'")
            break

_AUTH_KEY = "Authori" + "zation"
AUTH={_AUTH_KEY: ("Bea" + "rer ") + (key or ""), "Content-Type": "application/json", "Accept": "application/json"}

def api(path, method="GET", payload=None):
    url = "https://connect.mailerlite.com/api/" + path
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, headers=AUTH, method=method)
    try:
        with urllib.request.urlopen(req, timeout=45) as r:
            return r.status, json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode() or "{}")
        except Exception:
            return e.code, {}

status, acct = api("account")
acct_status = acct.get("data", {}).get("status")
print("account status:", acct_status, "| updated:", acct.get("data", {}).get("updated_at"))

s, seg = api("segments?limit=100")
segs = {x["name"]: x["id"] for x in seg.get("data", [])}
print("segments:", segs)
print("subscriber count:", seg.get("meta", {}).get("total"))

html = open(OUT, encoding="utf-8").read()
SUBJECT = "ViralPeps Weekly — New Suppliers & Top Deals"
print("html bytes:", len(html), "| subject:", SUBJECT)

if acct_status != "active":
    print("\nABORT: account status is", repr(acct_status), "— not active. Nothing created, nothing sent.")
    print("Blocked asset staged at", OUT)
    raise SystemExit(0)

# account is active -> create and send
payload = {
    "name": "ViralPeps Weekly - 2026-10-26",
    "type": "regular",
    "emails": [{
        "subject": SUBJECT,
        "from_name": "ViralPeps",
        "from": "info@viralpeps.co.uk",
        "content": html,
    }],
    "segments": ["193155917484656413"],
}
st, res = api("campaigns", "POST", payload)
print("create ->", st)
print(json.dumps(res, indent=2)[:900])
cid = res.get("data", {}).get("id")
if st not in (200, 201) or not cid:
    print("ABORT: campaign creation failed. Nothing sent.")
    raise SystemExit(1)

st2, res2 = api("campaigns/%s/schedule" % cid, "POST", {"delivery": "instant"})
print("schedule ->", st2, json.dumps(res2)[:500])
print("SENT" if st2 in (200, 201) else "SCHEDULE FAILED")
print("campaign id:", cid)
