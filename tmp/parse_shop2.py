#!/usr/bin/env python3
import re, json, html
raw = open('/tmp/spxlab_shop.html', encoding='utf-8', errors='ignore').read()
# Each product: capture block starting at each product post.
# Better: collect all wp-block-post-title links
products = []
# Split into individual product cards by post-id in class
pattern = re.compile(r'[^>]+><h2[^>]*class="wp-block-post-title[^"]*"[^>]*><a[^>]*href="([^"]+)"[^>]*>(.*?)</a></h2>', re.S)
# Instead, iterate per product card after image cover

# Find each product container start
cards = re.split(r'(?=class="wc-block-product post-)', raw)
for c in cards:
    idm = re.search(r'post-(\d+) ', c)
    if not idm:
        continue
    pid = idm.group(1)
    link = None; name=None
    tm = re.search(r'wp-block-post-title[^>]*><a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', c, re.S)
    if tm:
        link = tm.group(1)
        name = html.unescape(re.sub(r'<[^>]+>','',tm.group(2))).strip()
    if not link:
        lm = re.search(r'href="(https://spxlabs\.co\.uk/product/[^"]+)"', c)
        if lm: link = lm.group(1)
    img=None
    im = re.search(r'<img[^>]+src="([^"]+)"[^>]*>', c)
    if im: img = im.group(1)
    price=None
    pr = re.search(r'woocommerce-Price-amount[^>]*><bdi>(.*?)</bdi>', c, re.S)
    if pr:
        price = html.unescape(re.sub(r'<[^>]+>','',pr.group(1))).strip()
    products.append({'post_id':pid,'name':name,'link':link,'image':img,'price':price})
print(json.dumps(products, indent=2, ensure_ascii=False))
print("TOTAL:", len(products))
