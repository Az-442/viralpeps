import json, urllib.request, subprocess

creds = json.load(open('/Users/time4you/.hermes/credentials.json'))
vt = creds['vercel']['token']
pid = creds['vercel']['project_id']
team = creds['vercel']['team_id']

sha = subprocess.run(['git', 'rev-parse', 'HEAD'], cwd='/Users/time4you/viralpeps', capture_output=True, text=True).stdout.strip()
print("HEAD:", sha)

body = {
    "name": "viralpeps",
    "project": pid,
    "target": "production",
    "gitSource": {
        "type": "github",
        "repoId": 1280269739,
        "org": "Az-442",
        "repo": "viralpeps",
        "ref": "main",
        "sha": sha,
    },
}
url = f"https://api.vercel.com/v13/deployments?teamId={team}"
req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={
    'Authorization': 'Bearer ' + vt,
    'Content-Type': 'application/json',
}, method='POST')
try:
    d = json.load(urllib.request.urlopen(req))
    print("created:", d.get('uid', d.get('id', ''))[:12], d.get('status', d.get('state')))
except urllib.error.HTTPError as e:
    print("HTTP", e.code, e.read().decode()[:500])
