import re, sys

def text(path):
    t = open(path).read()
    t = re.sub(r'<script.*?</script>', ' ', t, flags=re.S)
    t = re.sub(r'<style.*?</style>', ' ', t, flags=re.S)
    t = re.sub(r'<[^>]+>', ' ', t)
    t = re.sub(r'\s+', ' ', t)
    return t

for p in ['shipping', 'about', 'contact']:
    print("="*30, p.upper())
    t = text(f'/tmp/kp_{p}.html')
    # strip repeated nav
    print(t[:2500])
    print()
