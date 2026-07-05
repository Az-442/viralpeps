#!/usr/bin/env python3
"""Fix mismatched and missing downloads for Chroma Peptides."""
import subprocess, os, re

outdir = "/Users/time4you/viralpeps/public/images/products/chroma-peptides"

# Explicit overrides for products that got wrong matches
explicit_mapping = {
    # These got overwritten or wrong
    "cjc-1295-dac": "https://chromapeptides.co.uk/wp-content/uploads/2025/08/CJC-1295-DAC-5-MG_BPC-157-5MG-1024x1024.webp",
    "mt-1-melanotan-1-acetate-10mg": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/mt1-1024x1024.webp",
    "acetic-acid-reconstitution-solvent-10ml": "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Acetic-Acid-0.6-10mL-mockup-1024x1024.webp",
    "snap-8": "https://chromapeptides.co.uk/wp-content/uploads/2026/06/SNAP-8-_-GHK-CU-_Matrixyl_hyaluronic-acid-1024x1024.webp",
}

print("=== Downloading missing/corrected images ===")
for slug, url in sorted(explicit_mapping.items()):
    outpath = os.path.join(outdir, slug + ".webp")
    
    # Try full-res URL first
    full_url = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', url)
    
    result = subprocess.run(
        ['curl', '-sL', '-o', outpath, full_url],
        capture_output=True, text=True
    )
    
    if result.returncode == 0 and os.path.getsize(outpath) > 1000:
        size = os.path.getsize(outpath)
        print(f"  {slug}: {size} bytes - OK")
    else:
        # Try original URL
        result2 = subprocess.run(
            ['curl', '-sL', '-o', outpath, url],
            capture_output=True, text=True
        )
        if result2.returncode == 0:
            size = os.path.getsize(outpath)
            status = "OK" if size > 1000 else "SUSPICIOUS (small)"
            print(f"  {slug}: {size} bytes - {status}")
        else:
            print(f"  {slug}: FAILED")

# Now, cjc-1295-no-dac was downloaded with the DAC image. Need to fix it.
# Re-download the correct image for cjc-1295-no-dac
print("\n=== Re-downloading cjc-1295-no-dac with correct image ===")
no_dac_url = "https://chromapeptides.co.uk/wp-content/uploads/2025/09/CJC-1295-No-DAC_5mg-mockup-1024x1024.webp"
outpath = os.path.join(outdir, "cjc-1295-no-dac.webp")
full_url = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', no_dac_url)
result = subprocess.run(['curl', '-sL', '-o', outpath, full_url], capture_output=True, text=True)
if result.returncode == 0:
    size = os.path.getsize(outpath)
    print(f"  cjc-1295-no-dac: {size} bytes - OK")
else:
    result2 = subprocess.run(['curl', '-sL', '-o', outpath, no_dac_url], capture_output=True, text=True)
    size = os.path.getsize(outpath)
    print(f"  cjc-1295-no-dac: {size} bytes - {'OK' if size > 1000 else 'SMALL'}")

print("\n=== Final Verification ===")
result = subprocess.run(
    ['file'] + [os.path.join(outdir, f) for f in sorted(os.listdir(outdir))],
    capture_output=True, text=True
)
print(result.stdout)

# Count HTML errors
html_count = 0
for f in sorted(os.listdir(outdir)):
    fp = os.path.join(outdir, f)
    with open(fp, 'rb') as fh:
        header = fh.read(1024)
        if b'<!DOCTYPE' in header or b'<html' in header or b'<HTML' in header:
            html_count += 1
            print(f"  HTML content in: {f}")

print(f"\nHTML error pages: {html_count}")
print(f"Total files: {len(os.listdir(outdir))}")
print("=== Done ===")
