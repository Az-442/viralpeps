# ViralPeps TrustScore — Email Outreach Scripts (Full Set)

Sender: [Your name], ViralPeps (viralpeps.co.uk)
Target: UK peptide suppliers. Personalise the {placeholders} per vendor.
Rules: ≤1 link per email, no attachments, 2-3 short paragraphs, confident peer framing (never apologetic), one low-friction ask.

**Vendor-specific widget code (use in the onboarding/acceptance email):** every vendor gets their own unique code tied to their score — a `<script>` tag with their own `data-supplier="{vendor-slug}"` value. Generate it per vendor using their ViralPeps supplier slug (e.g. `uk-peptides`). Keep the `data-supplier` value exact so their score loads. Never send a generic snippet without the vendor's own slug.

**Signup flow (online, one form):** vendors accept the T&Cs AND set up the Direct Debit in a single hosted form (GoCardless). The {signup URL} placeholder points there. Do NOT use "reply I agree" — the signup is the online form. The {signup URL} is pending the GoCardless form build (do not hardcode a live URL yet).

---

## 1. INITIAL OUTREACH EMAIL
**Subject:** your ViralPeps score

Hi {name},

ViralPeps is the UK's peptide comparison site — our goal is to be the leading comparison, verification and trust platform for peptide sellers. We rank every supplier by an independent TrustScore® so buyers can see who's genuinely verified.

We've already set up a **free** profile for {vendor} on ViralPeps to drive free traffic to you, and we've run your independent TrustScore® check — you currently score {score}/55.

Here's what's free for you:

- **Display your score** on your site — one line of code ("Verified · {score}/55"), worth +20 points. Powerful for conversion.
- A **fully verified package** is also available — Verified Badge, full business audit, higher trust and more traffic. Sign up online in one step: {signup URL}.
- **Claim your profile** and update it anytime — products, pricing and stock.

Claim your free profile here: {profile URL}

If it's useful, great. If not, no hard feelings.

{Your name}
ViralPeps · viralpeps.co.uk

---

## 2. OVERCOME REJECTION EMAIL (reply to a "no" / "not interested")
**Subject:** fair enough — one thing

Hi {name},

No problem at all. That's actually part of why the score exists — to give buyers an independent, objective signal above the marketing noise.

One thing worth knowing: the listing and score are already live on ViralPeps either way. If you ever want control of what potential customers see there, it's one email away — and it's free to claim.

No persuasion intended. Just leaving the door open if it's useful later.

{Your name}

---

## 3. ACCEPTANCE & ONBOARDING EMAIL (online signup — T&Cs + Direct Debit in one form)

**Subject:** welcome — your next steps

Hi {name},

Great to have {vendor} on board. Your profile is claimed and your Verified status is active.

**What happens now:**
1. **Widget install** — paste this one block of code into your site footer. It's your own code, unique to {vendor} — it loads your TrustScore and shows the Verified bar + score badge, and moves you to {newScore}/55:
   ```html
   <script src="https://www.viralpeps.co.uk/trust-score.js"
           data-supplier="{vendor-slug}" data-position="bottom-right" defer></script>
   ```
   (Your unique code is `data-supplier="{vendor-slug}"` — keep that exact value so your score loads correctly. Full install guide: {install guide URL})
2. **Sign up & activate** — complete your one-step signup here: **{signup URL}**. This is a single online form where you:
   - tick to accept our **Terms & Conditions**, and
   - set up the **Direct Debit** for the flat £50/mo Verified fee.
   That's all there is — agree to the terms and add the mandate in the same form, and verification is live.
3. **Your profile** — review and update your listing anytime: {profile URL}.

**Terms & Conditions** (you'll also confirm these in the signup form):

- ViralPeps scores suppliers automatically and impartially. TrustScore® cannot be purchased or influenced by payment — it is computed from publicly verifiable signals.
- Verification is a flat monthly fee (£50/mo via Direct Debit), never a commission or share of sales. Cancel any time.
- You are responsible for keeping your store, contact and payment details accurate on your listing.
- Accounts are for legitimate sellers. Misrepresenting your business, products or verification status results in full removal and possible listing on our peptide scammers list.
- A higher score requires both a strong automated profile and, where applicable, a paid independent Audit Certification.

Complete the signup form at {signup URL} and I'll activate everything end-to-end. Welcome aboard.

{Your name}

---

## 4. FOLLOW-UP EMAILS

### Follow-up 1 (Day 4) — no reply to initial
**Subject:** your ViralPeps score

Hi {name},

Bumping this in case it got buried. Your {score}/55 score is live and free to claim — most suppliers are already at 40-50, so you're well placed.

Worth 30 seconds: {profile URL}.

{Your name}

### Follow-up 2 (Day 7) — add the widget angle
**Subject:** +20 points in one line of code

Hi {name},

One more thing on the score: installing our free widget (one line of code) is worth +20 points and shows your verified score to buyers right at checkout — where the trust decision happens.

Brings you to {new score}/55. Install guide here: {install URL}.

{Your name}

### Follow-up 3 (Day 14) — break-up email (final)
**Subject:** closing the loop

Hi {name},

I'll leave it here. Your {score}/55 listing stays live on ViralPeps either way — if you ever want to claim or verify it, the link's always: {profile URL}.

Best of luck with {vendor}. If anything changes, my inbox is open.

{Your name}
