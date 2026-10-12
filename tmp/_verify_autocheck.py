import json
v=json.load(open('src/data/vendors.json'))
print("total vendors:", len(v))
# count vendors WITH _autoChecks
withchk = [x['slug'] for x in v if x.get('_autoChecks')]
print("vendors with _autoChecks:", len(withchk))
k=[x for x in v if x['slug']=='kingston-peptides'][0]
print("KINGSTON _autoChecks:", json.dumps(k['_autoChecks'], indent=2))
# cache
c=json.load(open('src/data/trustscore-autocheck.json'))
print("cache entries:", len(c))
print("kingston in cache:", 'kingston-peptides' in c)
