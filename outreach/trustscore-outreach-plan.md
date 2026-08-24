# TrustScore Supplier Outreach Plan

**Goal:** Get UK peptide suppliers to claim their ViralPeps profile, install the free TrustScore widget (+20, free backlink), then upgrade to Audit Certification (£50/mo).
**Source list:** 61 vendors in `src/data/vendors.json` (19 already score 55/55, 29 at 45/55, 5 offline).

---

## 1. Segment the 61 suppliers (priority order)

| Segment | Count | Who | Angle |
|---|---|---|---|
| **A. Best fit** | ~19 | Score 55/55, verified business, active site | "You already rank #1 on ViralPeps — claim your profile + widget" |
| **B. Good fit** | ~29 | Score 45/55, active | "Close the gap to 55 — here's how" |
| **C. Warm** | all | Have contact email + real business | These are the widgets that convert best |
| **D. Offline** | ~5 | No live site | Skip placement — keep in list, no send |

Each vendor has: name, website, rating, email/contact, highlights. Use these for personalisation — mention what THEY publish (COA, reviews, shipping) so it's not a generic blast.

---

## 2. The pitch (3-touch sequence)

**Touch 1 — Day 0 (value first, no ask):**
"Hi {name}, I see {vendor} publishes COA + {X} — that already scores 45/55 on ViralPeps's independent check. Your live score is here: {their profile URL}. Free to claim."

**Touch 2 — Day 4 (add the widget):**
Follow-up referencing the score. "Install our free widget (one line of code) — it's +20 points and shows your verified score to buyers at checkout. Brings you to {score}/55."

**Touch 3 — Day 7 (Audit Certification upsell):**
"Want the Verified Badge? Independent Audit Certification — £50/mo flat, no commission. Full business check + badge on your site."

---

## 3. Sending rules (from email-outreach skill)

- **Never** send cold outreach from the main business domain. Use a separate .work/.org (or ViralPeps-specific) sending domain.
- **SPF/DKIM/DMARC** must be set first; allow 24-72h propagation.
- **Volume:** 5-10/day to start, stagger 2-3 random-time batches. Never same time 2 days running.
- **Personalise every email.** No identical batch sends.
- **≤1 link per email**, no attachments, 2-3 short paragraphs.
- Follow-ups: no reply in 4 days → Touch 2; 7 days → Touch 3; 14 days → cold.

---

## 4. What to track (one sheet)

Sheet columns: Date | Vendor | Site | Score | Segment | Email | Touch (1/2/3) | Sent | Opened/Reply | Status (Sent/Replied/Widget installed/Upgraded/Bounced/No-contact) | Notes

**Milestones that matter (leading indicators of monetisation):**
- Widget installed → free +20 backlink (your real SEO win)
- Replied → warm lead
- Upgraded to £50/mo Audit → revenue

---

## 5. Tools

- **Tracking sheet:** CSV/Google Sheets (I'll build + maintain it).
- **Sending:** Google Workspace + a cold-outreach domain, or Apollo.io (free = 20/day). Decision needed on channel.
- **Email:** each vendor is individually addressable — I'll use their published contact (support@, info@) or site form.

---

## Next actions (await approval)
1. Pick sending channel (own domain + Gmail / Apollo).
2. I build the tracking sheet (61 rows pre-filled with vendor data).
3. I draft 3 templates, personalised per vendor, for your approval.
4. First batch: 5-10 of the 19 best-fit suppliers.
