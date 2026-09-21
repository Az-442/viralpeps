#!/usr/bin/env python3
import re
raw = open('/tmp/spxlab_shop.html', encoding='utf-8', errors='ignore').read()
i = raw.find('BPC-157 UK 10mg research peptide - SPX Labs', raw.find('data-testid="product-title"', 0) if 'product-title' in raw else 0)
# search for the "add to cart" / h3 title heading after image
i = raw.find('product/bpc-157-uk-10mg', 0)
seg = raw[raw.find('</a>',i):raw.find('</a>',i)+600] if '</a>' in raw[i:] else ''
j = raw.find('</a>', i)
print(raw[j:j+600])
