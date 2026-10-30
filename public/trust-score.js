/* TrustScore embed widget — ViralPeps (viralpeps.co.uk)
 *
 * How to install on YOUR site (footer):
 *   <script src="https://www.viralpeps.co.uk/trust-score.js"
 *           data-supplier="YOUR-SLUG" data-position="bottom-right" defer></script>
 *
 * Renders a small floating badge (bottom-right by default) that expands on
 * hover to show your independent TrustScore + verified ticks, and links back
 * to your ViralPeps profile for full verification proof.
 *
 * Only suppliers verified by ViralPeps get a score. Optional data-position:
 * bottom-right (default) | bottom-left | top-right | top-left.
 *
 * ---------------------------------------------------------------------------
 * CRAWLABLE BACKLINK (v3 — 30 Oct 2026)
 * ---------------------------------------------------------------------------
 * v2 put its only outbound <a> inside the hover card, which is display:none
 * until a user hovers. A link that only exists in the live DOM after a JS
 * interaction is weak-to-invisible for crawlers.
 *
 * v3 fixes that two ways:
 *
 * 1. STATIC ANCHOR — the moment this script executes it inserts a real
 *    <a href="https://www.viralpeps.co.uk/vendors/SLUG"> into the page body,
 *    in normal flow, with `rel="noopener"` only (NOT nofollow, NOT sponsored).
 *    It is present in the rendered DOM immediately, needs no hover, is a
 *    followable link, and carries descriptive anchor text.
 *
 * 2. NOSCRIPT FALLBACK — a <noscript> copy of the same anchor is inserted too,
 *    so the link is present even when JavaScript is disabled or fails.
 *
 * Why not server-rendered HTML? The installer pastes a <script> tag, so there
 * is no HTML of ours on their page. The script executes in <head> (it is
 * `defer`, so effectively before DOMContentLoaded) and must therefore wait for
 * <body> itself. `defer` guarantees parentNode === <head> here.
 *
 * The anchor is deliberately visible-but-subtle (footer credit), NOT hidden:
 * hidden links are treated as deceptive by Google and can earn a manual action
 * against BOTH sites.
 */
(function () {
  var script = document.currentScript;
  var supplier = (script && script.getAttribute("data-supplier")) || "";
  var position = (script && script.getAttribute("data-position")) || "bottom-right";

  if (!supplier) {
    console.warn("[TrustScore] Missing data-supplier attribute. Example:",
      '<script src="https://www.viralpeps.co.uk/trust-score.js" data-supplier="uk-peptides" defer></script>');
    return;
  }

  var BASE = "https://www.viralpeps.co.uk";
  var PROFILE_URL = BASE + "/vendors/" + encodeURIComponent(supplier);
  var API = BASE + "/api/trust-score?slug=" + encodeURIComponent(supplier);

  function injectStaticBacklink(scoreText) {
    // Real, crawlable <a href> in normal document flow. rel="noopener" only —
    // this link IS meant to pass equity, so no nofollow / sponsored.
    var a = document.createElement("a");
    a.href = PROFILE_URL;
    a.className = "ts-static-backlink";
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
    a.setAttribute("aria-label",
      "Verified research supplier profile: independent TrustScore from ViralPeps");
    a.textContent = scoreText
      ? "Verified research supplier \u2014 independent TrustScore " + scoreText + " on ViralPeps"
      : "Verified research supplier \u2014 independent TrustScore on ViralPeps";
    // Visible but unobtrusive: a footer credit line, not a hidden link.
    a.style.cssText =
      "display:block;position:relative;z-index:1;margin:10px auto;" +
      "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;" +
      "font-size:11px;line-height:1.5;color:#6b7280;text-decoration:none;text-align:center;" +
      "max-width:520px;padding:0 12px;";
    a.addEventListener("mouseenter", function () { a.style.textDecoration = "underline"; });
    a.addEventListener("mouseleave", function () { a.style.textDecoration = "none"; });

    // <noscript> copy — present even if JS never runs on a later page load.
    var ns = document.createElement("noscript");
    ns.innerHTML = '<a href="' + PROFILE_URL + '" rel="noopener">' +
      'Verified research supplier \u2014 independent TrustScore on ViralPeps</a>';

    // The script is `defer`, so it runs with parentNode === <head>. Append to
    // <body> when it exists, otherwise wait for DOMContentLoaded.
    function place() {
      var mount = document.body || document.documentElement;
      mount.appendChild(a);
      mount.appendChild(ns);
      a.setAttribute("data-ts-backlink", "1");
    }
    if (document.body) {
      place();
    } else if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", place);
    } else {
      place();
    }
  }

  var posStyles = {
    "bottom-right": { bottom: "18px", right: "18px" },
    "bottom-left":  { bottom: "18px", left: "18px" },
    "top-right":    { top: "18px", right: "18px" },
    "top-left":     { top: "18px", left: "18px" },
  }[position] || { bottom: "18px", right: "18px" };

  // Inject lightweight styles (namespaced to avoid clobbering host site)
  var css = [
    "#tsBadgeWrap{position:fixed;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.4}",
    "#tsBadge{display:flex;align-items:center;gap:8px;background:#0b1a2e;color:#fff;border-radius:9999px;padding:8px 14px 8px 8px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.12);font-size:13px;font-weight:600;transition:transform .15s ease,box-shadow .15s ease}",
    "#tsBadge:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,0,0,.3)}",
    "#tsBadge .ts-arrow{color:#9ca3af;font-size:11px;margin-left:2px}",
    "#tsCard{position:absolute;z-index:999999;width:min(280px,calc(100vw - 36px));background:#ffffff;color:#111827;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.25);border:1px solid #e5e7eb;padding:16px;display:none;font-size:13px}",
    "#tsCard.ts-open{display:block}",
    "#tsCard .ts-head{display:flex;align-items:center;gap:10px;margin-bottom:10px}",
    "#tsCard .ts-score{font-size:30px;font-weight:800;line-height:1}",
    "#tsCard .ts-meta{font-size:11px;color:#6b7280}",
    "#tsCard .ts-row{font-size:11px;color:#6b7280;margin-top:6px}",
    "#tsCard .ts-tick{color:#16a34a;font-weight:700}",
    "#tsCard .ts-check{display:inline-flex;align-items:center;gap:4px;color:#16a34a;font-size:11px;font-weight:700;margin-top:2px}",
    "#tsCard .ts-cta{display:block;text-align:center;margin-top:12px;background:#2563eb;color:#fff;text-decoration:none;font-weight:700;font-size:12px;padding:9px 12px;border-radius:9px}",
    "#tsCard .ts-cta:hover{background:#1d4ed8}",
    "#tsCard .ts-powered{text-align:center;font-size:10px;color:#9ca3af;margin-top:10px}",
    "#tsBadge svg{flex-shrink:0}"
  ].join("\n");

  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);

  // Static backlink first — it must not depend on the API call succeeding.
  injectStaticBacklink(null);

  // Fetch the score
  fetch(API)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.error) { console.warn("[TrustScore]", data.error); return; }
      render(data);
    })
    .catch(function (e) { console.warn("[TrustScore] Could not load score:", e); });

  function shieldSVG(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="tsg" x1="0" y1="0" x2="48" y2="48"><stop stop-color="#2563eb"/><stop offset="0.5" stop-color="#6366f1"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs><path d="M24 2l18 7v13c0 11-8 20-18 24C14 42 6 33 6 22V9l18-7z" fill="url(#tsg)"/><path d="M19 24l3.5 3.5L29 21" stroke="#4ade80" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function render(data) {
    var isVerified = data.domainVerified === true || data.embedEnabled === true;

    // Upgrade the static backlink with the real score once it is known.
    var existing = document.querySelector("a.ts-static-backlink");
    if (existing && data.score) {
      existing.textContent = "Verified research supplier \u2014 independent TrustScore " +
        data.score + "/" + data.max + " on ViralPeps";
    }

    // Floating badge
    var badge = document.createElement("div");
    badge.id = "tsBadge";
    badge.innerHTML =
      shieldSVG(26) +
      '<span>TrustScore&nbsp;<b>' + data.score + '</b>/' + data.max + '</span>' +
      (isVerified ? '<span style="color:#4ade80">✓</span>' : '') +
      '<span class="ts-arrow">›</span>';

    // Hover card
    var card = document.createElement("div");
    card.id = "tsCard";
    // Anchor the card to the badge corner so it opens inside the viewport.
    // Bottom positions open upward; top positions open downward.
    var cardPos = {
      "bottom-right": { right: "0", bottom: "calc(100% + 12px)" },
      "bottom-left":  { left: "0",  bottom: "calc(100% + 12px)" },
      "top-right":    { right: "0", top: "calc(100% + 12px)" },
      "top-left":     { left: "0",  top: "calc(100% + 12px)" },
    }[position] || { right: "0", bottom: "calc(100% + 12px)" };
    Object.assign(card.style, cardPos);
    var tickList = Array.isArray(data.ticks)
      ? data.ticks.map(function (t) {
          return '<div class="ts-tick">✓ ' + t + '</div>';
        }).join("")
      : "";

    card.innerHTML =
      '<div class="ts-head">' + shieldSVG(34) +
      '<div><div class="ts-score">' + data.score + '<span style="font-size:14px;color:#9ca3af">/' + data.max + '</span></div>' +
      '<div class="ts-meta">Independent TrustScore</div></div></div>' +
      (isVerified
        ? '<div class="ts-check">✓ Verified domain &amp; business</div>'
        : '<div class="ts-row">Listed on ViralPeps</div>') +
      (tickList ? '<div style="margin-top:8px">' + tickList + '</div>' : '') +
      '<a class="ts-cta" href="' + data.profileUrl + '" target="_blank" rel="noopener">See full verification →</a>' +
      '<div class="ts-powered">Powered by ViralPeps</div>';

    // Wrap in fixed container
    var wrap = document.createElement("div");
    wrap.id = "tsBadgeWrap";
    Object.assign(wrap.style, posStyles);
    wrap.appendChild(badge);
    wrap.appendChild(card);
    document.body.appendChild(wrap);

    // Hover / click toggle
    var show = function () { card.classList.add("ts-open"); };
    var hide = function () { card.classList.remove("ts-open"); };
    wrap.addEventListener("mouseenter", show);
    wrap.addEventListener("mouseleave", hide);
    badge.addEventListener("click", function () {
      card.classList.toggle("ts-open");
    });
  }
})();
