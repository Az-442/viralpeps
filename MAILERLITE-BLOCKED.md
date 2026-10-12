# ViralPeps MailerLite — Account Terminated (BLOCKER)

**Status:** BLOCKED — MailerLite account is terminated.
**Detected:** 2026-10-05 (weekly Price Drops cron)
**Re-confirmed:** 2026-10-12 (weekly ViralPeps Newsletter cron) — still terminated, nothing sent.

## Evidence (verified 2026-10-12)
- `GET /api/account` → `200 {"status":"terminated"}`, account id `2509467`, name "Viral Peps", last updated `2026-08-14 18:08:38`
- `POST /api/campaigns` → `403 {"message": "Not available on closed or terminated account"}`
- `POST /api/subscribers` → `422 "You cannot create a subscriber. Your account is in the wrong status."`
- `GET /api/segments` → `All Subscribers` id `193155917484656413` present, total **7**

Read endpoints (`/groups`, `/campaigns`, `/subscribers`, `/account`, `/segments`) still return 200 —
only WRITE operations are blocked. This is an **account-status** problem, NOT a key or payload problem.
Do not retry or tweak the payload.

## Impact
- The weekly ViralPeps Newsletter CANNOT be sent via the API.
- The weekly Price Drops email CANNOT be sent via the API.
- All automated MailerLite sends (newsletter, price drops, welcome/lead-magnet automations) are down.
- Last successful campaign: `195405746780767731` "Weekly Price Drops - 2026-08-10" (status: sent).

## Action required by Azar
Contact MailerLite support to appeal/reactivate the account, OR migrate to a new
email platform (e.g. Brevo, Resend, Mailchimp) and update `MAILERLITE_API_KEY`
in `/Users/time4you/viralpeps/.env.local` + Vercel env.

## Ready-to-send assets (staged, will send the moment account is `active`)
- `/Users/time4you/viralpeps/newsletter-email.html` — **weekly newsletter** HTML (rebuilt 2026-10-12):
  subject "ViralPeps Weekly — New Suppliers & Top Deals", blue #4f46e5 accent, VIRALPEPS header,
  price-drop highlights, supplier updates, trending research, useful links, `{$unsubscribe}` link.
- `/Users/time4you/viralpeps/price-drops-email.html` — price-drops email HTML (8 deals).
- `/Users/time4you/viralpeps/send-newsletter.py` — ready-to-run sender (reads `.env.local`,
  checks account status first, aborts unless `active`, creates campaign + instant send).

## Re-verification log
- 2026-10-05: terminated, nothing sent.
- 2026-10-12: terminated (unchanged), nothing sent.
