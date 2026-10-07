#!/usr/bin/env python3
"""KW Day 18 merge: normalise fragments, tsc-gate each, merge into research-content.ts.

Rules learned from prior runs:
- write_file may double escapes: collapse (\\){2,} before n / ' / " to a single escape.
- Seam is currently: "  ]," + NL + "}," + NL + NL + "};" + NL + "export default content;"
  (probe variants; confirm count == 1).
- Replacement: keep the tail, insert blocks, EACH new entry carries its own trailing comma.
"""
import os, re, subprocess, sys

ROOT = "/Users/time4you/viralpeps"
RC = os.path.join(ROOT, "src/data/research-content.ts")
NL = chr(10)

FRAGS = [
    "/tmp/kw18_frag1_epitalon.txt",
    "/tmp/kw18_frag2_cjc.txt",
    "/tmp/kw18_frag3_pillar.txt",
]
SLUGS = ["epitalon-suppliers-uk", "cjc-1295-with-dac-vs-without-dac", "research-peptides-guide"]


def normalise(text, label):
    raw = text
    before = (len(re.findall(r'\\{2,}n', raw)), len(re.findall(r"\\{2,}'", raw)), len(re.findall(r'\\{2,}"', raw)))
    # Collapse doubled backslash-runs back to a SINGLE escape (backslash + char),
    # NOT to a real character: these live inside single/double-quoted TS strings
    # where \n and \' are escape sequences, not raw bytes.
    text = re.sub(r'\\{2,}n', r'\\n', text)
    text = re.sub(r"\\{2,}'", r"\\'", text)
    text = re.sub(r'\\{2,}"', r'\\"', text)
    after = (len(re.findall(r'\\{2,}n', text)), len(re.findall(r"\\{2,}'", text)), len(re.findall(r'\\{2,}"', text)))
    print(f"  normalise {label}: doubled runs before={before} after={after}")
    return text


def tsc_gate(block, label):
    """Wrap as a real module and type-check with the project's tsc.

    The block INCLUDES its Record key ('slug': { ... }), so wrap it in an
    object literal typed as Record<string, ResearchPageContent>.
    """
    harness = (
        "import type { ResearchPageContent } from './research-content';\n"
        "const x: Record<string, ResearchPageContent> = {\n"
        + block.rstrip().rstrip(",")
        + "\n};\n"
    )
    path = os.path.join(ROOT, "src/data/__kw18_fragcheck.ts")
    open(path, "w").write(harness)
    try:
        r = subprocess.run(
            ["./node_modules/.bin/tsc", "--noEmit", "--skipLibCheck",
             "--moduleResolution", "bundler", "--module", "esnext",
             "--target", "es2020", path],
            cwd=ROOT, capture_output=True, text=True, timeout=180,
        )
        out = (r.stdout + r.stderr).strip()
        # filter the import-resolution noise from research-content's own deps
        lines = [l for l in out.splitlines() if "__kw18_fragcheck" in l or "TS1109" in l or "TS1005" in l or "TS1128" in l or "TS1136" in l]
        syntactic = [l for l in lines if any(c in l for c in ("TS1005","TS1109","TS1128","TS1136"))]
        if syntactic:
            print(f"  ✗ tsc SYNTAX ERROR in {label}:")
            for l in syntactic[:10]:
                print("     ", l)
            return False
        print(f"  ✓ tsc gate {label}: parse OK" + (f" ({len(lines)} nits)" if lines else ""))
        return True
    finally:
        if os.path.exists(path):
            os.remove(path)


def main():
    blocks = []
    for fp, slug in zip(FRAGS, SLUGS):
        text = open(fp, encoding="utf-8").read().strip()
        text = normalise(text, slug)
        # each fragment should start with "'slug': {"
        if not text.startswith(f"'{slug}'"):
            print(f"  ✗ {slug}: fragment does not start with key. Got: {text[:60]!r}")
            sys.exit(1)
        if not text.endswith("},"):
            # ensure it closes with },
            if text.endswith("}"):
                text += ","
            else:
                print(f"  ✗ {slug}: fragment does not end with '}}'. Got: {text[-40:]!r}")
                sys.exit(1)
        if not tsc_gate(text, slug):
            sys.exit(1)
        blocks.append(text)
        print(f"  ✓ {slug}: {len(text)} chars")

    raw = open(RC, encoding="utf-8").read()

    # probe seam variants
    variants = {
        "A_noidnt": '],' + NL + '},' + NL + NL + '};' + NL + 'export default content;',
        "B_2sp_2sp": '  ],' + NL + '  },' + NL + NL + '};' + NL + 'export default content;',
        "C_2sp_0sp": '  ],' + NL + '},' + NL + NL + '};' + NL + 'export default content;',
        "D_noidnt_2sp": '],' + NL + '  },' + NL + NL + '};' + NL + 'export default content;',
    }
    hits = {k: raw.count(v) for k, v in variants.items()}
    print("  seam probe:", hits)
    if hits["C_2sp_0sp"] == 1:
        seam = variants["C_2sp_0sp"]
    elif hits["A_noidnt"] == 1:
        seam = variants["A_noidnt"]
    else:
        print("  ✗ no unique seam found"); sys.exit(1)

    print(f"  seam chosen, count={raw.count(seam)}")
    payload = (NL + NL).join(blocks)
    replacement = "  ]," + NL + "}," + NL + NL + payload + NL + NL + "};" + NL + "export default content;"
    if seam.startswith("  ],"):
        new = raw.replace(seam, replacement, 1)
    else:
        new = raw.replace(seam, "]," + NL + "}," + NL + NL + payload + NL + NL + "};" + NL + "export default content;", 1)

    open(RC, "w", encoding="utf-8").write(new)
    print(f"  merged 3 entries, file now {len(new)} chars")
    # sanity: keys present, doubled escapes absent
    for slug in SLUGS:
        print(f"    present {slug}:", f"'{slug}'" in new)
    print("  trailing doubled-n:", len(re.findall(r'\\{2,}n', new[-20000:])))


if __name__ == "__main__":
    main()
