import re, html, urllib.request

for u in ['buy-kpv-uk','aod-9604-vs-mots-c','recovery-peptide-suppliers-uk']:
    url = 'https://www.viralpeps.co.uk/research/' + u
    with urllib.request.urlopen(url, timeout=60) as r:
        t = r.read().decode('utf-8', 'replace')
    m = re.search(r'<article[^>]*>(.*?)</article>', t, re.S)
    body = m.group(1) if m else t
    body = re.sub(r'<script.*?</script>', '', body, flags=re.S)
    body = re.sub(r'<style.*?</style>', '', body, flags=re.S)
    body = re.sub(r'<[^>]+>', ' ', body)
    body = html.unescape(body)
    print(u, '->', len([w for w in body.split() if w]), 'words (rendered article)')
