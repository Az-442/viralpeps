#!/usr/bin/env python3
"""Per-mg verification of the flagged 'pen' prices (Pillar 8 mg-normalisation)."""
rows = [
 ("mt2", 70.00, 20, 23.49),
 ("glow", 140.00, 140, 64.99),
 ("ghk-cu (pen)", 90.00, 100, 27.99),
 ("klow", 160.00, 160, 79.99),
 ("mots-c (pen)", 140.00, 60, 28.99),
 ("tesamorelin (pen)", 160.00, 20, 46.80),
 ("bpc-157+tb-500 (pen)", 125.00, 40, 50.00),
 ("semax (pen)", 110.00, 20, 26.99),
 ("selank (pen)", 110.00, 20, 25.00),
 ("ipamorelin (pen)", 110.00, 20, 28.00),
]
print(f"{'compound':24s} {'price':>8s} {'mg':>5s} {'£/mg':>8s}   note")
for name, price, mg, med in rows:
    ppm = price/mg
    print(f"{name:24s} {price:8.2f} {mg:5d} {ppm:8.2f}   pen = multi-dose pre-mixed format; vial median is for a single small vial")
print()
print("Vial single-unit £/mg for reference:")
for name, price, mg in [("bpc-157 5mg",24.99,5),("bpc-157 10mg",34.99,10),("mots-c 10mg",26.99,10),
                        ("ghk-cu 50mg",26.99,50),("ghk-cu 100mg",39.99,100),("semax 10mg",34.99,10)]:
    print(f"  {name:16s} {price:7.2f} / {mg:3d}mg = £{price/mg:.2f}/mg")
