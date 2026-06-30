import json

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

# Kensington URL corrections: (compound_slug, price) -> correct shop URL
kensington_corrections = {
    ("ghrp-2", None): "https://www.kensingtonlabs.co.uk/product/ghrp-2-acetate-10mg/",
    ("igf-1-lr3", None): "https://www.kensingtonlabs.co.uk/product/igf-1lr3-1mg/",
    ("epitalon", None): "https://kensingtonlabs.co.uk/product/epithalon-10mg/",
    ("ara-290", None): "https://www.kensingtonlabs.co.uk/product/ara_290-10mg/",
    ("hexarelin", None): "https://kensingtonlabs.co.uk/product/hexarelin-acetate-5/",
    ("ghrp-6", None): "https://www.kensingtonlabs.co.uk/product/ghrp-6-acetate-5mg/",
    ("wolverine-stack-bpc157-tb500-blend", None): "https://www.kensingtonlabs.co.uk/product/bpc-157-tb500-blend-10mg/",
    ("bacteriostatic-water", None): "https://kensingtonlabs.co.uk/product/10ml-bacteriostatic-mixing-water/",
    ("ll-37", None): "https://kensingtonlabs.co.uk/product/ll37-5mg/",
    ("ace-031-1mg", None): "https://kensingtonlabs.co.uk/product/ace031-1mg/",
    ("fragment-176-191", None): "https://kensingtonlabs.co.uk/product/hgh-frag-176-191-10mg/",
    ("kisspeptin-10", None): "https://kensingtonlabs.co.uk/product/kisspeptin-10mg/",
}

updates = 0
for c in compounds:
    for s in c.get('sources', []):
        if s.get('vendor') == 'Kensington Labs UK':
            slug = c['slug']
            
            if (slug, None) in kensington_corrections:
                new_url = kensington_corrections[(slug, None)]
                if s['url'] != new_url:
                    s['url'] = new_url
                    updates += 1
                    # get a display name
                    cname = s.get('name', c.get('name', ''))[:25]
                    print(f'  {slug:30s} {cname:25s} -> UPDATED')

print(f'\nUpdated {updates} Kensington URLs')

with open('src/data/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2)
print('Saved compounds.json')
