#!/usr/bin/env python3
"""
ViralPeps compound dedupe — evidence-gated.

Merges ONLY duplicate compound pages into their canonical page, then records the
301 redirects. Follows the hard rule in references/compound-merger.md:
only merge with clear evidence; if unsure, do not merge.

Evidence required for each duplicate:
  - exact (vendor, url, price) overlap with the canonical page OR zero sources
    (an empty shell page with nothing to compare), AND
  - same underlying substance (verified by name/CAS inspection).

Outputs:
  - compounds.json rewritten (duplicates removed, unique sources folded in)
  - slug-redirects.json  { oldSlug: newSlug }  consumed by the 301 map
  - a report to stdout

Run:  python3 scripts/dedupe_compounds.py [--apply]
"""
import json
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data" / "compounds.json"
REDIRECTS = ROOT / "src" / "data" / "slug-redirects.json"

# ---------------------------------------------------------------------------
# MERGE PLAN — each entry: canonical slug -> list of duplicate slugs to absorb.
# Only include a duplicate when the substance is provably the same.
# ---------------------------------------------------------------------------
MERGE_PLAN = {
    # IGF-1 LR3 — all variants are the same 83-aa analogue at different pack sizes
    "igf-1-lr3": [
        "igf-1-lr3-1mg",
        "igf-1-lr3-100mcg",
        "igf-1-long-r3-1mg",       # "long R3" is LR3
        "igf1-lr3-1mg",
        "igf1-lr3-vial-express",
        "igf1-lr3-pen-express",
    ],
    # GLOW blend — same GHK-Cu/BPC-157/TB-500 blend, alternative spellings
    "glow": [
        "glow-stack",
        "bundle-glow-stack",
        "glow-blend-ghk-cu-bpc157-tb500",
        "glow-combo-pen-express",
        "sterling-glow-70mg",
    ],
    # KLOW blend — same 4-way blend
    "klow": [
        "klow-stack",
        "klow-combo-pen-express",
        "klow-blend-ghk-cu-bpc157-tb500-kpv",
        "sterling-klow-80mg",
    ],
    # PT-141 — two pages for the same compound (id collision: both were id=pt-141)
    # plus pack-size/container variants. Survivor is the 53-source hub.
    "pt-141-bremelanotide": [
        "pt-141",
        "pt-141-bremelanotide-10mg",
        "pt-141-vial-express",
        "pt-141-pen-express",
        "pt-141-10mg",
    ],
}

# Duplicates merged on substance identity even though their vendor listings are
# disjoint (different suppliers stock different pack sizes — zero source overlap
# does NOT mean a different compound). Justification is recorded here explicitly.
FORCE_MERGE = {
    # same compound, listings partitioned across two separate pages
    "pt-141": "identical compound (PT-141 / Bremelanotide) split across two pages",
    # Sterlingsell the blend under a branded name; same GHK-Cu/BPC-157/TB-500 mix
    "sterling-glow-70mg": "Glow blend sold by Sterling Peptides under their own name",
    "sterling-klow-80mg": "KLOW blend sold by Sterling Peptides under their own name",
    # "Bundle" glow = the same blend marketed as a bundle
    "bundle-glow-stack": "Glow blend marketed as a bundle",
}

# Explicitly NOT merged (different substance or different product):
#   igf-1-des*        — IGF-1 DES is a truncated analogue, a distinct compound
#   glow-nasal-spray  — distinct intranasal formulation page (kept, see report)
#   hgh-97            — 176-191 fragment, NOT 191aa HGH
#   hgh-191aa-*       — full-sequence HGH, different substance from the fragment
#   hgh-fragment-*    — fragment chain; consolidation decided separately


def src_key(s):
    return (s.get("vendor"), s.get("url"), s.get("price"))


def main(apply: bool) -> int:
    data = json.loads(DATA.read_text())
    by_slug = {c["slug"]: c for c in data}

    missing = [
        f"{canon}<-{dup}"
        for canon, dups in MERGE_PLAN.items()
        for dup in dups
        if canon not in by_slug or dup not in by_slug
    ]
    if missing:
        print("ABORT — missing slugs:", missing)
        return 1

    redirects = {}
    report = []

    for canon, dups in MERGE_PLAN.items():
        survivor = by_slug[canon]
        base_keys = {src_key(s) for s in survivor.get("sources", [])}
        before = len(survivor["sources"])
        moved = 0
        absorbed = []

        for dup in dups:
            victim = by_slug[dup]
            v_keys = {src_key(s) for s in victim.get("sources", [])}
            overlap = v_keys & base_keys

            # Evidence gate: an explicit FORCE_MERGE justification, or a source
            # overlap, or an empty shell page.
            forced = dup in FORCE_MERGE
            if victim.get("sources") and not overlap and not forced:
                report.append(
                    f"SKIP {dup} -> {canon}: no source overlap (not proven duplicate)"
                )
                continue
            if forced:
                report.append(f"FORCED {dup} -> {canon}: {FORCE_MERGE[dup]}")

            for s in victim.get("sources", []):
                if src_key(s) in base_keys:
                    continue  # already present on canonical
                # same vendor already on canonical? fold as option
                existing = next(
                    (e for e in survivor["sources"] if e.get("vendor") == s.get("vendor")),
                    None,
                )
                if existing:
                    existing.setdefault("options", [])
                    sizes = {o.get("size") for o in existing["options"]}
                    if s.get("dosage") and s["dosage"] not in sizes:
                        existing["options"].append(
                            {"size": s["dosage"], "price": s.get("price", "")}
                        )
                        moved += 1
                else:
                    survivor["sources"].append(s)
                    base_keys.add(src_key(s))
                    moved += 1

            absorbed.append(dup)
            redirects[dup] = canon
            by_slug.pop(dup, None)

        # merge aliases too
        survivor.setdefault("aliases", [])
        for dup in absorbed:
            if dup not in survivor["aliases"]:
                survivor["aliases"].append(dup)

        report.append(
            f"{canon}: {before} -> {len(survivor['sources'])} sources "
            f"({moved} moved, absorbed {len(absorbed)}: {absorbed})"
        )

    # remove absorbed compounds from the array
    kill = set(redirects)
    out = [c for c in data if c["slug"] not in kill]

    # repoint any compareSlug references
    repointed = 0
    for c in out:
        cs = c.get("compareSlug")
        if cs in redirects:
            c["compareSlug"] = redirects[cs]
            repointed += 1

    # ---- invariants ----
    ids = [c["id"] for c in out]
    dupes = {k: v for k, v in Counter(ids).items() if v > 1}
    stale = [c["id"] for c in out if c.get("compareSlug") in kill]

    print("\n".join(report))
    print(f"\ncompounds: {len(data)} -> {len(out)}  (removed {len(kill)})")
    print(f"compareSlug repointed: {repointed}")
    print(f"redirects created: {len(redirects)}")
    if dupes:
        print("ABORT — duplicate ids:", dupes)
        return 1
    if stale:
        print("ABORT — stale compareSlug:", stale)
        return 1

    if apply:
        DATA.write_text(json.dumps(out, indent=2, ensure_ascii=False))
        existing = {}
        if REDIRECTS.exists():
            existing = json.loads(REDIRECTS.read_text())
        existing.update(redirects)
        REDIRECTS.write_text(json.dumps(existing, indent=2, sort_keys=True))
        print(f"\nAPPLIED. {DATA.name} + {REDIRECTS.name} written.")
    else:
        print("\nDRY RUN — pass --apply to write.")

    return 0


if __name__ == "__main__":
    sys.exit(main("--apply" in sys.argv))
