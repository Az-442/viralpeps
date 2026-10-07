#!/usr/bin/env python3
"""Verify PMIDs via NCBI esummary (title/journal/author)."""
import json, sys, urllib.request, time

PMIDS = sys.argv[1:] if len(sys.argv) > 1 else []

def fetch(pmids):
    ids = ",".join(pmids)
    url = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id={ids}"
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=30) as r:
                return json.load(r)
        except Exception as e:
            print("retry", e); time.sleep(2)
    return None

data = fetch(PMIDS)
if not data:
    print("FAILED"); sys.exit(1)
res = data.get("result", {})
for pid in PMIDS:
    rec = res.get(pid)
    if not rec or "error" in rec:
        print(f"{pid}\t*** NOT FOUND / ERROR ***")
        continue
    authors = rec.get("authors", [])
    a1 = authors[0]["name"] if authors else "?"
    print(f"{pid}\t{rec.get('title','?')}\t| {rec.get('source','?')} {rec.get('pubdate','?')};{rec.get('volume','')}:{rec.get('pages','')}\t| {a1}")
