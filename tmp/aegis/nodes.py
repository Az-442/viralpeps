#!/usr/bin/env python3
import json, os, re

data = json.load(open("/Users/time4you/viralpeps/src/data/compounds.json"))
# count id vs slug; top-level compounds
print("num top-level compounds:", len(data))
targets = {"bacteriostatic-water","bpc-157","tb-500","ghk-cu","glow","klow","mots-c","mt2","mt-2","nad-plus","nad-500mg","retatrutide"}
for c in data:
    sid = c.get("id") or c.get("slug")
    if sid in targets:
        srcs = c.get("sources") or []
        vend = sorted({s.get("vendor") for s in srcs})
        print("== NODE:", sid, "| cat:", c.get("category"), "| sources:", len(srcs))
        print("   vendors:", ", ".join(vend[:40]))
