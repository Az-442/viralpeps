#!/bin/sh
# Guard: verify every breadcrumb href resolves to an existing route under src/app/.
#
# Purpose: catch dead breadcrumb links (e.g. a breadcrumb pointing at
# /research/[slug] which is a 404 route on ViralPeps). Any href in
# src/data/breadcrumbs.ts, or any pattern passed to getBreadcrumbs() in the
# page templates, must correspond to a real route directory under src/app/.
#
# Referenced by:
#   - npm run lint            (local + Vercel/CI build — fails the build on dead links)
#
# Usage:
#   scripts/check-breadcrumb-links.sh            # full check
#
# Exit 0 = clean, exit 1 = a dead / unconfigured breadcrumb link found.

error=0

# Strip leading slash, then find the top-level route dir under src/app.
#   "/"            -> src/app/page.tsx
#   "/compounds"   -> src/app/compounds/page.tsx (or a folder under src/app/compounds/)
#   "/compounds/x" -> a folder under src/app/compounds/
resolve_href() {
  href="$1"
  # Root
  if [ "$href" = "/" ]; then
    [ -f "src/app/page.tsx" ] && return 0 || { echo "  MISSING: src/app/page.tsx (Home)"; return 1; }
  fi
  path="${href#/}"                      # strip leading slash
  top="${path%%/*}"                     # top-level folder, e.g. "compounds"
  if [ ! -d "src/app/$top" ]; then
    echo "  DEAD ROUTE: '$href' -> no src/app/$top/ directory"
    return 1
  fi
  return 0
}

echo "[check-breadcrumb-links] Scanning breadcrumb config + templates..."

# 1) Static hrefs declared in src/data/breadcrumbs.ts
if [ -f "src/data/breadcrumbs.ts" ]; then
  hrefs=$(grep -oE 'href: "/[^"]*"' src/data/breadcrumbs.ts | sed 's/href: "//; s/"//')
  for h in $hrefs; do
    if ! resolve_href "$h"; then error=1; fi
  done
else
  echo "  MISSING: src/data/breadcrumbs.ts not found"
  error=1
fi

# 2) Route patterns passed to getBreadcrumbs() in the page templates.
#    Each pattern must exist as a key in BREADCRUMBS (so a breadcrumb intent
#    never silently falls back to Home › [page] when the trail is meant to exist).
if [ -f "src/data/breadcrumbs.ts" ]; then
  # Keys available in BREADCRUMBS
  avail_keys=$(grep -oE '^  [a-z]+:' src/data/breadcrumbs.ts | sed 's/^  //; s/://')
fi
for tmpl in src/app/compounds/'[slug]'/page.tsx src/app/vendors/'[slug]'/page.tsx; do
  if [ -f "$tmpl" ]; then
    pattern=$(grep -oE 'getBreadcrumbs\("[^"]+"' "$tmpl" | sed 's/getBreadcrumbs("//; s/"//')
    if [ -n "$pattern" ]; then
      echo "  Template $tmpl uses pattern: '$pattern'"
      # A literal 'research' pattern is only valid if a real research route exists.
      if ! echo "$avail_keys" | grep -qx "$pattern"; then
        echo "  UNCONFIGURED PATTERN: '$pattern' has no entry in BREADCRUMBS (config map)."
        error=1
      fi
    fi
  fi
done

if [ "$error" -eq 0 ]; then
  echo "[check-breadcrumb-links] OK — all breadcrumb links resolve to real routes."
  exit 0
fi

echo "[check-breadcrumb-links] FAIL — one or more breadcrumb links are dead/unconfigured." >&2
exit 1
