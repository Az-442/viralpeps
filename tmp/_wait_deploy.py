import json, urllib.request, time

creds = json.load(open('/Users/time4you/.hermes/credentials.json'))
vt = creds['vercel']['token']
pid = creds['vercel']['project_id']
team = creds['vercel']['team_id']

url = f"https://api.vercel.com/v6/deployments?projectId={pid}&teamId={team}&limit=1"
for i in range(30):
    req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + vt})
    d = json.load(urllib.request.urlopen(req))
    dep = d['deployments'][0]
    print(i, dep['uid'][:12], dep['state'], end=' ')
    if dep['state'] in ('READY', 'ERROR'):
        print()
        break
    print()
    time.sleep(10)
