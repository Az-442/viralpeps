#!/usr/bin/env python3
import sys, re
html = open('/tmp/spxlab_home.html', encoding='utf-8', errors='ignore').read()
# Strip scripts/styles/tags
t = re.sub(r'<script.*?</script>', ' ', html, flags=re.S)
t = re.sub(r'<style.*?</style>', ' ', t, flags=re.S)
t = re.sub(r'<[^>]+>', ' ', t)
t = re.sub(r'\s+', ' ', t)
print(t[:4000])
