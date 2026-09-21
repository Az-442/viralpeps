#!/usr/bin/env python3
import os, re, glob, html as H

d = os.path.dirname(os.path.abspath(__file__))
for f in ["page_company.html", "page_shipping-returns.html", "page_terms-of-service.html", "page_contact.html"]:
    html = open(os.path.join(d, f), encoding="utf-8", errors="replace").read()
    # isolate main / entry content
    m = re.search(r'<main[^>]*>(.*?)</main>', html, re.S)
    core = m.group(1) if m else html
    # strip scripts/styles
    core = re.sub(r'<script.*?</script>', ' ', core, flags=re.S)
    core = re.sub(r'<style.*?</style>', ' ', core, flags=re.S)
    txt = H.unescape(re.sub(r'<[^>]+>', '\n', core))
    txt = re.sub(r'\n{2,}', '\n', txt)
    txt = re.sub(r'[ \t]+', ' ', txt)
    # mail/phone/address kept
    lines = [ln.strip() for ln in txt.splitlines() if ln.strip()]
    # Heuristic: cut boilerplate (nav/footer repeated) — take middle slice of meaningful body
    # Print lines that look like prose about company/shipping/contact
    keep = []
    for ln in lines:
        low = ln.lower()
        if any(k in low for k in ['aegis', 'ltd', 'registered', 'company', 'address', 'email', 'phone', 'whatsapp',
                                  'ship', 'dispatch', 'royal mail', 'tracked', 'delivery', '£', 'refund', 'return',
                                  'contact', 'terms', 'policy', 'research', 'vat', 'unit', 'st', 'street', 'road',
                                  'trustpilot', 'support', 'hour', 'monday', 'friday']):
            keep.append(ln)
    print("################", f, "################")
    print("\n".join(keep[:140]))
    print("\n\n")
