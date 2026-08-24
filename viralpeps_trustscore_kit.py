#!/usr/bin/env python3
"""ViralPeps — Supplier TrustScore Media Kit (vendor outreach for the trust-badge offer)
Same design system as the ViralPeps Marketing Packs PDF. Simple black & white,
one brand colour per section (header + thin accent bar only). Purple-gradient cover.
"""
from fpdf import FPDF

# ---- palette: black / white / greys + one brand accent per page ----
BLACK = (15, 15, 15)
WHITE = (255, 255, 255)
GREY_L = (235, 235, 235)   # light rule / box
GREY_M = (120, 120, 120)   # muted text
GREY_D = (60, 60, 60)      # secondary text

# package / section brand accents
AC_INDIGO = (79, 70, 229)
AC_PURPLE = (124, 45, 200)
AC_FUSCHIA = (205, 40, 220)
AC_GOLD   = (196, 150, 20)
AC_PINK   = (217, 70, 239)

# cover gradient endpoints (purple)
GRAD_TOP = (96, 60, 220)     # indigo-violet
GRAD_BOT = (168, 60, 210)    # purple/fuchsia

PAGE_W, PAGE_H = 210, 297
OUT = "/Users/time4you/viralpeps/viralpeps-supplier-trustscore-kit.pdf"
CONTACT_EMAIL = "info@viralpeps.co.uk"
TRIAL_URL = "https://www.viralpeps.co.uk/vendors/register"


class PackPDF(FPDF):
    def __init__(self):
        super().__init__(orientation="P", unit="mm", format="A4")
        # footer occupies the bottom ~25mm; content auto-breaks above it
        self.set_auto_page_break(auto=True, margin=27)
        self.add_font("DVS", "", "/System/Library/Fonts/Supplemental/Arial.ttf")
        self.add_font("DVS", "B", "/System/Library/Fonts/Supplemental/Arial Bold.ttf")

    # ---------- vertical gradient helper ----------
    def vgrad(self, x, y, w, h, top, bottom):
        """Vertical gradient drawn as horizontal stripes between two colours."""
        steps = 120
        for i in range(steps):
            t = i / float(steps - 1)
            col = (
                int(top[0] + (bottom[0] - top[0]) * t),
                int(top[1] + (bottom[1] - top[1]) * t),
                int(top[2] + (bottom[2] - top[2]) * t),
            )
            self.set_fill_color(*col)
            self.rect(x, y + (h * t), w, (h / steps) + 0.5, style="F")

    # ---------- global footer ----------
    def footer(self):
        if self.page_no() <= 1:
            return
        # compact footer band in the bottom ~28mm of the page
        rule_y = PAGE_H - 23.5      # thin rule 273.5mm
        brand_y = PAGE_H - 21        # brand + page number
        btn_top = PAGE_H - 15.5      # prominent trial button
        btn_h = 7.5
        # rule
        self.set_draw_color(*GREY_L)
        self.set_line_width(0.4)
        self.line(14, rule_y, 196, rule_y)
        # brand + page number
        self.set_xy(14, brand_y)
        self.sans("", 8.5)
        self.tint(GREY_M)
        self.cell(0, 5, f"ViralPeps  |  viralpeps.co.uk  |  {CONTACT_EMAIL}", align="L")
        self.cell(0, 5, f"Page {self.page_no()}", align="R")
        # prominent CTA "Trial" button (filled indigo, white bold text, clickable)
        label = "Start your free 30 day trial now  \u203a"
        self.set_font("DVS", "B", 10.5)
        w = self.get_string_width(label) + 8
        self.set_fill_color(*AC_INDIGO)
        self.rect(14, btn_top, w, btn_h, style="F")   # filled button
        self.set_xy(18, btn_top + 1.6)
        self.set_text_color(255, 255, 255)
        self.cell(w - 8, 5.5, label, link=TRIAL_URL)

    # ---------- helpers ----------
    def tint(self, c):
        self.set_text_color(*c)

    def fill(self, c):
        self.set_fill_color(*c)

    def draw(self, c):
        self.set_draw_color(*c)

    def sans(self, weight="", size=10):
        self.set_font("DVS", weight, size)

    def _wrap_lines(self, text, width):
        if not text:
            return 1
        words = text.split()
        line, lines = "", 0
        for w in words:
            trial = (line + " " + w).strip()
            if self.get_string_width(trial) <= width:
                line = trial
            else:
                lines += 1
                line = w
        if line:
            lines += 1
        return max(lines, 1)

    # Large page title (brand colour) + plain subtitle
    def page_title(self, title, subtitle, accent):
        # base size
        size = 22
        self.set_xy(14, 28)
        self.sans("B", size)
        self.tint(accent)
        # render a larger title with a smaller raised registered-mark superscript
        self._write_title(title, size, accent)
        self.set_xy(14, 50)
        self.sans("", 13)
        self.tint(BLACK)
        self.multi_cell(182, 7, subtitle, align="L")
        self.set_draw_color(*GREY_L)
        self.set_line_width(0.6)
        self.line(14, 60, 196, 60)

    def _write_title(self, title, size, color):
        """Render title text on ONE line; if it contains the registered mark,
        render it small + raised, with the rest continuing inline after it."""
        idx = title.find("\u00ae")
        if idx == -1:
            self.multi_cell(182, 11, title, align="L")
            return
        base = title[:idx]
        rest = title[idx + 1:]          # anything after the mark
        self.sans("B", size)
        self.set_text_color(*color)
        base_w = self.get_string_width(base)
        self.set_xy(14, 28)
        self.cell(base_w, 11, base)
        # smaller raised registered mark
        mark_size = max(size * 0.55, 8)
        x0 = self.get_x()
        self.sans("B", mark_size)
        self.set_xy(x0, 28 - 1.5)
        self.cell(self.get_string_width("\u00ae") + 1, mark_size / 2.8, "\u00ae")
        if rest:
            rx = self.get_x() + 1
            self.sans("B", size)
            self.set_xy(rx, 28)   # same top line as the base word
            self.cell(182 - (rx - 14), 11, rest, align="L")

    def cta_bar(self, accent, y, line1, line2):
        bh = 34
        # Cap the bar top so the 34mm bar always ends above the footer rule (273.5mm)
        y = min(y, 239)
        self.fill(AC_INDIGO)
        self.rect(14, y, 182, bh, style="F")
        self.fill(accent)
        self.rect(14, y, 6, bh, style="F")
        self.sans("B", 15)
        self.tint(WHITE)
        self.set_xy(26, y + 7)
        self.multi_cell(164, 8, line1)
        self.sans("", 12)
        self.tint(GREY_L)
        self.set_y(y + 18)
        self.set_x(26)
        self.multi_cell(164, 6.5, line2)

    # ---------- cover ----------
    def cover(self):
        self.add_page()
        self.set_auto_page_break(False)
        self.vgrad(0, 0, PAGE_W, PAGE_H, GRAD_TOP, GRAD_BOT)
        # wordmark
        self.set_xy(20, 96)
        self.sans("B", 46)
        self.tint(WHITE)
        self.cell(0, 20, "ViralPeps")
        self.set_xy(20, 122)
        self.sans("B", 26)
        self.tint(WHITE)
        # TrustScore + small raised registered mark + rest
        self.set_text_color(255, 255, 255)
        self.cell(self.get_string_width("TrustScore"), 13, "TrustScore")
        x0 = self.get_x()
        self.sans("B", 15)
        self.set_xy(x0, 122 - 1.5)
        self.cell(self.get_string_width("\u00ae") + 1, 8, "\u00ae")
        self.set_xy(self.get_x() + 1, 122)
        self.sans("B", 26)
        self.cell(0, 13, " for Suppliers")
        # tagline
        self.set_xy(20, 152)
        self.sans("", 14)
        self.tint(GREY_L)
        self.multi_cell(170, 8,
                        "A commission-proof trust badge that tells buyers you're "
                        "verified \u2014 checked, scored and ranked daily on the UK's "
                        "peptide price-comparison site.")
        # simple white card
        self.set_xy(20, 205)
        self.fill(WHITE)
        self.rect(20, 198, 170, 40, style="F")
        self.sans("B", 13)
        self.tint(BLACK)
        self.set_xy(28, 205)
        self.cell(154, 8, "For vendors, by ViralPeps")
        self.sans("", 11)
        self.tint(GREY_D)
        self.set_xy(28, 216)
        self.multi_cell(154, 6,
                        "Get your store independently verified, ranked and "
                        "highlighted \u2014 from a Free Conversion & Trust Widget "
                        "to a paid Audit Certification.")
        # footer row (whitespace anchor)
        self.set_xy(0, PAGE_H - 34)
        self.set_draw_color(WHITE[0], WHITE[1], WHITE[2])
        self.set_line_width(1.2)
        self.line(20, PAGE_H - 44, 190, PAGE_H - 44)
        self.set_xy(20, PAGE_H - 36)
        self.sans("B", 12)
        self.tint(WHITE)
        self.cell(0, 6, "viralpeps.co.uk", align="L")

    # ---------- why a trust score ----------
    def intro_page(self):
        self.add_page()
        self.page_title("Why a TrustScore\u00ae",
                        "Buyers decide on trust, not just price",
                        AC_INDIGO)
        y = 78
        body = [
            ("TrustScore\u00ae wins the sale.",
             "Every supplier sells the same peptides in the same price band. When a "
             "buyer has to pick between them, the one they can verify wins. That's "
             "exactly where ViralPeps comes in: we check and score suppliers every day, "
             "so your Verified badge does the convincing for you."),
            ("AI-Generated Transparent Scoring \u2014 Not Sold, Highest Bidder Does Not Win!",
             "Every TrustScore is built from hard, verifiable signals \u2014 certificates of "
             "analysis, regulatory statements, payment and shipping terms, contact "
             "details, third-party reviews and registered-business identity. We do not "
             "sell scores or let vendors buy their rating, so the badge means something."),
        ]
        for h, txt in body:
            self.sans("B", 15.5)
            self.tint(BLACK)
            self.set_xy(14, y)
            self.multi_cell(182, 8.5, h)
            y = self.get_y() + 2
            self.sans("", 12)
            self.tint(GREY_D)
            self.set_x(14)
            self.multi_cell(182, 6.8, txt)
            y = self.get_y() + 10
        # ways to work with us heading
        self.set_xy(14, y)
        self.sans("B", 16)
        self.tint(BLACK)
        self.cell(0, 8, "Two ways to earn the badge")
        y += 13
        cards = [
            ("Free Conversion & Trust Widget", "Zero cost to start", AC_INDIGO),
            ("Audit Certification", "Paid formal audit", AC_PURPLE),
        ]
        cw, gap = 80, 12
        x_start = 14 + (182 - (2 * cw + 1 * gap)) / 2
        ch = 44
        cards_top = y
        for i, (name, tag, col) in enumerate(cards):
            x = x_start + i * (cw + gap)
            self.fill(WHITE)
            self.rect(x, y, cw, ch, style="F")
            self.set_draw_color(*col)
            self.set_line_width(1.6)
            self.rect(x, y + 4, cw, ch - 8, style="D")
            self.sans("B", 12.5)
            self.tint(BLACK)
            self.set_xy(x + 4, y + 7)
            self.multi_cell(cw - 8, 6.5, name, align="C")
            self.sans("", 10)
            self.tint(GREY_M)
            self.set_xy(x, y + 28)
            self.multi_cell(cw, 6, tag, align="C")
        y = cards_top + ch + 14
        # bottom CTA (placed below the cards, clear of the footer)
        self.cta_bar(AC_INDIGO, y,
                     f"See your score today \u2014 {CONTACT_EMAIL}",
                     "Send us your store URL and we'll run a free, live trust audit worth a 55-point check.")

    def header_block(self, num, name, subtitle, accent):
        """Brand-colour header block. Number rendered inline with title text."""
        self.fill(accent)
        self.rect(0, 0, PAGE_W, 46, style="F")
        # number aligned with the title text on the same line
        self.set_xy(14, 12)
        self.sans("B", 24)
        self.tint(WHITE)
        self.cell(10, 13, f"{num}")
        self.sans("B", 24)
        self.multi_cell(172, 13, name, align="L")
        self.set_xy(14, 30)
        self.sans("", 11.5)
        self.tint(WHITE)
        self.multi_cell(182, 6, subtitle)

    def pack_page(self, num, name, title_tag, subtitle, bestfor, includes, accent, price_label):
        self.add_page()
        self.header_block(num, name, subtitle, accent)
        y = 50
        # Best-for line
        self.set_xy(14, y)
        self.sans("B", 16)
        self.tint(BLACK)
        self.multi_cell(182, 9, f"Best for:  {bestfor}")
        y = self.get_y() + 8
        # What's included heading
        self.set_xy(14, y)
        self.sans("B", 19)
        self.tint(BLACK)
        self.multi_cell(182, 9.5, "What's included")
        y = self.get_y() + 4
        for it, bold in includes:
            self.set_xy(16, y)
            self.fill(accent)
            self.rect(16, y + 2.5, 6.5, 6.5, style="F")
            if bold:
                self.sans("B", 13.5)
            else:
                self.sans("", 13.5)
            self.tint(BLACK)
            self.set_x(29)
            self.multi_cell(167, 7.3, it, align="L")
            y = self.get_y() + 2.0
        y += 9
        # Pricing (plain black on white, price in brand colour, thin rule)
        self.set_draw_color(*accent)
        self.set_line_width(1.0)
        self.line(14, y, 196, y)
        y += 3.5
        # Pricing — label and price on the same baseline, no overlap
        self.set_xy(14, y)
        self.sans("B", 18)
        self.tint(BLACK)
        self.cell(42, 10, "Pricing:")
        self.sans("B", 17)
        self.tint(accent)
        self.multi_cell(140, 10, price_label, align="L")
        y = self.get_y() + 3
        self.set_xy(14, y)
        self.sans("", 12)
        self.tint(GREY_M)
        self.multi_cell(182, 6.5,
                        "Flat monthly fee \u2014 no commissions, no pay-to-win. Verification is a fixed cost, not a share of sales.")
        y = self.get_y() + 3
        # CTA — anchored low so the footer sits at the same level as fuller pages
        self.cta_bar(accent, max(y, 236),
                     f"Ready to get verified?  {CONTACT_EMAIL}",
                     "We'll run your free audit and show you exactly where you score out of 55 before any commitment.")

    def addons_page(self):
        self.add_page()
        self.page_title("TrustScore\u00ae \u00e0 la carte",
                        "Build the exact package that fits your goals",
                        AC_FUSCHIA)
        self.set_xy(14, 76)
        self.sans("", 13)
        self.tint(GREY_D)
        self.multi_cell(182, 7.5,
                        "Already verified or want to go further? These options can be sold "
                        "separately or layered onto any package.")
        addons = [
            ("Promotional Banners",
             "Run targeted banner placements across the site to push a product, a deal or a campaign"),
            ("Featured Product Placement Packages",
             "Bundle options to boost your best sellers on relevant compound and comparison pages"),
        ]
        y = self.get_y() + 16
        bh = 52
        for name, desc in addons:
            self.set_draw_color(*GREY_L)
            self.set_line_width(0.6)
            self.rect(14, y, 182, bh, style="D")
            self.fill(AC_INDIGO)
            self.rect(14, y, 6, bh, style="F")
            self.sans("B", 15)
            self.tint(BLACK)
            self.set_xy(28, y + 10)
            self.multi_cell(160, 8.5, name)
            self.sans("", 12)
            self.tint(GREY_D)
            self.set_xy(28, y + 24)
            self.multi_cell(160, 6.8, desc)
            y += bh + 12
        self.cta_bar(AC_INDIGO, max(y, 236),
                     f"Layer an option onto any package?  {CONTACT_EMAIL}",
                     "Tell us what you're looking for \u2014 we'll build the exact package.")

    def widgets_page(self):
        """Page showing the two embed screenshots with all 3 widgets highlighted."""
        self.add_page()
        self.page_title("See the three widgets on a live page",
                        "Verified bar, Learn widget and TrustScore badge \u2014 installed on a store in one script.",
                        AC_INDIGO)
        y = 78
        # two columns, screenshot ~ 1280:779 (aspect 1.643)
        w = 90
        h = w / 1.643
        gap = 4
        captions = [
            ("Widget demo \u2014 the TrustScore\u00ae card expanded",
             "Floating badge already shows your score at the point of doubt.",
             "tmp/demo-screenshots/trustscore-widget-demo-annotated.png"),
            ("Verified badge package \u2014 all three live",
             "Verified bar (top), Learn widget (per product), TrustScore badge (bottom-right).",
             "tmp/demo-screenshots/verified-demo-annotated.png"),
        ]
        xs = (14, 14 + w + gap)
        labelcols = [("AC_INDIGO",), ("AC_PURPLE",)]
        labels = [AC_INDIGO, AC_PURPLE]
        for i, (cap_title, cap_body, path) in enumerate(captions):
            x = xs[i]
            try:
                self.image(path, x, y, w, h)
            except Exception as e:
                # fall back to a placeholder box if image missing
                self.set_draw_color(*GREY_L)
                self.set_line_width(0.6)
                self.rect(x, y, w, h, style="D")
                self.set_xy(x, y + h / 2 - 4)
                self.sans("", 10)
                self.tint(GREY_D)
                self.cell(w, 8, "screenshot", align="C")
            cy = y + h + 5
            self.sans("B", 11)
            self.tint(labels[i])
            self.set_xy(x, cy)
            self.multi_cell(w, 6.4, cap_title)
            cy = self.get_y() + 2
            self.sans("", 10)
            self.tint(GREY_D)
            self.set_xy(x, cy)
            self.multi_cell(w, 6.0, cap_body)

    def roadmap_page(self):
        self.add_page()
        self.page_title("Coming soon \u2014 the roadmap",
                        "More ways to grow are on their way. Early adopters get first access.",
                        AC_INDIGO)
        y = 78
        items = [
            ("Independent Free Review App", "Help your customers collect genuine, independent reviews."),
            ("Store showcase slots", "Premium, high-visibility placement for your store."),
            ("Bundle placements", "Your products featured inside curated stacks and bundles."),
            ("Seasonal offers", "Campaign slots for launches and seasonal promotions."),
            ("Influencer programs", "Connections to relevant creators \u2014 paid and product-based."),
            ("Consultancy, compliance and growth plans", "Direct guidance on running a trusted peptide business, staying compliant, and scaling."),
            ("AI Tech", "Optimize your store operations and convert more visitors."),
        ]
        for name, desc in items:
            self.sans("B", 15)
            self.tint(BLACK)
            self.set_xy(14, y)
            self.multi_cell(182, 8, name)
            y = self.get_y() + 1
            self.sans("", 12)
            self.tint(GREY_D)
            self.set_x(14)
            self.multi_cell(182, 6.8, desc)
            y = self.get_y() + 8
        # CTA — early adopters benefit from all these services
        self.cta_bar(AC_INDIGO, max(y, 236),
                     "Early adopters benefit from all these services.",
                     "Join the founding wave now and get first access to every new tool as we ship it.")

    def terms_page(self):
        self.add_page()
        self.page_title("Terms & Conditions",
                        "The basics governing your TrustScore\u00ae account",
                        AC_GOLD)
        y = 80
        sections = [
            ("Use of your account",
             ["You are responsible for keeping your store details, contact and payment "
              "information accurate and up to date on your ViralPeps listing.",
              "Accounts are for legitimate sellers, no scammers. Misrepresenting your "
              "business, products & verification status will result in full removal from "
              "ViralPeps and possibly being added to our peptide scammers list."]),
            ("Scoring & verification",
             ["TrustScore\u00ae is computed automatically from publicly verifiable signals "
              "and is not for sale \u2014 it cannot be purchased or influenced by payment "
              "or commissions.",
              "A higher score requires both a strong automated profile and a paid "
              "independent Audit Certification where applicable."]),
            ("Fees & renewal",
             ["Verified and A-la-carte packages are billed monthly and cancel any time.",
              "There is no commission on sales. Verification is a flat fee, never a share of revenue."]),
        ]
        for head, items in sections:
            self.sans("B", 15)
            self.tint(AC_GOLD)
            self.set_xy(14, y)
            self.multi_cell(182, 8, head)
            y = self.get_y() + 3
            self.sans("", 11.5)
            for it in items:
                self.set_xy(14, y)
                self.set_text_color(*GREY_D)
                self.cell(6, 6.4, "\u2022")
                self.set_xy(24, y)
                self.set_text_color(*BLACK)
                self.multi_cell(172, 6.4, it, align="L")
                y = self.get_y()
            y += 9
        # second page: remaining terms
        self.add_page()
        self.page_title("Terms & Conditions (continued)",
                        "The basics governing your TrustScore\u00ae account",
                        AC_GOLD)
        y = 80
        sections2 = [
            ("Content & conduct",
             ["You may not place or claim ads, badges or placements you have not purchased.",
              "Sellers cannot use other competitor widgets or badges which conflict with "
              "ViralPeps or TrustScore\u00ae.",
              "Promotional materials must comply with UK advertising and peptide regulations."]),
            ("Liability",
             ["ViralPeps provides comparison and scoring information as-is. Buyers make "
              "their own purchase decisions with the responsible suppliers they choose."]),
            ("Acceptance",
             ["By listing on ViralPeps and using a TrustScore\u00ae account you accept these "
              "terms. ViralPeps may update them with reasonable notice."]),
        ]
        for head, items in sections2:
            self.sans("B", 15)
            self.tint(AC_GOLD)
            self.set_xy(14, y)
            self.multi_cell(182, 8, head)
            y = self.get_y() + 3
            self.sans("", 11.5)
            for it in items:
                self.set_xy(14, y)
                self.set_text_color(*GREY_D)
                self.cell(6, 6.4, "\u2022")
                self.set_xy(24, y)
                self.set_text_color(*BLACK)
                self.multi_cell(172, 6.4, it, align="L")
                y = self.get_y()
            y += 9
        self.cta_bar(AC_INDIGO, max(y, 236),
                     f"Questions on these terms?  {CONTACT_EMAIL}",
                     "We\u2019re happy to run through the details \u2014 just reach out.")

    def closing_page(self):
        self.add_page()
        self.page_title("Let's get your store verified",
                        "Reach out and we'll run your free trust audit",
                        AC_INDIGO)
        self.set_xy(14, 78)
        self.sans("", 13.5)
        self.tint(GREY_D)
        self.multi_cell(182, 7.5,
            "Every relationship starts with a free 30 day trial. Send us your store and we'll "
            "check it against the same six verification signals, show you your score "
            "against competitors, and agree a short trial before you commit a penny.")
        y = self.get_y() + 14
        rows = [
            ("Website", "viralpeps.co.uk"),
            ("Email", CONTACT_EMAIL),
            ("Verification signals", "COA \u00b7 RUO \u00b7 payments \u00b7 shipping \u00b7 reviews \u00b7 identity"),
        ]
        for label, val in rows:
            self.set_draw_color(*GREY_L)
            self.set_line_width(0.6)
            self.rect(14, y, 182, 24, style="D")
            self.sans("B", 14)
            self.tint(BLACK)
            self.set_xy(22, y + 8)
            self.cell(60, 8, label)
            self.sans("", 14)
            self.tint(AC_INDIGO)
            self.set_x(92)
            self.multi_cell(96, 8, val, align="R")
            y += 30
        y += 10
        self.fill(AC_INDIGO)
        self.rect(14, y, 182, 46, style="F")
        self.fill(AC_INDIGO)
        self.rect(14, y, 6, 46, style="F")
        self.sans("B", 15)
        self.tint(WHITE)
        self.set_xy(26, y + 8)
        self.multi_cell(164, 9, "Let's set it up")
        self.sans("", 11.5)
        self.tint(GREY_L)
        self.set_xy(26, y + 20)
        self.multi_cell(164, 6.5,
                        "Send your store URL and we'll respond with your free score \u2014 "
                        "with a short proposal \u2014 within one working day.")
        self.sans("B", 12.5)
        self.tint(AC_INDIGO)
        self.set_xy(26, y + 34)
        self.multi_cell(164, 7, f"{CONTACT_EMAIL}  \u00b7  viralpeps.co.uk")


def build():
    pdf = PackPDF()
    pdf.cover()
    pdf.intro_page()
    # TIER 1 - renamed Free Conversion Trust Widget, number inline, bold Live TrustScore bullet
    pdf.pack_page(1, "Free Conversion & Trust Widget",
                  "entry", "See your score & start building trust, at zero cost",
                  "every supplier; the low-risk way to get verified and visible today",
                  [
                      ("Live TrustScore\u00ae \u2014 add to achieve higher conversions", True),
                      ("Free Featured Product Placement", False),
                      ("Your store listed in the ViralPeps directory with your current score", False),
                      ("Automated 55 point check on your website", False),
                      ("A clear action list \u2014 exactly what to fix to raise your score", False),
                  ],
                  AC_INDIGO, "Free")
    # TIER 2 - Verified Badge (edited bullets)
    pdf.pack_page(2, "Verified Badge",
                  "workhorse", "A verified trust signal on ViralPeps",
                  "Suppliers ready to be formally checked and listed as verified with highest scores up to 100",
                  [
                      ("Higher free traffic from ViralPeps", False),
                      ("Higher conversion of traffic", False),
                      ("Everything in TIER 1", False),
                      ("Verified Supplier Badge on your website", False),
                      ("Audit Certification - Business check, Payments / Risk Signals", False),
                      ("'Learn' widget \u2014 product breakdowns linked on every product page", False),
                      ("Priority ranking within your category vs. unverified listings", False),
                      ("Published, Unbiased TrustScore\u00ae method link on your profile", False),
                      ("50% off all promotional packages i.e. banners, featured slots, newsletter spots, etc.", False),
                  ],
                  AC_PURPLE, "\u00a350 / month")
    pdf.widgets_page()
    pdf.roadmap_page()
    pdf.addons_page()
    pdf.terms_page()
    pdf.closing_page()
    pdf.output(OUT)
    print("WROTE", OUT, "PAGES", pdf.page_no())


if __name__ == "__main__":
    build()
