#!/usr/bin/env python3
"""kw27: PubMed search + summary helper (writes to files, no shell pipes)."""
import json, sys, time, urllib.parse, urllib.request

BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"


def get(url):
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "viralpeps-research/1.0"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.loads(r.read().decode())
        except Exception as e:
            print("retry", attempt, e, file=sys.stderr)
            time.sleep(2)
    raise SystemExit("fetch failed: " + url)


def search(term, retmax=60):
    q = BASE + "esearch.fcgi?db=pubmed&retmode=json&retmax=%d&term=%s" % (retmax, urllib.parse.quote(term))
    d = get(q)["esearchresult"]
    return d["count"], d["idlist"]


def summary(ids):
    if not ids:
        return {}
    q = BASE + "esummary.fcgi?db=pubmed&retmode=json&id=" + ",".join(ids)
    d = get(q)["result"]
    return {k: d[k] for k in d if k != "uids"}


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "search":
        for term in sys.argv[2:]:
            c, ids = search(term)
            print("QUERY:", term, "COUNT:", c)
            print(",".join(ids))
            time.sleep(0.4)
    elif mode == "summary":
        ids = sys.argv[2:]
        for k, v in summary(ids).items():
            au = v.get("authors", [])
            first = au[0]["name"] if au else ""
            print("%s | %s | %s | %s | %s;%s:%s" % (
                k, first, v.get("pubdate"), v.get("journal", ""), v.get("source", ""),
                v.get("volume", ""), v.get("pages", "")))
            print("    ", v.get("title"))
