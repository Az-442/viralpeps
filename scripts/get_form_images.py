import re, urllib.request, json, os, sys

BASE = 'https://formpeptides.co.uk'

products = [
    ('aod-9604-5mg', 'aod-9604'),
    ('bpc-157-5mg', 'bpc-157'),
    ('cjc-1295-no-dac-5mg', 'cjc-1295-no-dac'),
    ('dsip-5mg', 'dsip'),
    ('epitalon-10mg', 'epitalon'),
    ('ghk-cu-50mg', 'ghk-cu'),
    ('igf-1-lr3-1mg', 'igf-1-lr3'),
    ('ipamorelin-5mg', 'ipamorelin'),
    ('kisspeptin-5mg', 'kisspeptin'),
    ('kpv-10mg', 'kpv'),
    ('mots-c-10mg', 'mots-c'),
    ('melanotan-ii-10mg', 'melanotan-ii'),
    ('nad-plus-500mg', 'nad-plus'),
    ('pt-141-10mg', 'pt-141'),
    ('retatrutide-10mg', 'retatrutide'),
    ('semax-10mg', 'semax'),
    ('tb-500-5mg', 'tb-500'),
    ('tesamorelin-5mg', 'tesamorelin'),
    ('tirzepatide-10mg', 'tirzepatide'),
    ('selank-5mg', 'selank'),
    ('bacteriostatic-water-3ml', 'bacteriostatic-water'),
]

output_dir = 'public/images/products/form-peptides'
os.makedirs(output_dir, exist_ok=True)

results = {}
for slug, compound in products:
    url = f'https://formpeptides.co.uk/catalogue/product/{slug}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req, timeout=15)
        html = resp.read().decode('utf-8')
        imgs = re.findall(r'<img[^>]+src="([^"]+)"[^>]*>', html)
        main_img = None
        for img in imgs:
            if '/assets/' in img and 'logo' not in img.lower():
                if main_img is None:
                    main_img = img
        results[compound] = main_img
        
        # Download the image
        if main_img:
            ext = '.webp'
            outpath = os.path.join(output_dir, f'{compound}{ext}')
            img_url = BASE + main_img if main_img.startswith('/') else main_img
            try:
                img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                img_data = urllib.request.urlopen(img_req, timeout=15).read()
                with open(outpath, 'wb') as f:
                    f.write(img_data)
                print(f'OK {compound}: {main_img.split("/")[-1]} -> {outpath}')
            except Exception as e2:
                print(f'DL FAIL {compound}: {e2}')
        else:
            print(f'NO IMG {compound}')
    except Exception as e:
        print(f'ERROR {compound}: {e}')

with open('/tmp/form_images.json', 'w') as f:
    json.dump(results, f, indent=2)

print("\nDone. Images downloaded to " + output_dir)
