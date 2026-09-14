#!/usr/bin/env bash
# Vercel "Ignored Build Step" — wired via vercel.json "ignoreCommand".
#
# Vercel runs this before every build:
#   exit 1  -> build proceeds
#   exit 0  -> build is SKIPPED
#
# The outbound-click logger appends analytics rows to clicks.json on the
# `clicks-data` branch. Those commits are pure data and must NEVER be built —
# each one was consuming a deploy slot from the free-tier 100/day cap and
# starving `main` of production deploys (12 Sep 2026 outage, recurring).
#
# Guard: git may be unavailable in some build contexts. If we cannot determine
# the branch, exit 1 (build) so we never accidentally skip a real deploy.

set -euo pipefail

# Vercel exposes the branch under different var names across versions.
BRANCH="${VERCEL_GIT_COMMIT_REF:-}"

if [ -z "$BRANCH" ]; then
  # Fall back to asking git directly.
  BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"
fi

if [ "$BRANCH" = "clicks-data" ]; then
  echo "[ignore-build] branch '$BRANCH' is data-only — skipping build."
  exit 0
fi

echo "[ignore-build] branch '${BRANCH:-unknown}' — proceeding with build."
exit 1
