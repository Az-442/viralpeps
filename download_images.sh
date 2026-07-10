#!/bin/bash
# Download all product images for new vendors
cd /Users/time4you/viralpeps/public/images/products

# === Raw Peptides ===
RAW_DIR="raw-peptides"
mkdir -p "$RAW_DIR"

# Logo - already saved

# Product images
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2025/08/91a3e459-c031-476d-8981-32c850efea06.jpg" -o "$RAW_DIR/retatrutide-20mg.jpg"
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2025/08/066b4e4e-aff9-40dd-8802-22d44a10a48c.jpg" -o "$RAW_DIR/retatrutide-30mg.jpg"
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2025/08/12bb4406-c113-4559-87a7-63af32216ef4.jpg" -o "$RAW_DIR/retatrutide-40mg.jpg"
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2025/10/Semag30-1.jpg" -o "$RAW_DIR/semaglutide-30mg.jpg"
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2025/10/MOTS-C.png" -o "$RAW_DIR/mots-c-40mg.png"
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2025/10/Peptides_0014_Lo_res-8921.jpg.jpg" -o "$RAW_DIR/glow-70mg.jpg"
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2025/10/Peptides_0021_Lo_res-8909.jpg.jpg" -o "$RAW_DIR/mt2-30mg.jpg"
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2026/06/DSIP.png" -o "$RAW_DIR/dsip-10mg.png"
# Tirzepatide uses same product image for all dosages
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2025/10/ab4e47c1-3473-4c18-be2c-1308d8146c45.jpg" -o "$RAW_DIR/tirzepatide.jpg"
# BPC157+TB500 stack
curl -sL "https://rawpeptides.co.uk/wp-content/uploads/2025/10/bpc157-tb500.jpg" -o "$RAW_DIR/bpc157-tb500.jpg" 2>/dev/null || true

echo "=== Raw Peptides images ==="
ls -la "$RAW_DIR/"

# === ThePeptideCode ===
TPC_DIR="the-peptide-code"
mkdir -p "$TPC_DIR"

# Logo favicon - already saved as logo.jpg

# Product images from all 3 pages
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/BPC-157-10mg.jpg" -o "$TPC_DIR/bpc-157-10mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/BPC-157-TB-500-20mg.jpg" -o "$TPC_DIR/bpc-157-tb500-blend.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/CJC-1295-Ipamorelin.jpg" -o "$TPC_DIR/cjc-1295-ipamorelin.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/Epitalon.jpg" -o "$TPC_DIR/epithalon-10mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/GHK-Cu-100mg-1.jpg" -o "$TPC_DIR/ghk-cu-100mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/a6b6028a-5bdc-48e4-9176-e5b3f2e1079e.png" -o "$TPC_DIR/glow70-pen.png"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/KLOW80.jpg" -o "$TPC_DIR/klow80.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/Melanotan-II-10mg.jpg" -o "$TPC_DIR/melanotan-ii-10mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/06/MOTS-c-10mg.jpg" -o "$TPC_DIR/mots-c-10mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/06/MOTS-c-40mg.jpg" -o "$TPC_DIR/mots-c-40mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/Nad-0001-nad-1000mg.png" -o "$TPC_DIR/nad-1000mg.png"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/06/Reta-10-Pen.jpg" -o "$TPC_DIR/retatrutide-10mg-pen.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/retaa0001-retatrutide-30mg.jpg" -o "$TPC_DIR/retatrutide-20mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/06/Reta-20.png" -o "$TPC_DIR/retatrutide-20mg-pen.png"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/06/Reta-30-Box.png" -o "$TPC_DIR/retatrutide-30mg.png"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/06/Reta-40-Pen-1.webp" -o "$TPC_DIR/retatrutide-40mg-pen.webp"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/selan-00001-selank-10mg.png" -o "$TPC_DIR/selank-10mg.png"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/semax.jpg" -o "$TPC_DIR/semax-10mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/Sermorelin-10.jpg" -o "$TPC_DIR/sermorelin-10mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/07/Sermorelin-5mg.jpg" -o "$TPC_DIR/sermorelin-5mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/ss31-0001-ss31-10mg.png" -o "$TPC_DIR/ss31-10mg.png"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/TESA-2-tesamorelin-10mg.jpg" -o "$TPC_DIR/tesamorelin-10mg.jpg"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/ChatGPT-Image-Mar-8-2026-10_13_56-PM.png" -o "$TPC_DIR/tirzepatide-20mg.png"
curl -sL "https://thepeptidecode.co.uk/wp-content/uploads/2026/05/Tirzepatide-30mg.jpg" -o "$TPC_DIR/tirzepatide-30mg.jpg"

echo "=== ThePeptideCode images ==="
ls -la "$TPC_DIR/"
echo "All downloads complete!"
