#!/usr/bin/env python3
"""kw27: word counts for the three new articles from the rendered HTML."""
import re
import sys

for slug in ["survodutide-suppliers-uk", "buy-epitalon-uk", "follistatin-344-for-muscle-growth"]:
    html = open("/tmp/kw27_%s.html" % slug, encoding="utf-8").read()
    # article body only: between the main article start and the FAQ schema
    body = re.sub(r"<script.*?</script>", " ", html, flags=re.S)
    body = re.sub(r"<style.*?</style>", " ", body, flags=re.S)
    # isolate the <article> if present
    m = re.search(r"<article[^>]*>(.*?)</article>", body, flags=re.S)
    seg = m.group(1) if m else body
    text = re.sub(r"<[^>]+>", " ", seg)
    text = re.sub(r"&[a-z]+;|&#\d+;", " ", text)
    words = [w for w in text.split() if re.search(r"[A-Za-z0-9]", w)]
    print("%-36s %5d words (article text)" % (slug, len(words)))
