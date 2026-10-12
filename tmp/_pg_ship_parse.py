#!/usr/bin/env python3
import re, html, json
h = open("tmp/_pg_ship.html", encoding="utf-8", errors="ignore").read()
# JSON-LD Organization block
for m in re.finditer(r'<script type="application/ld\+json">([\s\S]*?)</script>', h):
    blk = m.group(1)
    if "PEPTIDE GLOBAL" in blk or "Organization" in blk:
        print("LD:", blk[:1200], "\n")
# body paragraphs
txt = re.sub(r"<script[\s\S]*?</script>", " ", h)
txt = re.sub(r"<style[\s\S]*?</style>", " ", txt)
txt = re.sub(r"<[^>]+>", " ", txt)
txt = html.unescape(re.sub(r"\s+", " ", txt))
for kw in ["deliver","ship","dispatch","track","courier","Royal","DPD","free","international","Europe","UK only","cut-off","cutoff"]:
    for m in re.finditer(r".{80}" + kw + r".{120}", txt, re.I):
        s = m.group(0).strip()
        if "dataLayer" in s: continue
        print("-", s[:220])
        break
