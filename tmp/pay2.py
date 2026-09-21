#!/usr/bin/env python3
import re
for fn in ['/tmp/spx_terms-conditions.html','/tmp/spx_refund.html']:
    raw = open(fn, encoding='utf-8', errors='ignore').read()
    print(f"### {fn}")
    for kw in ['Stripe','stripe','PayPal','paypal','card','Visa','Mastercard','bank','checkout','Apple Pay','Google Pay','Debit','Credit']:
        for m in re.finditer(re.escape(kw), raw, re.I):
            i=m.start()
            seg=re.sub(r'\s+',' ',raw[max(0,i-100):i+150])
            if 'stripe' in kw.lower():
                # skip css or generic 'stripe'
                if 'var(--' in seg or 'variant-stripe' in seg.lower(): continue
            print("  ...", seg[:250])
            break
