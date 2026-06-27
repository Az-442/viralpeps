#!/bin/bash
# Download product images from Tide Labs

DIR="/Users/time4you/viralpeps/public/images/products/tide-labs"
COMPOUNDS_DIR="/Users/time4you/viralpeps/public/images/products/tide-labs"
mkdir -p "$DIR"

# Mapping of compound slug -> Tide Labs product handle
declare -A HANDLES
HANDLES["bpc-157"]="bpc-157-research-peptide"
HANDLES["tb-500"]="tb-500"
HANDLES["ghrp-2"]="ghrp-2"
HANDLES["aod-9604"]="aod-9604"
HANDLES["cjc-1295"]="cjc-1295-no-dac"
HANDLES["igf-1-lr3"]="igf1-lr3-1mg"
HANDLES["sermorelin"]="sermorelin-grf-1-29-5mg"
HANDLES["mots-c"]="mots-c-research-peptide"
HANDLES["ss-31"]="ss-31-10mg"
HANDLES["ghk-cu"]="ghk-cu"
HANDLES["kpv"]="kpv-5mg-peptide-research"
HANDLES["thymosin-alpha-1"]="thymosin-alpha-1"
HANDLES["epitalon"]="epithalon"
HANDLES["semax"]="semax"
HANDLES["selank"]="selank"
HANDLES["ara-290"]="ara-290-10mg"
HANDLES["fragment-176-191"]="ghrh-fragment-176-191"
HANDLES["hexarelin"]="hexarelin-5mg"
HANDLES["ipamorelin"]="ipamorelin-5mg-peptide-research"
HANDLES["ghrp-6"]="ghrp-6"
HANDLES["pt-141"]="pt-141-bremelanotide-10mg"
HANDLES["kisspeptin-10"]="kisspeptin-10"
HANDLES["bpc-157-tb-500-blend"]="bpc-157-tb-500-blend"
HANDLES["dsip"]="dsip-delta-sleep-peptide"

for slug in "${!HANDLES[@]}"; do
    handle="${HANDLES[$slug]}"
    echo "Processing $slug -> $handle"
    
    # Get the OG image URL
    og_url=$(curl -s "https://tidelabs.co.uk/products/$handle" | grep -oE 'og:image"[^>]*content="[^"]+' | grep -oE 'content="[^"]+' | sed 's/content="//' | head -1)
    
    if [ -n "$og_url" ]; then
        echo "  Found image: $og_url"
        # Download and convert
        output="$DIR/$slug.webp"
        curl -sL "$og_url" -o /tmp/tidelabs_${slug}.jpg
        if [ -f "/tmp/tidelabs_${slug}.jpg" ] && [ -s "/tmp/tidelabs_${slug}.jpg" ]; then
            # Use sips (macOS built-in) to resize and convert
            sips -Z 400 -s formatOptions 85 "/tmp/tidelabs_${slug}.jpg" --out "$output" 2>/dev/null || \
            convert "/tmp/tidelabs_${slug}.jpg" -resize 200x200 -quality 85 "$output" 2>/dev/null || \
            python3 -c "
from PIL import Image
import sys
img = Image.open('/tmp/tidelabs_${slug}.jpg')
img.thumbnail((200, 200))
img.save('$output', 'WEBP', quality=85)
" 2>/dev/null
            if [ -f "$output" ]; then
                echo "  ✓ Saved $output"
            else
                echo "  ✗ Conversion failed for $slug"
            fi
            rm -f "/tmp/tidelabs_${slug}.jpg"
        else
            echo "  ✗ Download failed for $slug"
        fi
    else
        echo "  ✗ No OG image found for $handle"
    fi
done
