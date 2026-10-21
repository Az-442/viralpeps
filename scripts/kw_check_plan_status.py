#!/usr/bin/env python3
"""Authoritative plan-vs-registry check. Handles single/double quoted keys AND slug fields."""
import re

plan = open('/Users/time4you/viralpeps/kw-phase-1-list.md').read()
rc = open('/Users/time4you/viralpeps/src/data/research-content.ts').read()

existing = set()
# Any quoted key followed by ':' at any indent
existing |= set(re.findall(r'["\']([a-z0-9-]+)["\']\s*:\s*\{', rc))
# Any slug: field
existing |= set(re.findall(r'slug\s*:\s*["\']([a-z0-9-]+)["\']', rc))

days = re.split(r'\n## Day ', plan)
missing_total = []
for d in days[1:]:
    header = d.split('\n')[0].strip()
    body = re.sub(r'~~.*?~~', '', d, flags=re.S)  # drop struck-through lines
    slugs = re.findall(r'`([a-z0-9-]+)`', body)
    miss = [s for s in slugs if s not in existing]
    tag = "OK" if not miss else "MISSING: " + ", ".join(miss)
    if miss:
        missing_total += [(header, m) for m in miss]
    print(f"Day {header.split('—')[0].strip():8s} {len(slugs)} planned | {tag}")

print()
print(f"Total registry entries discovered: {len(existing)}")
print(f"Plan items missing from registry: {len(missing_total)}")
for h, m in missing_total:
    print(f"  - {m}  ({h.split('—')[0].strip()})")
