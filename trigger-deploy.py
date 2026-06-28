#!/usr/bin/env python3
import os, json, urllib.request, subprocess

token = os.environ.get('VERCEL_TOKEN', '')
if not token:
    print("No VERCEL_TOKEN found")
    exit(1)

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

# Check project
req = urllib.request.Request(
    "https://api.vercel.com/v9/projects/viralpeps",
    headers=headers
)
try:
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read())
    print(f"Project: {data.get('name')}")
    hooks = data.get('deployHooks', [])
    if hooks:
        for h in hooks:
            print(f"Hook: {h.get('name')} -> {h.get('url', '')[-40:]}...")
except Exception as e:
    print(f"Project check failed: {e}")

# Get latest commit
latest = subprocess.run(
    ["git", "rev-parse", "HEAD"],
    capture_output=True, text=True, cwd="/Users/time4you/viralpeps"
).stdout.strip()
print(f"Latest commit: {latest[:12]}")

# Trigger deploy
deploy_data = json.dumps({
    "name": "viralpeps",
    "gitSource": {
        "type": "github",
        "ref": "main",
        "repo": "Az-442/viralpeps",
        "commitSha": latest
    }
}).encode()

req2 = urllib.request.Request(
    "https://api.vercel.com/v13/deployments",
    data=deploy_data,
    headers=headers,
    method="POST"
)
try:
    resp2 = urllib.request.urlopen(req2)
    d = json.loads(resp2.read())
    print(f"Deploy URL: https://{d.get('url', '?')}")
    print(f"State: {d.get('state', '?')}")
    if d.get('errorMessage'):
        print(f"Error: {d['errorMessage']}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"Deploy error {e.code}: {body[:300]}")
except Exception as e:
    print(f"Deploy failed: {e}")
