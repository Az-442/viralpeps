import json
d = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json'))
print('valid JSON, compounds:', len(d))
print('total sources:', sum(len(c.get('sources', [])) for c in d))
