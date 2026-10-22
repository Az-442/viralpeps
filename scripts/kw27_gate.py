#!/usr/bin/env python3
"""kw27: normalise + typecheck one fragment, then report."""
import re
import subprocess
import sys

WT = "/Users/time4you/viralpeps/.wt/kw27"


def backslash_runs(path):
    raw = open(path, "rb").read()
    runs_n = {}
    for m in re.finditer(rb"(\\+)n", raw):
        runs_n[len(m.group(1))] = runs_n.get(len(m.group(1)), 0) + 1
    runs_q = {}
    for m in re.finditer(rb"(\\+)'", raw):
        runs_q[len(m.group(1))] = runs_q.get(len(m.group(1)), 0) + 1
    return runs_n, runs_q


def normalise(path):
    """Collapse 3+ backslashes before n, and 2+ before a quote, to single escapes."""
    raw = open(path, "rb").read()
    before = raw
    raw = re.sub(rb"(\\{3,})n", rb"\\n", raw)
    raw = re.sub(rb"(\\{2,})'", rb"\\'", raw)
    # escape unescaped in-word apostrophes (letter ' letter), the Day-26 trap
    if raw != before:
        open(path, "wb").write(raw)
        return True
    return False


def main(path):
    rn, rq = backslash_runs(path)
    print("backslash runs before n :", rn)
    print("backslash runs before ' :", rq)
    changed = normalise(path)
    print("normaliser changed file:", changed)
    rn, rq = backslash_runs(path)
    print("after -> n:", rn, " ' :", rq)

    txt = open(path, encoding="utf-8").read()
    # strip the leading  'slug': {  record key so the object can stand alone
    body = re.sub(r"^\s*['\"][a-z0-9-]+['\"]\s*:\s*", "", txt, count=1)
    body = body.rstrip()
    if body.endswith(","):
        body = body[:-1]
    harness = (
        "import type { ResearchPageContent } from './research-content';\n"
        "const x: ResearchPageContent = " + body + ";\n"
        "export default x;\n"
    )
    hp = WT + "/src/data/kw27_gate.ts"
    open(hp, "w", encoding="utf-8").write(harness)
    r = subprocess.run(
        ["./node_modules/.bin/tsc", "--noEmit", "--strict", "src/data/kw27_gate.ts"],
        cwd=WT, capture_output=True, text=True)
    print("tsc rc:", r.returncode)
    if r.returncode:
        print(r.stdout[-4000:])
        print(r.stderr[-2000:])
    import os
    os.remove(hp)


if __name__ == "__main__":
    main(sys.argv[1])
