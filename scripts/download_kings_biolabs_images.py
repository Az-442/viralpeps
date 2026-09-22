#!/usr/bin/env python3
"""Download the 13 Kings BioLabs product images from their live Webflow CDN.

Guard #3 (image uniqueness) is enforced: every downloaded file must have a
distinct MD5. Any duplicate or HTML-error response fails the run.
"""
import ssl, urllib.request, os, hashlib, subprocess, sys

OUT = '/Users/time4you/viralpeps/public/images/products/kings-bio-labs'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'}

CDN = 'https://cdn.prod.website-files.com/6a87656033956480c122537d/'

# compound-slug -> CDN asset filename
IMAGES = {
    'tesamorelin':                '6a8ae443fcc541cde3475bd7_Tesamorelin-10mg.PNG',
    'bpc-157':                    '6a8ae367cc7cc962db54f758_BPC-157-10mg.PNG',
    'tb-500':                     '6a8ae446b5ae54a09cef0cf5_TB-500-10mg.PNG',
    'ghk-cu':                     '6a8ae44c10c1d2eadf2300a4_GHK-CU-100mg.PNG',
    'mots-c':                     '6a8ae44ace974591e0e1f30f_MOTS-C-40mg.PNG',
    'ss-31':                      '6a8ae450a1641af0c3209e8f_SS-31-10mg.PNG',
    'kpv':                        '6a8ae44b48afd5c51a7b45ac_KVP-10mg.PNG',
    'selank':                     '6a8ae442d72c40621ce44def_Selank-10mg.PNG',
    'dsip':                       '6a8ae154ce974591e0e16805_E9E4A66D-F359-469F-9FC3-A297A43C5897.PNG',
    'nad-plus':                   '6a8ae3ecfcc541cde3475032_NAD%2B-1000mg.PNG',
    'ara-290':                    '6a8ae44948afd5c51a7b457d_ARA-290-10mg.PNG',
    'thymosin-alpha-1':           '6a8ae4443b4e660e254c9e44_Thymosin%20Alphs-10mg.PNG',
    'cjc-1295-ipamorelin-blend':  '6a8ae44d9f5726c823c1c4b1_CJC%201295%2BIpamorelin-10mg.PNG',
}

os.makedirs(OUT, exist_ok=True)
hashes = {}
failed = []

for slug, asset in IMAGES.items():
    url = CDN + asset
    dest_png = os.path.join(OUT, slug + '.png')
    try:
        req = urllib.request.Request(url, headers=UA)
        data = urllib.request.urlopen(req, timeout=30, context=ssl._create_unverified_context()).read()
    except Exception as e:
        failed.append((slug, 'download: ' + str(e)[:60]))
        continue
    if data[:5] in (b'<!DOC', b'<html') or len(data) < 2000:
        failed.append((slug, 'HTML error page or too small (%d bytes)' % len(data)))
        continue
    with open(dest_png, 'wb') as f:
        f.write(data)
    # convert to webp like every other vendor directory (sips can't write webp on this macOS — use ffmpeg)
    dest_webp = os.path.join(OUT, slug + '.webp')
    r = subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', dest_png,
                        '-c:v', 'libwebp', '-quality', '85', dest_webp],
                       capture_output=True)
    if r.returncode != 0 or not os.path.exists(dest_webp):
        failed.append((slug, 'webp conversion failed: ' + r.stderr.decode()[:120]))
        continue
    os.remove(dest_png)
    if open(dest_webp, 'rb').read(4) != b'RIFF':
        failed.append((slug, 'output is not a webp'))
        continue
    h = hashlib.md5(open(dest_webp, 'rb').read()).hexdigest()
    hashes.setdefault(h, []).append(slug)
    print('OK  %-28s %8d bytes  md5=%s' % (slug, os.path.getsize(dest_webp), h[:12]))

print()
print('downloaded:', sum(len(v) for v in hashes.values()), '/', len(IMAGES))
dupes = {h: v for h, v in hashes.items() if len(v) > 1}
if dupes:
    print('!! GUARD 3 FAILED — duplicate image MD5s:')
    for h, v in dupes.items():
        print('   ', h, '->', v)
else:
    print('Guard 3 PASS: all', len(hashes), 'images unique')
if failed:
    print('!! FAILURES:')
    for s, e in failed:
        print('   ', s, '-', e)
    sys.exit(1)
