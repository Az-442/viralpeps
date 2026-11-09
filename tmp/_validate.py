import json
old = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json.bak.delisted_20261109_114816'))
new = json.load(open('/Users/time4you/viralpeps/src/data/compounds.json'))
print('compounds before/after:', len(old), '->', len(new))
print('sources before/after:', sum(len(c.get('sources', [])) for c in old), '->', sum(len(c.get('sources', [])) for c in new))
gone_urls = {r['url'] for r in json.load(open('/Users/time4you/viralpeps/scripts/removed_delisted_20261109_114816.json'))}
leftovers = [s['url'] for c in new for s in c.get('sources', []) if s.get('url') in gone_urls]
print('leftover removed urls:', len(leftovers))
# ensure no compound lost all sources
print('empty-source compounds:', [c['slug'] for c in new if not c.get('sources')])
