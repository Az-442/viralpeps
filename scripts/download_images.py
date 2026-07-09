#!/usr/bin/env python3
"""Download product images for Peptigen Labs and Premio Peptides."""
import urllib.request
import os
import time

IMG_DIR = '/Users/time4you/viralpeps/public/images/products'

# ============================================================
# Peptigen Labs images
# ============================================================
peptigen_images = {
    'ghk-cu-50mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-GHKCU-50/68f1966e02dc434a8cd852fa3f90bbac.png',
    'mots-c-10mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-MOTS-10/5a229309c65a45fcb3021f9c4416dabf.png',
    'semax-10mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-SMX-10/93990127077d451089de746afa57dd85.png',
    'semax-5mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-SMX-5/b8ef07f7eb834da4bf11a08a0c0ebbf2.png',
    'bpc-157-10mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-BPC-10/bf53b4e4612e40ffaef050dcf1386ac6.png',
    'retatrutide-10mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-RET-10/ab0e3800ee1841eb8935cd1ae0169ed4.png',
    'retatrutide-20mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-RET-20/9c7792e0c6544b32b2598a6d43daae51.png',
    'retatrutide-30mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-RET-30/e5707a2aaeee4f979cdeeb834b669104.png',
    'epitalon-10mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-EPI-10/bd64d484c0f349c1b4647933d3d3bd39.png',
    'ipamorelin-5mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-IPA-5/5b8ece1339a1438a9036e9ee23b2cebf.png',
    'nad-plus-500mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-NAD-500/ba5668578fd94d40b711a492af4c0f55.png',
    'slu-pp-332-5mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-SLU-5/a3e55f1ddaf0468c896084193efa5ec3.png',
    'tb-500-5mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-TB5-5/ede4edd3d50c4c83bc0d75e79708e656.png',
    'ss-31-10mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-SS31-10/f709b023ab174f2a9db9be97baaa6815.png',
    'kisspeptin-10-10mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-KISS-10/bd372ab1a3584c1e924826a005c1db1b.png',
    'glutathione-600mg.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-GLUT-600/c0b95549a0304d49a67acaf4075f986e.png',
    'bacteriostatic-water-3ml.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-BACT-3/a8ed25c5736c453a81106a87e49f7cde.png',
    'bacteriostatic-water-10ml.png': 'https://peptigenlabs.co.uk/api/img/peptigen/products/PL-BACT-10/a94167089b3d483ca0f3fad0b6fa317c.png',
}

# ============================================================
# Premio Peptides images - Next.js optimized URLs
# ============================================================
premio_images = {
    'bpc-157.png': 'https://premiopeptides.co.uk/generated/bpc-157.webp',
    'tb-500.png': 'https://premiopeptides.co.uk/generated/tb-500.webp',
    'cjc-1295-no-dac.png': 'https://premiopeptides.co.uk/generated/cjc-1295-no-dac.webp',
    'ipamorelin.png': 'https://premiopeptides.co.uk/generated/ipamorelin.webp',
    'tesamorelin.png': 'https://premiopeptides.co.uk/generated/tesamorelin.webp',
    'igf-1-lr3.png': 'https://premiopeptides.co.uk/generated/igf-1-lr3.webp',
    'semax.png': 'https://premiopeptides.co.uk/generated/semax.webp',
    'selank.png': 'https://premiopeptides.co.uk/generated/selank.webp',
    'dsip.png': 'https://premiopeptides.co.uk/generated/dsip.webp',
    'pt-141.png': 'https://premiopeptides.co.uk/generated/pt-141.webp',
    'oxytocin.png': 'https://premiopeptides.co.uk/generated/oxytocin.webp',
    'kisspeptin-10.png': 'https://premiopeptides.co.uk/generated/kisspeptin-10.webp',
    'epitalon.png': 'https://premiopeptides.co.uk/generated/epithalon.webp',
    'nad-plus.png': 'https://premiopeptides.co.uk/generated/nad-plus.webp',
    'glutathione.png': 'https://premiopeptides.co.uk/generated/glutathione.webp',
    'ss-31.png': 'https://premiopeptides.co.uk/generated/ss-31.webp',
    'mots-c.png': 'https://premiopeptides.co.uk/generated/mots-c.webp',
    'thymosin-alpha-1.png': 'https://premiopeptides.co.uk/generated/thymosin-alpha-1.webp',
    'ghk-cu.png': 'https://premiopeptides.co.uk/generated/ghk-cu.webp',
    'melanotan-ii.png': 'https://premiopeptides.co.uk/generated/melanotan-ii.webp',
    'kpv.png': 'https://premiopeptides.co.uk/generated/kpv.webp',
    '5-amino-1mq.png': 'https://premiopeptides.co.uk/generated/5-amino-1mq.webp',
    'follistatin-344.png': 'https://premiopeptides.co.uk/generated/follistatin-344.webp',
    'retatrutide-40mg.png': 'https://premiopeptides.co.uk/generated/retatrutide.jpg',
}

def download_image(url, dest_dir, filename):
    """Download an image from url to dest_dir/filename."""
    os.makedirs(dest_dir, exist_ok=True)
    dest_path = os.path.join(dest_dir, filename)
    
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1000:
        print(f"  SKIP {filename} (already exists)")
        return True
    
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            if len(data) > 500:
                with open(dest_path, 'wb') as f:
                    f.write(data)
                print(f"  OK {filename} ({len(data)} bytes)")
                return True
            else:
                print(f"  TOO SMALL {filename} ({len(data)} bytes)")
                return False
    except Exception as e:
        print(f"  FAIL {filename}: {e}")
        return False

# Download Peptigen Labs images
print("=== Peptigen Labs ===")
peptigen_dir = os.path.join(IMG_DIR, 'peptigen-labs')
success_pep = 0
for fname, url in peptigen_images.items():
    if download_image(url, peptigen_dir, fname):
        success_pep += 1
    time.sleep(0.3)  # Rate limiting
print(f"Downloaded {success_pep}/{len(peptigen_images)} Peptigen Labs images")

# Download Premio Peptides images  
print("\n=== Premio Peptides ===")
premio_dir = os.path.join(IMG_DIR, 'premio-peptides')
success_pre = 0
for fname, url in premio_images.items():
    if download_image(url, premio_dir, fname):
        success_pre += 1
    time.sleep(0.3)
print(f"Downloaded {success_pre}/{len(premio_images)} Premio Peptides images")

print("\nDone!")
