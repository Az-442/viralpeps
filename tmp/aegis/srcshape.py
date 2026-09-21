#!/usr/bin/env python3
import json
data = json.load(open("/Users/time4you/viralpeps/src/data/compounds.json"))
for sid in ["retatrutide", "klow", "glow", "mt2", "nad-plus", "mots-c", "bpc-157"]:
    c = next(x for x in data if (x.get("id") or x.get("slug")) == sid)
    print("############ NODE", sid, "############")
    # sample a couple vendor sources incl. ones with mg variants
    shown = 0
    for s in c.get("sources") or []:
        # show Sterling/SPX/PeptideLabUK style
        if s.get("vendor") in ("Sterling Peptides", "SPX Labs", "PeptideLabUK", "Raccoon Peptides", "UK Peptides") and shown < 6:
            print("   ", json.dumps(s))
            shown += 1
    print()
