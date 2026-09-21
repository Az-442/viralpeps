# BLOCKER: ViralPeps MailerLite account TERMINATED

**Discovered:** 2026-09-14 (weekly Price Drops cron run)
**Impact:** All campaign creation and sending is blocked. Weekly Price Drops and Weekly Newsletter emails cannot be sent.

## Evidence

Account status field (`GET https://connect.mailerlite.com/api/account`):

```json
{
  "data": {
    "id": "2509467",
    "name": "Viral Peps",
    "sender_name": "Viral Peps",
    "sender_email": "info@viralpeps.co.uk",
    "status": "terminated",      <-- ROOT CAUSE
    "created_at": "2026-07-14 14:20:24",
    "updated_at": "2026-08-14 18:08:38",
    "domain_auth": false
  }
}
```

Campaign creation (`POST /api/campaigns`):

```
HTTP 403
{"message": "Not available on closed or terminated account"}
```

## Behaviour summary

| Endpoint | Result |
|---|---|
| GET /api/account | 200 (status: terminated) |
| GET /api/subscribers | 200 |
| GET /api/groups | 200 |
| GET /api/campaigns | 200 |
| **POST /api/campaigns** | **403 terminated** |
| **POST /api/campaigns/{id}/schedule** | **403 terminated** |

Reads work; all writes/sends are refused. The API key itself is valid — this is an account-level state, not a credential problem.

## Timeline

Last `updated_at`: 2026-08-14 18:08:38. Last successful campaign sends:

- Weekly Price Drops - 2026-08-10 | sent
- ViralPeps Weekly - 2026-08-03 | sent
- Weekly Price Drops - 2026-08-03 | sent
- ...and weekly prior, back to 2026-07-20

Sending stopped after 2026-08-10/08-14. Note also `ViralPeps Weekly - 2026-08-10` is stuck in **draft**.

## Required action (not doable via API)

Contact MailerLite support to reinstate/reactivate account 2509467. Likely causes worth checking first:

1. Billing / unpaid invoice (most common cause of termination)
2. Compliance suspension from a spam/abuse complaint
3. Account manually closed

Once reinstated, re-run the send. No code changes are needed — the send pipeline is intact.

## Ready-to-send state

- Deals already scraped and saved: `scripts/price-drops-latest.json` (8 deals, 2026-09-14)
- Send script: `send-price-drops.mjs` — has correct design (VIRALPEPS gradient header, #4f46e5 accent, {$unsubscribe} footer)
  - NOTE: its `deals` array is hardcoded with stale 2026-08 values. Update it from
    `scripts/price-drops-latest.json` before sending.
- Price Drops group ID: `193000230078121276` (5 active subscribers)

### Weekly Newsletter ready-to-send state (verified 2026-09-14)

- Data file: `scripts/weekly-newsletter-latest.json` — 8 deals, 6 trending compounds,
  2 new suppliers, site stats updated to **134 peptides / 81 suppliers** (site had grown
  well past the old "37+ suppliers / 128+ peptides" figures in the script).
- Send script: `send-viralpeps-weekly.mjs` — rewritten. Reads its data from the JSON file
  instead of a hardcoded array, and **aborts up-front** if `GET /api/account` is not
  `active`, so it fails with a clear reason rather than a bare 403.
  - Run from repo root: `cd /Users/time4you/viralpeps && node send-viralpeps-weekly.mjs`
  - Preflight helper: `node scripts/ml-status-check.mjs`
  - Template check (no API calls): `node scripts/render-check.mjs`
- Newsletter segment "All Subscribers": `193155917484656413`
- Newsletter subject: `ViralPeps Weekly — New Suppliers & Top Deals`
- Template verified complete: VIRALPEPS header, 4 sections, #4f46e5 accent, `{$unsubscribe}`
  footer, from `info@viralpeps.co.uk`.

### Re-check log

| Date | GET /api/account status | POST /api/campaigns | Notes |
|---|---|---|---|
| 2026-09-14 (Price Drops run) | terminated | 403 | First discovery |
| 2026-09-14 (Weekly Newsletter run) | terminated | 403 (`{"message":"Not available on closed or terminated account"}`) | Still blocked; data + script prepared for instant send |

`updated_at` is still `2026-08-14 18:08:38` — the account has not been touched. Nothing has
changed on MailerLite's side; this genuinely needs a human to contact MailerLite support.

