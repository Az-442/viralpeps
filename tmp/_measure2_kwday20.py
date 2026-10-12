#!/usr/bin/env python3
"""Measure candidate titles/subtitles that must fit 395px (dual-vial) and 546px (photo)."""
import os
from PIL import Image, ImageDraw, ImageFont

helvetica = '/System/Library/Fonts/Helvetica.ttc'
tf = ImageFont.truetype(helvetica, 42, index=1)
sf = ImageFont.truetype(helvetica, 22)
card = Image.new('RGB', (1200, 675), 'white')
d = ImageDraw.Draw(card)

print('== DUAL-VIAL: title (42, bold) max 395 ==')
for t in ['Weight Loss Peptides UK', 'Weight Loss Peptides', 'Weight-Loss Peptides UK',
          'Weight Loss Peptides', 'GLP-1 Peptides UK', 'Weight Loss Suppliers UK',
          'Weight Loss Suppliers', 'Peptide Suppliers UK']:
    print('  %-34r %.1f' % (t, d.textlength(t, font=tf)))

print('\n== DUAL-VIAL: subtitle (22) max ~395 (no wrap) ==')
for s in ['Supplier Guide & Prices', 'GLP-1 Supplier Guide', 'Suppliers & Price Guide',
          'Evidence Compared', 'Two Cognitive Peptides', 'Cognitive Peptides Compared',
          'A UK Supplier & Price Guide']:
    print('  %-34r %.1f' % (s, d.textlength(s, font=sf)))

print('\n== PHOTO: title (40, bold) max 546 ==')
for t in ['Cheapest Peptides UK', 'Cheapest Peptides', 'The Cheapest Peptides UK', 'Cheapest Peptides Guide']:
    print('  %-34r %.1f' % (t, d.textlength(t, ImageFont.truetype(helvetica, 40, index=1))))
