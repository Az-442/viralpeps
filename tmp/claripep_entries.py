import json
c = json.load(open('src/data/compounds.json'))
name = 'Claripep'
print("Claripep source entries:")
tot = 0
for x in c:
    for s in x.get('sources', []):
        if s.get('vendor') == name:
            tot += 1
            print(f"  {x['slug']:28s} {str(s.get('price')):8s} {str(s.get('dosage','-')):7s} {s.get('url')}")
print("total:", tot)
# The profile page groups variants under parents. Confirm each entry maps to a displayed master.
print()
print("=== master compounds Claripep appears in (what the profile lists) ===")
masters = sorted({x['slug'] for x in c if any(s.get('vendor') == name for s in x.get('sources', []))})
for m in masters:
    print("  ", m)
