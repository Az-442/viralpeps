import json
c = json.load(open('src/data/compounds.json'))
for comp in c:
    if comp['slug'] == 'ghk-cu':
        print("GHK-Cu sources:")
        for s in comp['sources']:
            print(f"  {str(s.get('vendor')):24s} {str(s.get('price')):9s} {str(s.get('dosage','-')):10s} {str(s.get('image',''))[:55]}")
        break
