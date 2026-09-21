#!/usr/bin/env python3
import re
for fn in ['/tmp/spx_cart.html','/tmp/spx_account.html']:
    raw = open(fn, encoding='utf-8', errors='ignore').read()
    found=set()
    for kw in ['Stripe','stripe','PayPal','Paypal','WooPayments','Visa','Mastercard','Amex','Klarna','Apple Pay','ApplePay','Google Pay','GooglePay','card','woocommerce_payment','wc-stripe','bank transfer','BACS','Check payments']:
        pats = [re.escape(kw), kw.lower()]
        for m in re.finditer(re.escape(kw), raw, re.I):
            i=m.start()
            seg=re.sub(r'\s+',' ',raw[max(0,i-80):i+120])
            if 'var(--' in seg or 'variant-st' in seg.lower(): continue
            found.add((kw, seg[:200]))
            break
    print(f"### {fn}  ({len(found)} unique)")
    for kw,seg in sorted(found):
        print("  -", kw, ":", seg[:170])
