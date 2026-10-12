import re, html, glob, os
for f in sorted(glob.glob('/tmp/art_*.html')):
    t = open(f).read()
    m = re.search(r'<article[^>]*>(.*?)</article>', t, re.S)
    body = m.group(1) if m else t
    body = re.sub(r'<script.*?</script>', '', body, flags=re.S)
    body = re.sub(r'<style.*?</style>', '', body, flags=re.S)
    body = re.sub(r'<[^>]+>', ' ', body)
    body = html.unescape(body)
    print(os.path.basename(f), '->', len([w for w in body.split() if w]), 'words (rendered <article>)')
