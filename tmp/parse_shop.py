#!/usr/bin/env python3
import re, json, html
raw = open('/tmp/spxlab_shop.html', encoding='utf-8', errors='ignore').read()

# Find each product block (li.wc-block-product or article)
# Capture name, price (numeric), link, image src + alt
# WooCommerce block shop: each product has:
#  - <h3 class="wc-block-components-product-title">...<a href="LINK">NAME</a>
#  - image: <img ... src="IMG" ... alt="ALT">
#  - price block

# split by product post id markers
blocks = re.split(r'(?=class="wc-block-product post-\d+)', raw)
products = []
for b in blocks:
    pm = re.search(r'post-(\d+) product', b)
    if not pm:
        continue
    pid = pm.group(1)
    # link+title
    tm = re.search(r'<a[^>]+href="([^"]+)"[^>]*>\s*<span[^>]*>([^<]+)</span>', b) or \
         re.search(r'<a[^>]+href="([^"]+)"[^>]*>([^<]{2,60})</a>', b)
    # product link usually rel or dedicated
    title=None; link=None
    # Try to find product title markup
    tm2 = re.search(r'wc-block-components-product-title[^>]*>.*?<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', b, flags=re.S)
    if tm2:
        link = tm2.group(1)
        title = html.unescape(re.sub(r'<[^>]+>','',tm2.group(2))).strip()
    if not link:
        lm = re.search(r'href="(https://spxlabs\.co\.uk/product/[^"]+)"', b)
        if lm:
            link = lm.group(1)
    # image
    img=None; alt=None
    im = re.search(r'<img[^>]+src="([^"]+)"[^>]*>', b)
    if im:
        img = im.group(1)
        am = re.search(r'alt="([^"]*)"', b)
        if am: alt=am.group(1)
    # price
    price=None
    pr = re.search(r'wc-block-components-product-price[^>]*>.*?<bdi>(.*?)</bdi>', b, flags=re.S)
    if not pr:
        pr = re.search(r'<span class="woocommerce-Price-amount[^>]*><bdi>(.*?)</bdi>', b, flags=re.S)
    if pr:
        ps = html.unescape(re.sub(r'<[^>]+>','',pr.group(1)))
        pm2 = re.sub(r'[^0-9.]','',ps)
        price = ps
    products.append({'post_id':pid,'name':title,'link':link,'image':img,'alt':alt,'price':price})

print(json.dumps(products, indent=2))
print("TOTAL:", len(products))
