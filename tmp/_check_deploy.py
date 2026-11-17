import json, urllib.request

creds = json.load(open('/Users/time4you/.hermes/credentials.json'))
vt = creds['vercel']['token']
pid = creds['vercel']['project_id']
team = creds['vercel']['team_id']

url = f"https://api.vercel.com/v6/deployments?projectId={pid}&teamId={team}&limit=3"
req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + vt})
d = json.load(urllib.request.urlopen(req))
for x in d.get('deployments', []):
    print(x['uid'][:12], x['state'], (x.get('meta', {}) or {}).get('githubCommitSha', '')[:8], x.get('created'))
