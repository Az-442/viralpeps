#!/usr/bin/env python3
import subprocess, os
# og source urls -> output filename without extension (source png)
downloads = [
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-BPC-157-10mg-Research-Peptide-UK.png.png", "src-bpc-157"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-BPC-157-TB-500-10mg-Research-Blend-UK.png.png", "src-bpc-157-tb-500"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-CJC-1295-No-DAC-5mg-Research-Peptide-UK.png-2.png", "src-cjc-1295-no-dac"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-CJC-1295-Ipamorelin-10mg-Research-Blend-UK.png.png", "src-cjc-1295-ipamorelin"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-GHK-Cu-50mg-Research-Peptide-UK.png.png", "src-ghk-cu"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-Ipamorelin-5mg-Research-Peptide-UK.png.png", "src-ipamorelin"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-MOTS-C-10mg-Research-Peptide-UK.png.png", "src-mots-c"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-Retatrutide-10mg-Research-Peptide-UK.png.png", "src-retatrutide"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-Retatrutide-20mg-Research-Peptide-UK.png.png", "src-retatrutide-20mg"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-TB-500-5mg-Research-Peptide-UK.png-2.png", "src-tb-500"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-Tesamorelin-10ml-UK.png", "src-tesamorelin"),
    ("https://spxlabs.co.uk/wp-content/uploads/2026/09/SPX-Labs-Bacteriostatic-Water-10ml-UK.png.png", "src-bacteriostatic-water"),
]
dst = "/Users/time4you/viralpeps/public/images/products/spx-labs"
os.makedirs(dst, exist_ok=True)
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0"
for url, name in downloads:
    outfile = os.path.join(dst, name + ".png")
    r = subprocess.run(["curl","-sL","-A",UA,url,"-o",outfile,"-w","%{http_code}"],capture_output=True,text=True)
    code=r.stdout.strip()
    sz = os.path.getsize(outfile) if os.path.exists(outfile) else 0
    print(f"{name}: HTTP {code} size {sz}")
