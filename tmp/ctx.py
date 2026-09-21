#!/usr/bin/env python3
import re
raw = open('/tmp/spxlab_shop.html', encoding='utf-8', errors='ignore').read()
i = raw.find('product/bpc-157-uk-10mg')
print(raw[max(0,i-250):i+450])
