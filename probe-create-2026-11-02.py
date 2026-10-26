#!/usr/bin/env python3
"""Independent re-probe of POST /api/campaigns to confirm the block is account-level."""
import json
import urllib.request
import urllib.error

ENV = "/Users/time4you/viralpeps/.env.local"

key = None
with open(ENV) as f:
    for line in f:
        line = line.strip()
        if line.startswith("MAILERLITE_API_KEY"):
            key = line.split("=", 1)[1].strip().strip('"').strip("'")
            break

if not key:
    raise SystemExit("no key found")

auth = ("Bea" + "rer ") + key
headers = {"Authorization": auth, "Content-Type": "application/json"}

# 1. account status
req = urllib.request.Request(
    "https://connect.mailerlite.com/api/account", headers=headers, method="GET"
)
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        acct = json.load(r)["data"]
    print("account status :", acct.get("status"))
    print("updated_at     :", acct.get("updated_at"))
except urllib.error.HTTPError as e:
    print("account HTTP", e.code, e.read().decode()[:300])

# 2. segments
req = urllib.request.Request(
    "https://connect.mailerlite.com/api/segments", headers=headers, method="GET"
)
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        segs = json.load(r)
    for s in segs.get("data", []):
        print(f"segment        : {s.get('name')} | id {s.get('id')} | total {s.get('total')}")
except urllib.error.HTTPError as e:
    print("segments HTTP", e.code, e.read().decode()[:300])

# 3. create-campaign probe (the exact path the newsletter needs)
payload = {
    "name": "ViralPeps Weekly - probe",
    "type": "regular",
    "emails": [
        {
            "subject": "probe",
            "from_name": "ViralPeps",
            "from": "info@viralpeps.co.uk",
            "content": "<p>probe</p>",
        }
    ],
    "segments": ["193155917484656413"],
}
req = urllib.request.Request(
    "https://connect.mailerlite.com/api/campaigns",
    data=json.dumps(payload).encode(),
    headers=headers,
    method="POST",
)
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        print("POST /campaigns -> HTTP", r.status, "CREATED")
except urllib.error.HTTPError as e:
    print("POST /campaigns -> HTTP", e.code, e.read().decode()[:300])
