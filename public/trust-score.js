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
  var API = BASE + "/api/trust-score?slug=" + encodeURIComponent(supplier);

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
    "#tsCard{position:fixed;z-index:999999;width:280px;background:#ffffff;color:#111827;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.25);border:1px solid #e5e7eb;padding:16px;display:none;font-size:13px}",
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

    // Floating badge
    var badge = document.createElement("div");
    badge.id = "tsBadge";
    var ticks = Array.isArray(data.ticks) ? data.ticks.length : 0;
    badge.innerHTML =
      shieldSVG(26) +
      '<span>TrustScore&nbsp;<b>' + data.score + '</b>/' + data.max + '</span>' +
      (isVerified ? '<span style="color:#4ade80">✓</span>' : '') +
      '<span class="ts-arrow">›</span>';

    // Hover card
    var card = document.createElement("div");
    card.id = "tsCard";
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
    var show = function () { card.classList.add("ts-open"); var c = card.getBoundingClientRect(); c.width; };
    var hide = function () { card.classList.remove("ts-open"); };
    wrap.addEventListener("mouseenter", show);
    wrap.addEventListener("mouseleave", hide);
    badge.addEventListener("click", function () {
      card.classList.toggle("ts-open");
    });
  }
})();
