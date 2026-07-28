import json

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

# FORM Peptides product mapping: compound_slug -> (url, price, dosage_info)
form_products = {
    'aod-9604':       {'url': 'https://formpeptides.co.uk/catalogue/product/aod-9604-5mg',       'price': '£30.00', 'dosage': '5mg'},
    'bpc-157':        {'url': 'https://formpeptides.co.uk/catalogue/product/bpc-157-5mg',        'price': '£16.00', 'dosage': '5mg'},
    'cjc-1295-no-dac':{'url': 'https://formpeptides.co.uk/catalogue/product/cjc-1295-no-dac-5mg','price': '£33.00', 'dosage': '10mg'},
    'dsip':           {'url': 'https://formpeptides.co.uk/catalogue/product/dsip-5mg',            'price': '£25.00', 'dosage': '10mg'},
    'epitalon':        {'url': 'https://formpeptides.co.uk/catalogue/product/epitalon-10mg',       'price': '£18.00', 'dosage': '10mg'},
    'ghk-cu':          {'url': 'https://formpeptides.co.uk/catalogue/product/ghk-cu-50mg',         'price': '£30.00', 'dosage': '50mg'},
    'igf-1-lr3':       {'url': 'https://formpeptides.co.uk/catalogue/product/igf-1-lr3-1mg',      'price': '£40.00', 'dosage': '1mg'},
    'ipamorelin':      {'url': 'https://formpeptides.co.uk/catalogue/product/ipamorelin-5mg',      'price': '£28.00', 'dosage': '10mg'},
    'kisspeptin':      {'url': 'https://formpeptides.co.uk/catalogue/product/kisspeptin-5mg',      'price': '£25.00', 'dosage': '10mg'},
    'kpv':             {'url': 'https://formpeptides.co.uk/catalogue/product/kpv-10mg',            'price': '£20.00', 'dosage': '10mg'},
    'mots-c':          {'url': 'https://formpeptides.co.uk/catalogue/product/mots-c-10mg',         'price': '£25.00', 'dosage': '10mg'},
    'melanotan-ii':    {'url': 'https://formpeptides.co.uk/catalogue/product/melanotan-ii-10mg',   'price': '£15.00', 'dosage': '10mg'},
    'nad-plus':        {'url': 'https://formpeptides.co.uk/catalogue/product/nad-plus-500mg',      'price': '£45.00', 'dosage': '500mg'},
    'pt-141':          {'url': 'https://formpeptides.co.uk/catalogue/product/pt-141-10mg',         'price': '£20.00', 'dosage': '10mg'},
    'retatrutide':     {'url': 'https://formpeptides.co.uk/catalogue/product/retatrutide-10mg',    'price': '£200.00', 'dosage': '50mg'},
    'semax':           {'url': 'https://formpeptides.co.uk/catalogue/product/semax-10mg',          'price': '£20.00', 'dosage': '5mg'},
    'tb-500':          {'url': 'https://formpeptides.co.uk/catalogue/product/tb-500-5mg',          'price': '£25.00', 'dosage': '5mg'},
    'tesamorelin':     {'url': 'https://formpeptides.co.uk/catalogue/product/tesamorelin-5mg',     'price': '£55.00', 'dosage': '10mg'},
    'tirzepatide':     {'url': 'https://formpeptides.co.uk/catalogue/product/tirzepatide-10mg',    'price': '£185.00', 'dosage': '60mg'},
    'selank':          {'url': 'https://formpeptides.co.uk/catalogue/product/selank-5mg',          'price': '£20.00', 'dosage': '5mg'},
    'bacteriostatic-water': {'url': 'https://formpeptides.co.uk/catalogue/product/bacteriostatic-water-3ml', 'price': '£4.00', 'dosage': '3ml'},
}

count = 0
for compound in compounds:
    slug = compound['slug']
    if slug in form_products:
        fp = form_products[slug]
        # Check if FORM Peptides already exists as a source
        existing = [s for s in compound.get('sources', []) if s.get('vendor') == 'FORM Peptides']
        if existing:
            print(f"Already has FORM Peptides: {slug}")
            continue
        
        source_entry = {
            'vendor': 'FORM Peptides',
            'url': fp['url'],
            'price': fp['price'],
            'inStock': True,
            'image': '/images/products/form-peptides/' + slug + '.webp'
        }
        if fp.get('dosage'):
            source_entry['dosage'] = fp['dosage']
        
        if 'sources' not in compound:
            compound['sources'] = []
        compound['sources'].append(source_entry)
        count += 1
        print(f"Added FORM Peptides to: {slug} ({fp['price']})")

with open('src/data/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print(f"\nDone. Added FORM Peptides to {count} compounds.")
