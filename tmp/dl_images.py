import urllib.request, os
from PIL import Image

BASE = "https://www.testedpeptides.co.uk/wp-content/uploads"
OUT = "public/images/products/tested-peptides"
os.makedirs(OUT, exist_ok=True)
os.makedirs("tmp/img", exist_ok=True)

MAP = [
    # (compound slug, remote filename path)
    ("bpc-157",                 "2026/04/bpc157_10mg_vial.png"),
    ("tb-500",                  "2026/04/tb500_10mg_vial.png"),
    ("ghk-cu",                  "2026/04/ghk-cu_100mg_vial.png"),
    ("epitalon",                "2026/04/epitalon_10mg_vial.png"),
    ("igf-1-lr3",               "2026/04/igf-1_lr3_1mg_vial.png"),
    ("ss-31",                   "2025/09/Add-a-heading-76.png"),
    ("aod9604",                 "2025/09/Add-a-heading-77.png"),
    ("dsip",                    "2025/09/Add-a-heading-57.png"),
    ("cjc-1295-no-dac",         "2025/09/Add-a-heading-85.png"),
    ("ghrp-6",                  "2025/09/Add-a-heading-84.png"),
    ("kpv",                     "2025/09/Add-a-heading-75.png"),
    ("mots-c",                  "2025/07/Add-a-heading-68.png"),
    ("nad-plus",                "2025/07/Add-a-heading-90.png"),
    ("ipamorelin",              "2025/09/Add-a-heading-70-1.png"),
    ("follistatin-344",         "2026/04/follistatin_344_1mg_vial.png"),
    ("cjc-1295-with-dac",       "2025/07/Add-a-heading-86.png"),
    ("kisspeptin-10",           "2025/11/Add-a-heading-100.png"),
    ("5-amino-1mq",             "2026/02/Add-a-heading-2026-02-22T193744.390.png"),
    ("glutathione",             "2026/02/Add-a-heading-2026-02-22T214254.613.png"),
    ("ll-37",                   "2025/09/Add-a-heading-74.png"),
    ("cjc-1295-ipamorelin-blend","2025/09/Add-a-heading-87.png"),
    ("bacteriostatic-water",    "2025/07/Add-a-heading-81.png"),
]

ok, fail = 0, []
for slug, relpath in MAP:
    url = f"{BASE}/{relpath}"
    raw = f"tmp/img/{slug}.raw"
    outfile = os.path.join(OUT, f"{slug}.webp")
    try:
        with urllib.request.urlopen(url, timeout=60) as r:
            data = r.read()
        with open(raw, "wb") as f:
            f.write(data)
        img = Image.open(raw).convert("RGB")
        # resize to reasonable max dimension (keep aspect)
        img.thumbnail((800, 800), Image.Resampling.LANCZOS)
        img.save(outfile, "WEBP", quality=88)
        print(f"OK {slug} -> {os.path.getsize(outfile)} bytes")
        ok += 1
    except Exception as e:
        print(f"FAIL {slug}: {e}")
        fail.append(slug)

print(f"\nDONE: {ok} ok, {len(fail)} failed -> {fail}")
