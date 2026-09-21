#!/usr/bin/env python3
import re, sys, html
def textify(fn):
    raw = open(fn, encoding='utf-8', errors='ignore').read()
    t = re.sub(r'<script.*?</script>', ' ', raw, flags=re.S)
    t = re.sub(r'<style.*?</style>', ' ', t, flags=re.S)
    t = re.sub(r'<[^>]+>', ' ', t)
    t = html.unescape(t)
    t = re.sub(r'\s+', ' ', t)
    return t

for p in ["shipping-policy","faq","contact","terms-conditions"]:
    print("\n\n######## /"+p+"/ ########")
    t = textify(f"/tmp/spx_{p}.html")
    print(t[:3500])
