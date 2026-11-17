import json, urllib.request

creds = json.load(open('/Users/time4you/.hermes/credentials.json'))
vt = creds['vercel']['token']
pid = creds['vercel']['project_id']
team = creds['vercel']['team_id']

url = f"https://api.vercel.com/v9/projects/{pid}/env?teamId={team}"
req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + vt})
d = json.load(urllib.request.urlopen(req))

# find POSTGRES_URL (non-pooling preferred for migrations)
targets = ['POSTGRES_URL_NON_POOLING', 'POSTGRES_URL', 'VIRAL_PEPS_POSTGRES_URL_NON_POOLING', 'VIRAL_PEPS_POSTGRES_URL']
for e in d.get('envs', []):
    if e.get('key') in targets:
        eid = e.get('id')
        dec = f"https://api.vercel.com/v9/projects/{pid}/env/{eid}?teamId={team}&decrypt=true"
        r2 = urllib.request.Request(dec, headers={'Authorization': 'Bearer ' + vt})
        try:
            v = json.load(urllib.request.urlopen(r2)).get('value', '')
            print(e['key'], '=', v)
        except Exception as ex:
            print(e['key'], 'ERR', ex)
