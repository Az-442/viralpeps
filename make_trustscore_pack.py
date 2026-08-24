#!/usr/bin/env python3
"""TrustScore Supplier Pack — branded PDF (7 pages). Rendered, centred layout.
ViralPeps · viralpeps.co.uk
Brand: navy #0b1a2e, blue #2563eb, emerald #4ade80, shield #2563eb->#7c3aed.
Style: black/white content, brand colour on headers + CTA bars only. Big body text.
Verbally centred per page (no empty bottom voids). CTA bars anchored below content.
"""
from fpdf import FPDF, XPos, YPos
import os

NAVY   = (11, 26, 46)
BLUE   = (37, 99, 235)
EMER   = (74, 222, 128)
PURPLE = (124, 58, 237)
DARK   = (30, 41, 59)
GREY   = (100, 116, 139)
LIGHT  = (241, 245, 249)
WHITE  = (255, 255, 255)

PAGE_W, PAGE_H = 210, 297
MARGIN = 20
CONTENT_W = PAGE_W - 2 * MARGIN  # 170
FONT_DIR = "/System/Library/Fonts/Supplemental"
REG = FONT_DIR + "/Arial.ttf"
BLD = FONT_DIR + "/Arial Bold.ttf"
ITA = FONT_DIR + "/Arial Italic.ttf"
LOGO = "/Users/time4you/viralpeps/public/images/viralpeps-logo.png"


def wrap_count(pdf, text, width, font, size, gap):
    pdf.set_font(font, "", size)
    words = text.split()
    if not words:
        return 1.0
    line, lines = "", 1
    for w in words:
        t = (line + " " + w).strip()
        if pdf.get_string_width(t) <= width:
            line = t
        else:
            lines += 1
            line = w
    return lines


class TrustPDF(FPDF):
    def __init__(self):
        super().__init__(unit="mm", format="A4")
        self.add_font("Ar", "", REG)
        self.add_font("Ar", "B", BLD)
        self.add_font("Ar", "I", ITA)
        self.set_auto_page_break(False)
        self.set_margins(MARGIN, MARGIN, MARGIN)

    def header(self):
        if self.page_no() == 1:
            return
        self.set_fill_color(*NAVY)
        self.rect(0, 0, PAGE_W, 16, "F")
        try:
            self.image(LOGO, x=MARGIN, y=3, w=14)
        except Exception:
            pass
        self.set_xy(PAGE_W - MARGIN - 60, 4.5)
        self.set_font("Ar", "B", 8)
        self.set_text_color(*WHITE)
        self.cell(60, 7, "TRUSTSCORE SUPPLIER PACK", align="R")
        self.set_y(20)

    def footer(self):
        self.set_y(-14)
        self.set_font("Ar", "", 7.5)
        self.set_text_color(*GREY)
        self.set_draw_color(*GREY)
        self.line(MARGIN, PAGE_H - 19, PAGE_W - MARGIN, PAGE_H - 19)
        self.cell(0, 10, "viralpeps.co.uk  ·  TrustScore Supplier Pack", new_x=XPos.LMARGIN, new_y=YPos.TOP)
        self.cell(0, 10, f"Page {self.page_no()}", align="R", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    def shield(self, x, y, size):
        s = size
        def X(v): return x + (v / 48.0) * s
        def Y(v): return y + (v / 48.0) * s
        self.set_fill_color(*BLUE)
        self.polygon([(X(6), Y(9)), (X(42), Y(9)), (X(42), Y(24)), (X(24), Y(44)), (X(6), Y(24))], style="F")
        self.set_fill_color(*PURPLE)
        self.polygon([(X(6), Y(9)), (X(42), Y(9)), (X(42), Y(16)), (X(20), Y(26))], style="F")
        self.set_draw_color(*EMER)
        self.set_line_width(0.5)
        self.line(X(18), Y(24), X(22), Y(28))
        self.line(X(22), Y(28), X(30), Y(19))

    def page_title(self, num, title, subtitle=""):
        self.set_x(MARGIN)
        self.set_fill_color(*NAVY)
        self.rect(MARGIN, self.get_y(), 5, 20, "F")
        self.set_font("Ar", "B", 12)
        self.set_text_color(*GREY)
        self.set_xy(MARGIN + 10, self.get_y())
        self.cell(0, 6, f"PAGE {num}", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_x(MARGIN + 10)
        self.set_font("Ar", "B", 21)
        self.set_text_color(*NAVY)
        self.cell(0, 11, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        if subtitle:
            self.set_x(MARGIN + 10)
            self.set_font("Ar", "I", 11)
            self.set_text_color(*GREY)
            self.multi_cell(CONTENT_W - 10, 6, subtitle)
        self.set_y(self.get_y() + 4)

    def section_head(self, txt, color=NAVY):
        self.set_x(MARGIN)
        self.set_font("Ar", "B", 13)
        self.set_text_color(*color)
        self.multi_cell(CONTENT_W, 7, txt)
        self.set_y(self.get_y() + 1)

    def body(self, txt, size=13, color=DARK, gap=5.5, after=1.5):
        cw = CONTENT_W
        self.set_x(MARGIN)
        self.set_font("Ar", "", size)
        self.set_text_color(*color)
        self.multi_cell(cw, gap, txt)
        self.set_y(self.get_y() + after)

    def bullet(self, txt, size=13, gap=5.5):
        cx = MARGIN + 5
        self.set_x(cx)
        self.set_fill_color(*BLUE)
        self.rect(MARGIN, self.get_y() + 1.2, 3, 3, "F")
        self.set_font("Ar", "", size)
        self.set_text_color(*DARK)
        self.multi_cell(CONTENT_W - 12, gap, txt)
        self.set_y(self.get_y() + 0.5)


def measure_pages():
    """Return a list (one per content page) of dicts describing their blocks and
    heights, so each page can be vertically centred. Each block: (kind, payload)."""
    return None  # helpers below compose pages from a block list instead


def _render_blocks(pdf, blocks, start_y, gap=7.5):
    """Render the block list starting at start_y. Returns the final y position."""
    y = start_y
    for b in blocks:
        kind = b[0]
        if kind == "title":
            num, title, sub = b[1], b[2], b[3]
            pdf.set_y(y)
            pdf.set_fill_color(*NAVY); pdf.rect(MARGIN, y, 5, 20, "F")
            pdf.set_font("Ar", "B", 12); pdf.set_text_color(*GREY)
            pdf.set_xy(MARGIN + 10, y); pdf.cell(0, 6, f"PAGE {num}", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            pdf.set_x(MARGIN + 10)
            pdf.set_font("Ar", "B", 21); pdf.set_text_color(*NAVY)
            pdf.cell(0, 11, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            if sub:
                pdf.set_x(MARGIN + 10); pdf.set_font("Ar", "I", 11); pdf.set_text_color(*GREY)
                pdf.multi_cell(CONTENT_W - 10, 6, sub)
            y = pdf.get_y() + 4
        elif kind == "head":
            colr = b[2] if len(b) > 2 else NAVY
            pdf.set_y(y); pdf.set_x(MARGIN)
            pdf.set_font("Ar", "B", 13); pdf.set_text_color(*colr)
            pdf.multi_cell(CONTENT_W, 7, b[1]); y = pdf.get_y() + 1.5
        elif kind == "body":
            size = b[2] if len(b) > 2 else 13
            colr = b[3] if len(b) > 3 else DARK
            g2 = b[4] if len(b) > 4 else gap
            af = b[5] if len(b) > 5 else 2
            pdf.set_y(y); pdf.set_x(MARGIN)
            pdf.set_font("Ar", "", size); pdf.set_text_color(*colr)
            pdf.multi_cell(CONTENT_W, g2, b[1]); y = pdf.get_y() + af
        elif kind == "bullet":
            pdf.set_y(y); pdf.set_x(MARGIN + 5)
            pdf.set_fill_color(*BLUE); pdf.rect(MARGIN, y + 1.2, 3, 3, "F")
            pdf.set_font("Ar", "", 13); pdf.set_text_color(*DARK)
            pdf.multi_cell(CONTENT_W - 12, 7.5, b[1]); y = pdf.get_y() + 0.8
        elif kind == "table":
            headers, rows, colw = b[1], b[2], b[3]
            pdf.set_y(y); pdf.set_font("Ar", "B", 10); pdf.set_fill_color(*NAVY); pdf.set_text_color(*WHITE)
            pdf.set_x(MARGIN)
            for i, hh in enumerate(headers):
                pdf.cell(colw[i], 8, hh, border=1, align="C", fill=True, new_x=XPos.RIGHT, new_y=YPos.TOP)
            pdf.ln()
            for ri, row in enumerate(rows):
                pdf.set_fill_color(*LIGHT if ri % 2 == 0 else WHITE); pdf.set_text_color(*DARK); pdf.set_font("Ar", "", 10)
                pdf.set_x(MARGIN)
                pdf.cell(colw[0], 7.5, "  " + row[0], border=1, fill=True, new_x=XPos.RIGHT, new_y=YPos.TOP)
                pdf.cell(colw[1], 7.5, "  " + row[1], border=1, align="C", fill=True, new_x=XPos.RIGHT, new_y=YPos.TOP)
                pdf.ln()
            y = pdf.get_y() + 4
        elif kind == "cta":
            text, accent, h = b[1], b[2], b[3]
            pdf.set_y(y); pdf.set_fill_color(*NAVY); pdf.rect(MARGIN, y, CONTENT_W, h, "F")
            pdf.set_fill_color(*accent); pdf.rect(MARGIN, y, 4, h, "F")
            pdf.set_font("Ar", "B", 12); pdf.set_text_color(*WHITE)
            pdf.set_xy(MARGIN + 10, y + (h - 6) / 2); pdf.multi_cell(CONTENT_W - 16, 6.5, text)
            y = pdf.get_y() + h
        elif kind == "spacer":
            y += b[1]
    return y


def render_content(pdf, blocks):
    """Vertically centre a page's content using TRUE rendered height.
    Measures the real block extent in a throwaway FPDF (exact fpdf metrics),
    then renders the real page once at the computed centring offset.
    """
    USE = TrustPDF  # throwaway instance (same class/metrics)
    m = TrustPDF()
    m.add_page()
    usable_top = 44.0
    usable_bottom = PAGE_H - 25.0       # just above footer rule
    start_mark = usable_top
    end = _render_blocks(m, blocks, start_mark)
    span = end - start_mark
    available = usable_bottom - usable_top
    shift = max(0, (available - span) / 2)
    _render_blocks(pdf, blocks, usable_top + shift)
    if os.environ.get("TS_DEBUG"):
        print(f"span={span:.1f} available={available:.1f} shift={shift:.1f}mm")


def build():
    pdf = TrustPDF()

    # ============ PAGE 1 — COVER ============
    pdf.add_page()
    pdf.set_fill_color(*NAVY); pdf.rect(0, 0, PAGE_W, PAGE_H, "F")
    pdf.set_fill_color(*BLUE); pdf.rect(0, PAGE_H - 14, PAGE_W, 14, "F")
    pdf.set_fill_color(*PURPLE); pdf.rect(0, PAGE_H - 14, PAGE_W * 0.35, 14, "F")
    pdf.image(LOGO, x=14, y=18, w=30)
    pdf.shield(PAGE_W - 46, 18, 28)
    # centre title block vertically against the navy field
    pdf.set_xy(14, 108)
    pdf.set_font("Ar", "B", 40); pdf.set_text_color(*WHITE)
    pdf.multi_cell(180, 17, "TrustScore")
    pdf.set_x(14)
    pdf.set_font("Ar", "B", 18); pdf.set_text_color(*EMER)
    pdf.cell(180, 9, "Supplier Pack", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.ln(5)
    pdf.set_x(14)
    pdf.set_font("Ar", "", 13); pdf.set_text_color(200, 210, 225)
    pdf.multi_cell(165, 7, "The independent 0-100 rating that makes UK peptide suppliers look legitimate - so buyers trust you, and buy.")
    # three benefit line
    pdf.set_xy(14, 190)
    pdf.set_font("Ar", "B", 12); pdf.set_text_color(*EMER)
    pdf.cell(180, 7, "Independent      ·      Not pay-to-win      ·      Backed by a published method", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.set_xy(14, PAGE_H - 38)
    pdf.set_font("Ar", "", 11); pdf.set_text_color(180, 195, 215)
    pdf.cell(180, 6, "viralpeps.co.uk  ·  trust built from scratch")

    # ============ PAGE 2 — HOOK ============
    pdf.add_page()
    render_content(pdf, [
        ("title", "02", "A trust badge that converts - free.",
         "An independent, audited TrustScore floating on your store builds confidence at the exact moment of doubt - checkout."),
        ("head", "For your buyers, two conversion flows:"),
        ("body", "1.  They land on YOUR site. They see the verified TrustScore badge, confidence builds, and they are far more comfortable spending money.", 13),
        ("body", "2.  They arrive FROM ViralPeps. We send you buyers already carrying independent verification and trust - they arrive pre-sold.", 13),
        ("spacer", 3),
        ("head", "The build-it-from-scratch advantage"),
        ("body", "We are a pioneer building a trust standard for this industry from the ground up. Legitimate sellers want it - almost all say yes. The more verified stores we onboard, the more comfortable buyers become buying online at all. That lifts the whole market, and you are in on the start of it.", 13),
        ("spacer", 5),
        ("cta", "Get in at the start - the founding wave of TrustScore sellers.", EMER, 16),
    ])

    # ============ PAGE 3 — WHAT TRUSTSCORE IS ============
    pdf.add_page()
    render_content(pdf, [
        ("title", "03", "What is TrustScore?",
         "An independent 0-100 ranking of how transparent and verifiable a UK supplier is."),
        ("spacer", 2),
        ("head", "The ranking, simply"),
        ("body", "Each supplier is scored out of 100 across the signals buyers actually care about.", 13),
        ("spacer", 2),
        ("table", ["Signal", "Max pts"], [
            ["Label / lab results (COA)", "25"],
            ["Genuine reviews", "10"],
            ["Live contact", "10"],
            ["Tracked shipping", "5"],
            ["Research-use compliance", "5"],
            ["Free TrustScore widget on your site", "20"],
            ["Verified business identity", "+10 to +25"],
        ], [CONTENT_W - 40, 40]),
        ("spacer", 2),
        ("head", "How customers use it"),
        ("body", "1.  On your site: buyer sees the badge, confidence builds, conversion rises.", 13),
        ("body", "2.  From ViralPeps: buyer arrives carrying verification and trust - pre-sold.", 13),
        ("body", "Independent trust-badge studies show verified stores lift conversion by roughly 10-30%. Every verified signal removes a reason to hesitate - and hesitation is where sales are lost.", 12, GREY),
    ])

    # ============ PAGE 4 — WHERE YOU SIT ============
    pdf.add_page()
    render_content(pdf, [
        ("title", "04", "Where you sit today",
         "Every supplier starts with a score. Here is the gap between where you are and the top band."),
        ("spacer", 2),
        ("head", "Your store, scored independently"),
        ("body", "Your TrustScore is calculated automatically from what you already publish - COA, reviews, shipping, contact, compliance. No cost, no work from you.", 13),
        ("spacer", 2),
        ("cta", "Your score today:  XX / 100        (placeholder - appears once you claim your profile)", BLUE, 18),
        ("spacer", 3),
        ("head", "Why push for the highest score you can earn"),
        ("body", "A higher score means higher conversions. Every point lifts you up the bands and past competitors. And here is the constant: buyers gravitate to the store that proves it - not the one that just claims it. The verified business signal is the difference between blending in and standing out.", 13),
        ("spacer", 4),
        ("cta", "See where your store ranks - claim your profile and get your free score.", BLUE, 16),
    ])

    # ============ PAGE 5 — THE OFFER ============
    pdf.add_page()
    render_content(pdf, [
        ("title", "05", "The offer", "Free first. Then a certification system that takes you to the top band."),
        ("spacer", 2),
        ("head", "1.  Free TrustScore widget (start here)", EMER),
        ("body", "One line of code on your site. You get a live, independent trust signal that converts, scored +20, and a free link back to ViralPeps. No cost, no card, no commitment.", 13),
        ("spacer", 3),
        ("head", "2.  Certification Audit - £50/month", BLUE),
        ("body", "Manual business verification, confirmed by email, with a live score breakdown and a verified-business checkmark on your profile. Everything included:", 13),
        ("spacer", 1),
        ("bullet", "Audit Certification - Business check, Payments / Risk Signals"),
        ("bullet", "Verified Supplier Badge on your website"),
        ("bullet", "'Learn' widget - links to our product breakdowns so buyers can learn about the product and decide if it's right for them. Added to each product page."),
        ("bullet", "Premium seller directory badge on ViralPeps"),
        ("bullet", "1 featured product placement"),
        ("bullet", "75% off all a-la-carte advertising (banners, featured placements, editor's picks, newsletter)"),
        ("bullet", "Free traffic diverted to your profile"),
        ("spacer", 3),
        ("head", "3.  Early Adopter", PURPLE),
        ("body", "This is the founding wave. We are building TrustScore to add real value to sellers, grow a larger seller community, and give you more tools as it scales. The sellers who join now shape the standard and get first access to everything we ship.", 13),
        ("spacer", 6),
        ("cta", "Free setup.  Free 30-day trial.   Increase conversions from day one.", EMER, 16),
    ])

    # ============ PAGE 6 — COMING SOON ============
    pdf.add_page()
    roadmap = [
        ("Independent Free Review App", "Help your customers collect genuine, independent reviews."),
        ("Store showcase slots", "Premium, high-visibility placement for your store."),
        ("Bundle placements", "Your products featured inside curated stacks and bundles."),
        ("Seasonal offers", "Campaign slots for launches and seasonal promotions."),
        ("Influencer programs", "Connections to relevant creators - paid and product-based."),
        ("Consultancy, compliance and growth plans", "Direct guidance on running a trusted supplement business, staying compliant, and scaling."),
    ]
    blocks = [
        ("title", "06", "Coming soon - the roadmap", "More ways to grow are on their way. Early adopters get first access."),
        ("spacer", 2),
    ]
    for name, desc in roadmap:
        blocks.append(("head", "- " + name))
        blocks.append(("body", desc, 12, GREY, 5.5, 1))
    blocks.append(("spacer", 4))
    blocks.append(("cta", "Early adopters will benefit from all these services.", PURPLE, 16))
    render_content(pdf, blocks)

    # ============ PAGE 7 — INDEPENDENT + CTA ============
    pdf.add_page()
    render_content(pdf, [
        ("title", "07", "Independent - not pay-to-win", "Our credibility is the product. We protect it."),
        ("spacer", 2),
        ("bullet", "Scores are never for sale. You cannot buy points."),
        ("bullet", "Automated signals (COA, reviews, contact, shipping, compliance) cannot be bought or gamed."),
        ("bullet", "The highest-paying shop does not get the highest score - the most verifiable one does."),
        ("bullet", "A store at 55 outranks a store at 45 that pays more. Verifiably, and publicly."),
        ("bullet", "Published methodology. Full transparency on how every score is built."),
        ("spacer", 5),
        ("head", "Proof of the model"),
        ("body", "21 of the 61 UK suppliers we track already publish a verifiable registered business. Almost all want the legitimacy we offer - that is why the founder early-adopter wave is moving fast.", 13),
        ("spacer", 6),
        ("cta", "Start free.  Grow confident.\n1.  Install the free widget (one line of code)   2.  Start your free 30-day certification trial  -  increase conversions from day one.\nLet's make your store the one buyers trust.", BLUE, 30),
    ])

    out = "/Users/time4you/viralpeps/trustscore-supplier-pack.pdf"
    pdf.output(out)
    print("WROTE", out)


if __name__ == "__main__":
    build()
