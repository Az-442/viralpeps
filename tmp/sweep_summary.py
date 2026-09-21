import json, collections
d = json.load(open('tmp/sitewide_url_sweep.json'))
bad = [x for x in d if x['code'] != 200]
print(f"total URLs swept: {len(d)}")
print(f"non-200: {len(bad)}")
hosts = collections.Counter(x['url'].split('/')[2] for x in bad)
print("\nby host:")
for h, n in hosts.most_common():
    print(f"  {n:4d}  {h}")
codes = collections.Counter(str(x['code']) for x in bad)
print("\nby code:")
for ci, n in codes.most_common():
    print(f"  {n:4d}  {ci}")
