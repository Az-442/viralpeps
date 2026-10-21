#!/usr/bin/env python3
"""HEAD/GET live check for a list of research URLs; prints status + <title>."""
import sys, re, urllib.request

urls = sys.argv[1:] or [
    "/research/mots-c-suppliers-uk",
    "/research/buy-research-peptides-uk",
    "/research/staircase-of-vial-sizes",
    "/research/kpv-suppliers-uk",
    "/research/retatrutide-vs-survodutide",
    "/research/p21-deep-dive",
    "/research/pt-141-vs-melanotan-ii-uk",
]
BASE = "https://www.viralpeps.co.uk"
for u in urls:
    url = BASE + u if u.startswith("/") else u
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=25) as r:
            html = r.read().decode("utf-8", "replace")
            m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S)
            title = (m.group(1).strip() if m else "(no title)")[:95]
            print(f"{r.status}  {u}\n      {title}\n")
    except Exception as e:
        print(f"ERR  {u}  ->  {e}\n")
