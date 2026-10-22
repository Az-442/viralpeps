#!/usr/bin/env python3
"""
ViralPeps Weekly Newsletter — send via MailerLite API.

BLOCKED as of 2026-10-05: the MailerLite account is TERMINATED (status=terminated).
POST /api/campaigns returns 403 "Not available on closed or terminated account".

Once the account is reactivated (or a new ESP key is issued and this is ported),
run:  python3 send-newsletter.py
It reads the HTML from newsletter-email.html, creates the campaign, and sends instantly.
"""
import json
import os
import sys
import urllib.request
import urllib.error
from datetime import date

ENV = "/Users/time4you/viralpeps/.env.local"
HTML = "/Users/time4you/viralpeps/newsletter-2026-10-19.html"
SEGMENT = "193155917484656413"  # All Subscribers
API = "https://connect.mailerlite.com/api"


def api_key():
    with open(ENV) as f:
        for line in f:
            if line.startswith("MAILERLITE_API_KEY"):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("MAILERLITE_API_KEY not found in .env.local")


def req(method, path, key, payload=None):
    data = json.dumps(payload).encode() if payload is not None else None
    r = urllib.request.Request(
        API + path,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(r) as resp:
            return resp.status, json.loads(resp.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode() or "{}")


def main():
    key = api_key()

    status, acct = req("GET", "/account", key)
    acct_status = acct.get("data", {}).get("status")
    print(f"Account status: {acct_status}")
    if acct_status != "active":
        print(f"ABORT: account is '{acct_status}', not 'active'. Nothing sent.")
        return 1

    with open(HTML) as f:
        content = f.read()

    today = date.today().isoformat()
    campaign = {
        "name": f"ViralPeps Weekly - {today}",
        "type": "regular",
        "emails": [
            {
                "subject": "ViralPeps Weekly — New Suppliers & Top Deals",
                "from_name": "ViralPeps",
                "from": "info@viralpeps.co.uk",
                "content": content,
            }
        ],
        "segments": [SEGMENT],
    }

    status, out = req("POST", "/campaigns", key, campaign)
    print(f"Create campaign: HTTP {status} -> {json.dumps(out)[:300]}")
    if status >= 300:
        return 1
    cid = out.get("data", {}).get("id")
    print(f"Campaign ID: {cid}")

    status, out = req("POST", f"/campaigns/{cid}/schedule", key, {"delivery": "instant"})
    print(f"Send: HTTP {status} -> {json.dumps(out)[:300]}")
    return 0 if status < 300 else 1


if __name__ == "__main__":
    sys.exit(main())
