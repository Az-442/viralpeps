import json, collections
d = json.load(open('tmp/sitewide_url_sweep.json'))
bad = [x for x in d if x['code'] != 200]

# Distinguish real 404s from bot blocks
real404 = [x for x in bad if '404' in str(x['code']) or '404' in str(x['title'])]
blocked = [x for x in bad if '403' in str(x['title']) or '403' in str(x['code'])]
other   = [x for x in bad if x not in real404 and x not in blocked]

print(f"real 404s : {len(real404)}")
print(f"403 blocks: {len(blocked)}")
print(f"other errs: {len(other)}")

print("\n=== REAL 404 URLs (dead pages) by host ===")
h = collections.Counter(x['url'].split('/')[2] for x in real404)
for k, n in h.most_common():
    print(f"  {n:4d}  {k}")

print("\n=== other error kinds ===")
oe = collections.Counter(str(x['title'])[:60] for x in other)
for k, n in oe.most_common(12):
    print(f"  {n:4d}  {k}")
