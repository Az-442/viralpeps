#!/usr/bin/env python3
"""Measure text widths for Day-20 cards before generating (per the Day-8/12/18/19 lessons)."""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = '/Users/time4you/viralpeps'
CARD_W, CARD_H = 1200, 675

helvetica = '/System/Library/Fonts/Helvetica.ttc'
title_font = ImageFont.truetype(helvetica, 42, index=1)
sub_font = ImageFont.truetype(helvetica, 22)
body_font = ImageFont.truetype(helvetica, 17)

_card = Image.new('RGB', (CARD_W, CARD_H), 'white')
draw = ImageDraw.Draw(_card)


def vial_layout(paths):
    """Mimic batch_generate_guide_cards text_left math."""
    n = len(paths)
    if n == 1:
        vial = Image.open(paths[0])
        vial_h = int(CARD_H * 0.75)
        vial_w = int(vial_h * vial.width / vial.height)
        text_left = 50 + vial_w + 40
    else:
        vial_h = int(CARD_H * 0.50)
        gap = 18
        start_x = 40
        for pth in paths[:2]:
            v = Image.open(pth)
            vw = int(vial_h * v.width / v.height)
            start_x += vw + gap
        text_left = start_x + 30
    if text_left > CARD_W - 200:
        text_left = CARD_W - 350
    return text_left


print('=== ARTICLE 1: p21-vs-semax (dual vial) ===')
paths = [os.path.join(ROOT, 'public/images/compounds/p21.png'),
         os.path.join(ROOT, 'public/images/compounds/semax-vial.png')]
tl = vial_layout(paths)
avail = CARD_W - tl - 25
print('text_left:', tl, 'available:', avail)
for t in ['P21 vs Semax', 'P21 vs Semax:', 'P21 vs Semax — Two Cognitive Peptides']:
    print('  title %-42r -> %.1f' % (t, draw.textlength(t, font=title_font)))
for s in ['Neurogenesis Hypothesis vs Clinical History', 'P21 vs Semax: Evidence Compared']:
    print('  sub   %-42r -> %.1f' % (s, draw.textlength(s, font=sub_font)))
for b in ['Comparison', 'Head-to-Head']:
    print('  badge %-18r -> %.1f' % (b, draw.textlength(b, font=ImageFont.truetype(helvetica, 13))))

print('\n=== ARTICLE 2: wl suppliers (dual vial: tirzepatide + retatrutide) ===')
paths2 = [os.path.join(ROOT, 'public/images/compounds/tirzepatide-vial.png'),
          os.path.join(ROOT, 'public/images/compounds/retatrutide-vial.png')]
tl2 = vial_layout(paths2)
avail2 = CARD_W - tl2 - 25
print('text_left:', tl2, 'available:', avail2)
for t in ['Weight Loss Peptides UK', 'Weight Loss Peptide Suppliers']:
    print('  title %-42r -> %.1f' % (t, draw.textlength(t, font=title_font)))
for s in ['Suppliers, Prices & Verification Traps', 'GLP-1 Supplier Guide']:
    print('  sub   %-42r -> %.1f' % (s, draw.textlength(s, font=sub_font)))

print('\n=== ARTICLE 3: cheapest (photo base) ===')
# photo composer: panel_w capped at 46% of 1200 = 552, px=38 -> text_left = 38+552+34
tl3 = 38 + int(CARD_W * 0.46) + 34
avail3 = CARD_W - tl3 - 30
print('text_left:', tl3, 'available:', avail3)
for t in ['Cheapest Peptides UK', 'Cheapest Peptides in the UK']:
    print('  title %-42r -> %.1f' % (t, draw.textlength(t, ImageFont.truetype(helvetica, 40, index=1))))
