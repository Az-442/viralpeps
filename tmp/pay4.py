#!/usr/bin/env python3
import re
for fn in ['/tmp/spx_cart.html']:
    raw = open(fn, encoding='utf-8', errors='ignore').read()
    for m in re.finditer(r'(wc-payment-method-[a-z0-9_-]+|payment-method-[a-z0-9_-]+|wc-stripe|woocommerce-gateway)', raw):
        i=m.start()
        print(re.sub(r'\s+',' ',raw[max(0,i-40):i+90]))
        print('---')
