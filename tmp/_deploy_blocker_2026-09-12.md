# Deploy Blocker — RESOLVED 2026-09-13

## Original symptom (12 Sep 2026)
`/vendors/apexpure` and `/vendors/peptide-pal` returned HTTP 404 live,
even though both commits were pushed to `origin/main`.

- Production was serving `b02d2dba`
- Newest commits on `main`: `28dba68d` (ApexPure), `fb7d32f5` (Peptide Pal)
- Neither had been built as a production deployment.

## Root cause — deploy quota exhausted by a runaway loop
`v6/deployments` for project `viralpeps`:

- **100 deployments in 24 hours** — the free-tier daily cap.
- **All 100 were from the `clicks-data` branch** (0 from `main`).
- Commit messages: `Log outbound click: {vendor}/{compound} [bot]`.

`click-logger.ts` committed **one GitHub commit per outbound click** to the
`clicks-data` branch. Vercel built every one as a Preview deployment, saturating
the cap so `main` commits got no deployment slot.

## Fix applied (13 Sep 2026)

**Step 1 — Vercel ignores the branch** (commit `1ecbf675`, "Test: verify
ignore-step blocks deployment record"). One-off config relief.

**Step 2 — the actual code fix (writer side).** `src/lib/click-logger.ts`
rewritten to **batch writes**:

- Clicks accumulate in an in-process buffer instead of committing immediately.
- Buffer is flushed to GitHub at most once per `FLUSH_INTERVAL_MS` (5 minutes),
  and only when non-empty.
- Old behaviour: 1 commit per click (measured **148 commits/24h** on 13 Sep).
- New behaviour: ≤12 commits/hour/instance worst case.

Also added `flushClicks()` (forced flush, for scripts/cron) and
`clickBufferState()` (introspection for diagnostics).

### Verification
Two tests against the **real compiled module** (`tmp/compiled/click-logger.js`),
with `fetch` mocked so no GitHub writes occur:

| Test | Input | Result |
|---|---|---|
| `tmp/_test_click_batching.mjs` | 50 clicks | **1 commit**, 49 buffered → PASS |
| `tmp/_test_interval.mjs` | 10 + 10 clicks, then forced flush | 1, **0**, 1 → PASS |

`npx tsc --noEmit` clean. `npm run build` clean.

### Trade-off (documented in the source)
Serverless instances are ephemeral: a click buffered in an instance that is
frozen/recycled before its flush window elapses can be lost. Redirect traffic
keeps instances warm and every request crossing the interval triggers a flush,
so loss is minimal — and strictly better than saturating the deploy quota.
Clicks are analytics, not billing; the redirect itself was never affected.

## Recommended durable follow-up (NOT yet implemented)
Move click events off git entirely into a KV/DB store (Vercel KV / Upstash
Redis). That removes the commit-per-write pattern completely. The buffer is a
safe interim, not the end state.

## NOT the fix
Do **not** redo supplier work or re-push. The commits were always correct and on
`main`. This was purely a deploy-pipeline/quota problem.
