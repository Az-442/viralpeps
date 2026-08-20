# ISSUE: MailerLite account TERMINATED — 17 Aug 2026

**Status: BLOCKED — cannot send ViralPeps newsletters via MailerLite.**

## What happened
Attempting to create and send the ViralPeps Weekly newsletter (17 Aug 2026) via the MailerLite API returned:

- `POST /api/campaigns` → **HTTP 403** `{ "message": "Not available on closed or terminated account" }`
- `GET /api/account` → `"status": "terminated"` (account ID 2509467, name "Viral Peps", Free plan, max 250 subs)

MailerLite has **terminated** the ViralPeps account. Campaign creation/sending is blocked at the account level. No API request can work around this.

## Timeline
- 2026-07-14: Account created
- 2026-07-16 → 2026-08-10: Weekly price-drop / ViralPeps campaigns sent successfully (open rates 25–60%)
- 2026-08-10 10:15: Draft "ViralPeps Weekly - 2026-08-10" created then manually stopped
- ~2026-08-14: Account status changed to "terminated"
- 2026-08-17: All further campaign sends return HTTP 403

## Subscribers still present (but not emailable)
- Segment "All Subscribers" (id 193155917484656413): 7 active, open rate 43.75%, click rate 15.6%
- Group "Price Drops" (id 193000230078121276): 5 active

## Likely cause
Marketing a peptide/price-comparison niche is a high-risk category for MailerLite's ToS. Termination is typically triggered by manual review or a compliance flag. MailerLite does not generally reinstate these; decide whether to:
1. Appeal/contact MailerLite support (limited success likelihood).
2. Migrate the list to an alternative ESP (e.g. other ESP that allows the niche / a self-hosted sender) and re-establish consent.
3. Retain the 7-email list regardless — it's small and active, worth preserving off-MailerLite.

## Newsletter content built but NOT sent
The HTML (top deals, new suppliers BuyReta/PeptidesX/SupplyPeptides/Applied/Tested/Trutide/PGNA, trending GHK-Cu/MOTS-c/BPC-157/Tesamorelin/TB-500/Retatrutide, useful links) is staged at /tmp/viralpeps_newsletter.html. Ready to repurpose for another ESP.
