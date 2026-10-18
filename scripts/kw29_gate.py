"""KW29 gate: escape run-length check + tsc type-check on a wrapped harness."""
import re, subprocess, sys, os

REPO = '/Users/time4you/viralpeps'
FRAGS = ['/tmp/kw29_a1.txt', '/tmp/kw29_a2.txt', '/tmp/kw29_a3.txt']


def check_escapes(path):
    raw = open(path, 'rb').read()
    # count backslash-run lengths before 'n'
    runs = {}
    for m in re.finditer(rb'(\\+)n', raw):
        n = len(m.group(1))
        runs[n] = runs.get(n, 0) + 1
    qruns = {}
    for m in re.finditer(rb"(\\+)'", raw):
        n = len(m.group(1))
        qruns[n] = qruns.get(n, 0) + 1
    print(f"{os.path.basename(path)}: backslash-runs before n -> {runs} ; before quote -> {qruns}")
    bad = {k: v for k, v in runs.items() if k != 1}
    badq = {k: v for k, v in qruns.items() if k != 1}
    return bad, badq


def normalise(text):
    # collapse 2+ backslashes before n to single, and 2+ before quote
    text = re.sub(r'\\{2,}(?=n)', r'\\', text)
    text = re.sub(r"\\{2,}(?=')", r"\\", text)
    return text


if __name__ == '__main__':
    for p in FRAGS:
        bad, badq = check_escapes(p)
        if bad or badq:
            print(f"  -> NORMALISING {p}")
            t = open(p, encoding='utf-8').read()
            open(p, 'w', encoding='utf-8').write(normalise(t))
            check_escapes(p)
        # strip the record key prefix for the harness
        t = open(p, encoding='utf-8').read()
        t = re.sub(r"^\s*['\"][a-z0-9-]+['\"]\s*:\s*", "", t, count=1)
        # strip any trailing comma (Day-27 lesson: TS1009)
        t = t.rstrip()
        if t.endswith(','):
            t = t[:-1]
        harness = os.path.join(REPO, 'src', 'data', 'kw29_gate.ts')
        with open(harness, 'w', encoding='utf-8') as f:
            f.write("import type { ResearchPageContent } from './research-content';\n")
            f.write(f"const x: ResearchPageContent = {t};\nexport default x;\n")
        r = subprocess.run([os.path.join(REPO, 'node_modules/.bin/tsc'), '--noEmit', '--strict',
                            'src/data/kw29_gate.ts'], cwd=REPO, capture_output=True, text=True)
        print(f"  tsc rc={r.returncode}")
        if r.returncode != 0:
            print(r.stdout[-3000:])
            print(r.stderr[-1000:])
        os.remove(harness)
