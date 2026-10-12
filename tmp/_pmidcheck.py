#!/usr/bin/env python3
"""Verify PMIDs via NCBI E-utilities esummary. Prints title/journal/authors/year."""
import json
import sys
import time
import urllib.request

PMIDS = sys.argv[1:] if len(sys.argv) > 1 else []


def esummary(pmids):
    url = ('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
           '?db=pubmed&retmode=json&id=' + ','.join(pmids))
    req = urllib.request.Request(url, headers={'User-Agent': 'viralpeps-refcheck/1.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def esearch(term):
    url = ('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
           '?db=pubmed&retmode=json&retmax=5&term=' + urllib.parse.quote(term))
    req = urllib.request.Request(url, headers={'User-Agent': 'viralpeps-refcheck/1.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def show(pmids):
    data = esummary(pmids)
    res = data.get('result', {})
    for pid in pmids:
        rec = res.get(pid)
        if not rec or 'error' in rec:
            print(f'  {pid}: NOT FOUND')
            continue
        authors = rec.get('authors', [])
        first = authors[0]['name'] if authors else '?'
        print(f'  PMID {pid}')
        print(f'    title : {rec.get("title", "")}')
        print(f'    journal: {rec.get("fulljournalname", rec.get("source", ""))} {rec.get("volume", "")}({rec.get("issue", "")}):{rec.get("pages", "")} {rec.get("pubdate", "")}')
        print(f'    first  : {first}  (n={len(authors)})')


if __name__ == '__main__':
    import urllib.parse  # noqa
    if PMIDS:
        show(PMIDS)
