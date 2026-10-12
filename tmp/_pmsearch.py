#!/usr/bin/env python3
"""Search PubMed via E-utilities esearch then esummary. Usage: _pmsearch.py "term" [...]"""
import json
import sys
import urllib.parse
import urllib.request

UA = {'User-Agent': 'viralpeps-refcheck/1.0'}


def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def esearch(term, retmax=6):
    url = ('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
           '?db=pubmed&retmode=json&retmax=%d&term=%s' % (retmax, urllib.parse.quote(term)))
    return get(url)


def esummary(pmids):
    url = ('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
           '?db=pubmed&retmode=json&id=' + ','.join(pmids))
    return get(url)


for term in sys.argv[1:]:
    print('\n### SEARCH:', term)
    try:
        sr = esearch(term)
        ids = sr.get('esearchresult', {}).get('idlist', [])
        if not ids:
            print('  (no results)')
            continue
        data = esummary(ids)
        res = data.get('result', {})
        for pid in ids:
            rec = res.get(pid, {})
            au = rec.get('authors', [])
            first = au[0]['name'] if au else '?'
            print('  PMID %s | %s | %s %s | %s' % (
                pid, rec.get('title', '')[:110],
                rec.get('source', ''), rec.get('pubdate', ''), first))
    except Exception as e:
        print('  ERROR:', e)
