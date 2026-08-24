/* ViralPeps Verified Badge — sitewide (viralpeps.co.uk)
 *
 * Single script that drops a compact "Verified by ViralPeps" badge at the key
 * purchase points: top announcement bar (all pages), product title, and
 * add-to-cart / checkout area.
 *
 * Install once in <body> (e.g. via theme, not just one page):
 *   <script src="https://www.viralpeps.co.uk/verified.js"
 *           data-supplier="YOUR-SLUG" defer></script>
 *
 * Lightweight: one tiny pill, no hover card, no score fetch required (optional).
 */
(function () {
  var script = document.currentScript;
  var supplier = (script && script.getAttribute("data-supplier")) || "";
  if (!supplier) { console.warn("[Verified] missing data-supplier"); return; }

  var BASE = "https://www.viralpeps.co.uk";

  // Minimal styles
  var css = [
    "#vpVerified{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif}",
    ".vp-v-widget{display:inline-flex;align-items:center;gap:6px;line-height:1;font-weight:700}",
    ".vp-v-widget svg{flex-shrink:0}",
    /* top announcement bar version */
    ".vp-v-bar{position:relative;text-align:center;padding:6px 12px;font-size:12.5px;background:#0b1a2e;color:#fff;border-top:1px solid #2563eb}",
    ".vp-v-bar a{color:#4ade80;text-decoration:none;font-weight:700}",
    ".vp-v-bar a:hover{text-decoration:underline}"
  ].join("\n");
  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);

  function checkSVG() {
    return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 2.6V11c0 5.2-3.4 9.4-7 11-3.6-1.6-7-5.8-7-11V4.6L12 2z" fill="#4ade80"/><path d="M8.5 12l2.4 2.4L15.5 9.5" stroke="#065f46" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  function shieldSVG() {
    return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2l7 2.6V11c0 5.2-3.4 9.4-7 11-3.6-1.6-7-5.8-7-11V4.6L12 2z" fill="#2563eb"/><path d="M8.5 12l2.4 2.4L15.5 9.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  var barHtml = function () {
    return '<div class="vp-v-bar vp-v-widget" id="vpVerifiedBar">' + shieldSVG() +
      ' <span>Verified Supplier</span> · ' +
      '<a href="' + BASE + '/vendors/' + encodeURIComponent(supplier) + '" target="_blank" rel="noopener">See score</a></div>';
  };

  var injected = 0;
  function mount() {
    // 1. Top announcement bar — sitewide, visible on every page
    var first = document.body.firstElementChild;
    if (first && !first.id) {
      var bar = document.createElement("div");
      bar.innerHTML = barHtml();
      first.parentNode.insertBefore(bar.firstElementChild, first);
      injected++;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
