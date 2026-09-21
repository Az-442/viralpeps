import shutil, os

# target compound slug differs from the vendor's own page slug ->
# symlink/copy so the ProductImage fallback chain resolves on first try.
COPIES = [
 # (vendor dir, source filename, target filename)
 ("vialverse",      "glow-blend.webp",             "glow.webp"),
 ("vialverse",      "klow-blend.webp",             "klow.webp"),
 ("vialverse",      "nad.webp",                    "nad-plus.webp"),
 ("vialverse",      "cjc-1295-ipamorelin.webp",    "cjc-1295-ipamorelin-blend.webp"),
 ("vialverse",      "matrixyl.webp",               "matrixyl-3000.webp"),
 ("vialverse",      "oxytocin.webp",               "oxytocin-acetate.webp"),
 ("kings-bio-labs", "cjc-1295-ipamorelin.webp",    "cjc-1295-ipamorelin-blend.webp"),
]

for d, src, dst in COPIES:
    sp = f"public/images/products/{d}/{src}"
    dp = f"public/images/products/{d}/{dst}"
    if not os.path.exists(sp):
        print(f"MISSING SOURCE {sp}")
        continue
    shutil.copy2(sp, dp)
    print(f"copied {d}/{src} -> {dst}  ({os.path.getsize(dp)}b)")
