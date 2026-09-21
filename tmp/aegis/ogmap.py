#!/usr/bin/env python3
import json, os, glob
d = os.path.dirname(os.path.abspath(__file__))
rows = {}
for f in sorted(glob.glob(os.path.join(d, "*.html"))):
    s = os.path.basename(f).replace(".html", "")
    if s == "parse": continue
    html = open(f, encoding="utf-8", errors="replace").read()
    import re
    og = re.search(r'property="og:image"\s+content="([^"]+)"', html)
    rows[s] = og.group(1) if og else None
for k, v in rows.items():
    print(k, "->", v)
