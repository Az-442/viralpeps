#!/usr/bin/env python3
import re
raw = open('/tmp/spxlab_home.html', encoding='utf-8', errors='ignore').read()
for kw in ['stripe','Stripe','card ']:
    for m in re.finditer(kw, raw):
        i=m.start()
        seg=raw[max(0,i-120):i+120]
        seg=re.sub(r'\s+',' ',seg)
        print(kw,"...",seg[:240])
        break
