import json, os

c = json.load(open('src/data/compounds.json'))
print("=== PeptX exact duplicate entries (identical url+price+dosage) ===")
for comp in c:
    srcs = [s for s in comp.get('sources', []) if 'eptx' in s.get('vendor','').lower()]
    seen = {}
    for i, s in enumerate(srcs):
        key = (s.get('url'), s.get('price'), s.get('dosage'))
        seen.setdefault(key, []).append(i)
    for k, idxs in seen.items():
        if len(idxs) > 1:
            print(f"  {comp['slug']}: {len(idxs)}x identical {k}")

print()
print("=== PeptX compounds in task file vs present ===")
task = """tirzepatide semaglutide retatrutide bpc-157 ghk-cu tesamorelin mots-c ss-31 selank semax
kisspeptin pt-141 nad-plus aod-9604 cagrilintide liraglutide eloralintide kpv sermorelin
ipamorelin dsip mt-1 ahk-cu 5-amino-1mq ara-290 cartalax pe-22-28 mazdutide
thymosin-alpha-1 klow-blend glutathione l-carnitine oxytocin-acetate""".split()
present = set()
for comp in c:
    for s in comp.get('sources', []):
        if 'eptx' in s.get('vendor','').lower():
            present.add(comp['slug'])
print("TASK LIST:", len(task))
print("PRESENT :", len(present))
print("MISSING from compounds.json (PeptX source absent):", sorted(set(task) - present))
print("EXTRA in compounds.json (not in task):", sorted(present - set(task)))
