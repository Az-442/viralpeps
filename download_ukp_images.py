#!/usr/bin/env python3
"""Download UK Peptides product images and save as compound-slug.webp"""
import json
import os
import urllib.request
import sys

# Directory to save images
OUT_DIR = "/Users/time4you/viralpeps/public/images/products/uk-peptides"
os.makedirs(OUT_DIR, exist_ok=True)

# Load compounds data to verify slugs exist
with open("/Users/time4you/viralpeps/src/data/compounds.json") as f:
    compounds = json.load(f)
compound_slugs = {c["slug"] for c in compounds}

# UK Peptides product mapping: UKP product name -> ViralPeps compound slug
# These are exact product-to-compound matches verified from UKP catalog
image_map = {
    "https://api.ukpeptides.com/static/private-1782046584094-1782046584094-hf_20260621_103915_12dbac8e-a914-43d3-b6fa-734745df8e4a.webp": "bpc-157",
    "https://api.ukpeptides.com/static/private-1782004036657-1782004036657-hf_20260621_004519_989e2974-f8ae-4533-9e24-ef2ff55e0214.webp": "bpc-157-tb-500-blend",
    "https://api.ukpeptides.com/static/private-1782003920987-1782003920987-hf_20260621_010110_394f7973-be9c-4ebb-80ce-e3cfda841f5e.webp": "ghk-cu",
    "https://api.ukpeptides.com/static/private-1782048013093-1782048013092-hf_20260621_131651_601bb754-b2aa-4d93-a4eb-f4d069856817.webp": "ghrp-2",
    "https://api.ukpeptides.com/static/private-1782048035400-1782048035400-hf_20260621_131711_39b44ecf-ccdd-4b3f-8327-c39ad3db4bc8.webp": "melanotan-ii",
    "https://api.ukpeptides.com/static/private-1782048364944-1782048364944-hf_20260621_132252_a6c45e37-22a9-4abc-b46f-b0d3cf4f9b58.webp": "aod-9604",
    "https://api.ukpeptides.com/static/private-1782004527498-1782004527498-hf_20260621_011238_e47e22d2-afdf-43df-900e-a92b8f575d42.webp": "retatrutide",
    "https://api.ukpeptides.com/static/private-1782048473452-1782048473452-hf_20260621_132342_61bea3bb-fbd3-4a77-9e64-26e89d664de2__1_.webp": "cjc-1295",
    "https://api.ukpeptides.com/static/private-1782047930259-1782047930259-hf_20260621_131537_e8a1d253-0c80-45ed-aaa8-1479f0608a0f.webp": "sermorelin",
    "https://api.ukpeptides.com/static/private-1782047955992-1782047955992-hf_20260621_131609_7a47381a-a553-41a6-ab94-0297ce40d468.webp": "kisspeptin-10",
    "https://api.ukpeptides.com/static/private-1782048057932-1782048057932-hf_20260621_131733_6deddbb6-66e9-460e-a96f-0a719e3f72aa.webp": "ghrp-6",
    "https://api.ukpeptides.com/static/private-1782048944024-1782048944024-hf_20260621_133132_d9d00781-d0a6-4eb3-910d-8ec0a0ea4b72.webp": "ipamorelin",
    "https://api.ukpeptides.com/static/private-1782048543695-1782048543694-hf_20260621_132416_ff59e091-4732-473a-936c-16e0cc2fe873.webp": "pt-141-bremelanotide",
    "https://api.ukpeptides.com/static/private-1782048585082-1782048585081-hf_20260621_132458_a9080646-4d9e-459b-938a-59fd9fefe68c.webp": "oxytocin",
    "https://api.ukpeptides.com/static/private-1782049298924-1782049298923-hf_20260621_133711_57a9092c-8f80-4931-97e2-a3ac047e5e54__1___1_.png": "igf-1-lr3",
    "https://api.ukpeptides.com/static/private-1782048966899-1782048966899-hf_20260621_133152_c2f4a70f-38fa-4107-af6a-06d310c33e0e__1_.webp": "tesamorelin",
    "https://api.ukpeptides.com/static/private-1782047659694-1782047659694-hf_20260621_131030_326e9de0-5d16-40bb-934d-70ab85af1294.webp": "kpv",
}

# Verify all target slugs exist in compounds.json
for slug in image_map.values():
    if slug not in compound_slugs:
        print(f"WARNING: slug '{slug}' not found in compounds.json!")

success = 0
failed = 0
for url, slug in image_map.items():
    # Determine file extension from URL
    if url.endswith(".png"):
        ext = ".png"
    else:
        ext = ".webp"
    
    filename = f"{slug}{ext}"
    filepath = os.path.join(OUT_DIR, filename)
    
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
            }
        )
        with urllib.request.urlopen(req, timeout=30) as response:
            data = response.read()
            with open(filepath, "wb") as f:
                f.write(data)
        print(f"✓ {slug} -> {filename} ({len(data)} bytes)")
        success += 1
    except Exception as e:
        print(f"✗ {slug}: {e}")
        failed += 1

print(f"\nDone: {success} downloaded, {failed} failed")
