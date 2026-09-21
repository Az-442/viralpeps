import json, os, hashlib
c = json.load(open('src/data/compounds.json'))
print("Claripep image mapping:")
for comp in c:
    for s in comp.get('sources', []):
        if s.get('vendor') == 'Claripep':
            p = 'public' + s.get('image','')
            exists = os.path.exists(p)
            md5 = hashlib.md5(open(p,'rb').read()).hexdigest()[:12] if exists else '-'
            print(f"  {comp['slug']:26s} {str(s.get('price')):8s} {str(s.get('dosage','-')):7s} {s.get('image','')[:52]:54s} {md5}")
print()
print("=== distinct files in claripep dir ===")
d = 'public/images/products/claripep'
for f in sorted(os.listdir(d)):
    p = os.path.join(d, f)
    print(f"  {f:34s} {os.path.getsize(p):8d}  {hashlib.md5(open(p,'rb').read()).hexdigest()[:12]}")
