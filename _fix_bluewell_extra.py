import json

c = json.load(open('src/data/compounds.json'))

bluewell_extra = {
    "igf-1-lr3": "https://bluewellpeptides.com/product/igf1-lr3-1mg/",
    "cerebrolysin": "https://bluewellpeptides.com/product/cerebrolysin-60mg/",
    "pinealon": "https://bluewellpeptides.com/product/pinealon-20mg-peptide/",
    "dermorphin": "https://bluewellpeptides.com/product/dermorphin-5mg-peptide/",
    "ll-37": "https://bluewellpeptides.com/product/ll-37-5mg-peptide/",
    "thymalin": "https://bluewellpeptides.com/product/thymalin-10mg-peptide/",
    "aicar": "https://bluewellpeptides.com/product/aicar-50mg-peptide/",
    "pnc-27": "https://bluewellpeptides.com/product/pnc-27-5mg-peptide/",
    "ahk-cu": "https://bluewellpeptides.com/product/ahk-cu-100mg-peptide/",
    "vesugen": "https://bluewellpeptides.com/product/vesugen-20mg-peptide/",
    "adipotide-ftpp-5mg": "https://bluewellpeptides.com/product/fftp-adipotide-5mg-peptide/",
    "5-amino-1mq-50mg": "https://bluewellpeptides.com/product/5-amino-1mq-50mg/",
    "oxytocin": "https://bluewellpeptides.com/product/oxytocin-acetate-10mg-peptide/",
    "klow": "https://bluewellpeptides.com/product/klow-blend-bpc-157-tb-500-kpv-ghk-cu-80mg/",
    "bpc-157-tb-500": "https://bluewellpeptides.com/product/bpc-157-tb-500-20mg-blend/",
    "bpc-157-tb500": "https://bluewellpeptides.com/product/bpc-157-tb-500-20mg-blend/",
    "ghk-cu-50mg": "https://bluewellpeptides.com/product/ghk-cu-50mg-copper-peptide/",
}

fixed = 0
for comp in c:
    for s in comp.get('sources', []):
        slug = comp['slug']
        if s['vendor'] == 'Bluewell Peptides' and slug in bluewell_extra:
            new_url = bluewell_extra[slug]
            if s['url'] != new_url:
                print(f"  Fixing {slug}: {s['url'][:60]} -> {new_url[:60]}")
                s['url'] = new_url
                fixed += 1

json.dump(c, open('src/data/compounds.json', 'w'), indent=2, ensure_ascii=False)
print(f"Fixed additional: {fixed}")

# Check remaining
remaining = []
for comp in c:
    for s in comp.get('sources', []):
        url = s['url']
        if s['vendor'] == 'Anglo Peptides' and not url.startswith('https://anglopeptides.com/product/'):
            remaining.append((s['vendor'], comp['slug'], url[:70]))
        if s['vendor'] == 'Bluewell Peptides' and not url.startswith('https://bluewellpeptides.com/product/'):
            remaining.append((s['vendor'], comp['slug'], url[:70]))
if remaining:
    print(f"Remaining bad URLs: {len(remaining)}")
    for v, slug, url in remaining:
        print(f"  {v}: {slug} -> {url}")
else:
    print("All URLs look correct!")
