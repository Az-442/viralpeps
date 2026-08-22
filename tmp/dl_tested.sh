#!/bin/bash
# Download Tested Peptides product images + vendor logo, convert to webp
set -e
cd /Users/time4you/viralpeps
BASE="https://www.testedpeptides.co.uk/wp-content/uploads"
OUT="public/images/products/tested-peptides"
mkdir -p "$OUT" tmp/img

# Convert via sips helper
dl() {
  local url="$1" name="$2" outfile="$3"
  local tmp="tmp/img/${name}.raw"
  curl -sL "$url" -o "$tmp"
  if [ ! -s "$tmp" ]; then echo "EMPTY: $name"; return 1; fi
  # convert to webp
  sips -s format webp "$tmp" --out "$outfile" >/dev/null 2>&1
  echo "OK: $name -> $outfile ($(stat -f%z "$outfile") bytes)"
}

dl "$BASE/2026/04/bpc157_10mg_vial.png"        bpc157        "$OUT/bpc-157.webp"
dl "$BASE/2026/04/tb500_10mg_vial.png"         tb500         "$OUT/tb-500.webp"
dl "$BASE/2026/04/ghk-cu_100mg_vial.png"       ghkcu100      "$OUT/ghk-cu.webp"
dl "$BASE/2026/04/epitalon_10mg_vial.png"      epitalon      "$OUT/epitalon.webp"
dl "$BASE/2026/04/igf-1_lr3_1mg_vial.png"      igf1lr3       "$OUT/igf-1-lr3.webp"
dl "$BASE/2025/09/Add-a-heading-76.png"        ss31          "$OUT/ss-31.webp"
dl "$BASE/2025/09/Add-a-heading-77.png"        aod9604       "$OUT/aod9604.webp"
dl "$BASE/2025/09/Add-a-heading-57.png"        dsip          "$OUT/dsip.webp"
dl "$BASE/2025/09/Add-a-heading-85.png"        cjcnodac      "$OUT/cjc-1295-no-dac.webp"
dl "$BASE/2025/09/Add-a-heading-84.png"        ghrp6         "$OUT/ghrp-6.webp"
dl "$BASE/2025/09/Add-a-heading-75.png"        kpv           "$OUT/kpv.webp"
dl "$BASE/2025/07/Add-a-heading-68.png"        motsc         "$OUT/mots-c.webp"
dl "$BASE/2025/07/Add-a-heading-90.png"        nad           "$OUT/nad-plus.webp"
dl "$BASE/2025/09/Add-a-heading-70-1.png"      ipamorelin    "$OUT/ipamorelin.webp"
dl "$BASE/2026/04/follistatin_344_1mg_vial.png" follistatin  "$OUT/follistatin-344.webp"
dl "$BASE/2025/07/Add-a-heading-86.png"        cjcdac        "$OUT/cjc-1295-with-dac.webp"
dl "$BASE/2025/11/Add-a-heading-100.png"       kisspeptin    "$OUT/kisspeptin-10.webp"
dl "$BASE/2026/02/Add-a-heading-2026-02-22T193744.390.png" 5amino1mq "$OUT/5-amino-1mq.webp"
dl "$BASE/2026/02/Add-a-heading-2026-02-22T214254.613.png" gluta600 "$OUT/glutathione.webp"
dl "$BASE/2025/09/Add-a-heading-74.png"        ll37          "$OUT/ll-37.webp"
dl "$BASE/2025/09/Add-a-heading-87.png"        cjcipam       "$OUT/cjc-1295-ipamorelin-blend.webp"
dl "$BASE/2025/07/Add-a-heading-81.png"        bacwater      "$OUT/bacteriostatic-water.webp"

echo "ALL DONE"
