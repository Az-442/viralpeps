import json, os, urllib.request, ssl, hashlib

os.makedirs('public/images/products/kingston-peptides', exist_ok=True)
os.makedirs('public/images/vendors', exist_ok=True)

# compound-slug -> image url
imgs = {
  "bpc-157": "https://images.kingstonpeptides.com/variants/a791d167-882d-4594-9834-3821f4eb1071/1783372232638-BPC5_A_1to1_PNG.webp",
  "tb-500": "https://images.kingstonpeptides.com/variants/9b00a7bb-96a8-4bcb-9eb5-106cb183342a/1783372411557-TBF10_A_1to1_PNG.webp",
  "ghk-cu": "https://images.kingstonpeptides.com/variants/bc34f1f9-425f-488c-b08b-d0251887b1a1/1783372318735-GHK100_A_1to1_PNG.webp",
  "melanotan-ii": "https://images.kingstonpeptides.com/variants/084d232e-72d3-4f80-9093-b00d03900e9c/1783650707574-MTT10_A_1to1_PNG.webp",
  "selank": "https://images.kingstonpeptides.com/variants/41b869f5-69b8-49f0-966e-fb91166ad798/1783372373965-SLK10_A_1to1_PNG.webp",
  "semax": "https://images.kingstonpeptides.com/variants/a9cb695a-22b5-4c4f-b181-a30f2c571190/1783372388212-SMX10_A_1to1_PNG.webp",
  "retatrutide": "https://images.kingstonpeptides.com/variants/205ac06b-b3ab-4245-b1e1-b18d75f38c5c/1784402758251-RT10_A_1to1_PNG.webp",
  "bacteriostatic-water": "https://images.kingstonpeptides.com/variants/6d897df9-6300-4787-9e79-31c62f84c722/1783372212592-BAC10_A_1to1_PNG.webp",
  "glow": "https://images.kingstonpeptides.com/variants/c7c07c02-4e59-4b1e-96ee-df84dc69899b/1783372354780-GLOW70_A_1to1_PNG.webp",
  "wolverine-stack-bpc157-tb500-blend": "https://images.kingstonpeptides.com/variants/c9738e3a-f2ac-41ba-bcc4-25bd1df3bb45/1783372305051-WLV10_A_1to1_PNG.webp",
}
ctx = ssl._create_unverified_context()
md5s = {}
for slug, url in imgs.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
        data = urllib.request.urlopen(req, timeout=30, context=ctx).read()
        magic = data[:4]
        is_webp = magic == b'RIFF'
        path = f'public/images/products/kingston-peptides/{slug}.webp'
        open(path, 'wb').write(data)
        m = hashlib.md5(data).hexdigest()
        md5s[slug] = m
        print(f"{slug:38s} {len(data):>8d} bytes magic={magic} webp={is_webp} md5={m[:8]}")
    except Exception as e:
        print(f"{slug:38s} ERR {str(e)[:70]}")
print("UNIQUE MD5s:", len(set(md5s.values())), "of", len(md5s))
