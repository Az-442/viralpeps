"""KW29 PubMed helper — search, then esummary-verify. Never guess a PMID."""
import json, sys, time, urllib.parse, urllib.request

EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "viralpeps-kw/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def search(term, retmax=5):
    u = f"{EUTILS}/esearch.fcgi?db=pubmed&retmode=json&retmax={retmax}&term=" + urllib.parse.quote(term)
    try:
        d = json.loads(get(u))
        return d["esearchresult"].get("idlist", [])
    except Exception as e:
        return [f"ERR {e}"]


def summary(pmids):
    if not pmids:
        return {}
    u = f"{EUTILS}/esummary.fcgi?db=pubmed&retmode=json&id=" + ",".join(pmids)
    d = json.loads(get(u))
    return d.get("result", {})


def show(pmids):
    res = summary(pmids)
    for p in pmids:
        r = res.get(p)
        if not r or "error" in r:
            print(f"  {p}: NOT FOUND")
            continue
        auth = r.get("authors", [{}])
        first = auth[0].get("name", "?") if auth else "?"
        print(f"  {p} | {first} et al. | {r.get('title','')[:120]} | {r.get('source','')} {r.get('pubdate','')};{r.get('volume','')}({r.get('issue','')}):{r.get('pages','')}")


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "search":
        term = sys.argv[2]
        ids = search(term)
        print(f"SEARCH: {term}\n  ids: {ids}")
        show(ids)
    elif mode == "verify":
        ids = sys.argv[2].split(",")
        show(ids)
