#!/bin/sh
# Guard: block any "Peptide Supermarket" reference from entering the codebase.
#
# We removed all Peptide Supermarket references from the codebase (commit fe72e8b).
# This guard prevents reintroduction via supplier data, SEO copy, citations, or code
# comments. It is deliberately referenced by:
#   - .git/hooks/pre-commit  (local commits)
#   - npm run lint            (local + Vercel/CI build)
#
# Usage:
#   scripts/guard-no-peptidesupermarket.sh            # scan the whole src/ + public/
#   scripts/guard-no-peptidesupermarket.sh --staged   # scan only git-staged files
#
# Exit 0 = clean, exit 1 = prohibited reference found.

PATTERNS='peptide[ -]?supermarket'

scan_dirs() {
  # $1 = optional --staged
  if [ "$1" = "--staged" ]; then
    git diff --cached --name-only --diff-filter=ACMR 2>/dev/null | grep -E '^(src|public)/' | grep -v 'node_modules'
  else
    find src public -type f 2>/dev/null | grep -v 'node_modules'
  fi
}

FILES=$(scan_dirs "$1")
[ -z "$FILES" ] && exit 0

HITS=""
while IFS= read -r f; do
  [ -n "$f" ] || continue
  if grep -qiE "$PATTERNS" "$f" 2>/dev/null; then
    HITS="$HITS$f
"
  fi
done <<EOF
$FILES
EOF

if [ -n "$HITS" ]; then
  echo "ERROR: 'Peptide Supermarket' reference blocked by guard script." >&2
  echo "The following file(s) contain it:" >&2
  printf '%s' "$HITS" >&2
  echo >&2
  echo "Remove/reword the reference (supplier data, SEO copy, citation, or comment)." >&2
  echo "You may bypass once with git commit --no-verify (last resort)." >&2
  exit 1
fi

exit 0
