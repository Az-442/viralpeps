/* TrustScore "Learn" widget — ViralPeps (viralpeps.co.uk)
 *
 * Add a "Learn about this product" button to product pages that links to the
 * independent ViralPeps breakdown so buyers can read research before they buy.
 *
 * Install on a product page (body):
 *   <script src="https://www.viralpeps.co.uk/learn.js"
 *           data-supplier="YOUR-SLUG"
 *           data-product="bpc-157"         (optional: viralpeps slug for the breakdown)
 *           data-product-name="BPC-157"    (optional: label override)
 *           defer></script>
 *
 * Auto-detects the product by scanning the host page for a known product
 * (from /api/trust-score products list) when data-product is omitted.
 */
(function () {
  var script = document.currentScript;
  var supplier = (script && script.getAttribute("data-supplier")) || "";
  var product = (script && script.getAttribute("data-product")) || "";
  var productName = (script && script.getAttribute("data-product-name")) || product;

  var BASE = "https://www.viralpeps.co.uk";

  // Namespaced styles — won't clobber host site
  var css = [
    "#vpLearn{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.4}",
    "#vpLearn .vn-learn-btn{display:inline-flex;align-items:center;gap:8px;background:#ffffff;color:#0b1a2e;border:1.5px solid #2563eb;border-radius:10px;padding:10px 16px;font-size:14px;font-weight:700;cursor:pointer;text-decoration:none;transition:all .15s ease;box-shadow:0 2px 8px rgba(37,99,235,.12)}",
    "#vpLearn .vn-learn-btn:hover{background:#2563eb;color:#fff;transform:translateY(-1px);box-shadow:0 6px 16px rgba(37,99,235,.25)}",
    "#vpLearn .vn-learn-btn svg{flex-shrink:0}",
    "#vpLearn .vn-tag{font-size:11px;color:#6b7280;margin-top:6px;font-weight:600}",
    "#vpLearn .vn-tag a{color:#2563eb;text-decoration:none;font-weight:700}",
    "#vpLearn .vn-tag a:hover{text-decoration:underline}"
  ].join("\n");
  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);

  function bookSVG() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5.5C10.5 4.5 8.3 4 5 4v14c3.3 0 5.5.5 7 1.5 1.5-1 3.7-1.5 7-1.5V4c-3.3 0-5.5.5-7 1.5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 5.5V19.5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  }

  // Resolve the viralpeps product breakdown URL
  function resolve(productSlug) {
    return BASE + "/research/" + (productSlug ? productSlug.replace(/^\/+|\/+$/g, "") : "");
  }

  // Try to auto-detect the product from common page URLs / elements
  function detectProduct() {
    if (product) return product;
    // Product slug from URL if present (shopify/woocommerce product paths)
    var m = window.location.pathname.match(/\/(?:products|product|collections\/[^/]+\/products)\/([^/?#]+)/);
    if (m) return m[1];
    return "";
  }

  var resolved = detectProduct();
  var slug = resolved || product;
  var label = productName || resolved || "this product";

  // Inject the button somewhere sensible: after the product title or before add-to-cart
  function mount() {
    var wrap = document.createElement("div");
    wrap.id = "vpLearn";
    var href = resolve(slug);
    wrap.innerHTML =
      '<a class="vn-learn-btn" href="' + href + '" target="_blank" rel="noopener">' +
      bookSVG() + 'Learn about ' + label + '</a>' +
      '<div class="vn-tag">Independent research from ViralPeps</div>';
    document.body.appendChild(wrap);
  }

  // Try to place near the product title/cart; fallback to body bottom.
  function placeNearProduct() {
    var cartBtn = document.querySelector(
      "form[action*='/cart/add'] button, .single_add_to_cart_button, .add_to_cart_button, #AddToCart, button[name='add']"
    );
    var title = document.querySelector(
      "h1, .product-title, .product_title, [class*='product'] [class*='title']"
    );
    var target = cartBtn || title;
    if (target && target.tagName !== "BODY") {
      var wrap = document.createElement("div");
      wrap.id = "vpLearn";
      var href = resolve(slug);
      wrap.innerHTML =
        '<a class="vn-learn-btn" href="' + href + '" target="_blank" rel="noopener">' +
        bookSVG() + 'Learn about ' + label + '</a>' +
        '<div class="vn-tag">Independent research from ViralPeps</div>';
      // insert below target
      if (target.parentNode) {
        target.parentNode.insertBefore(wrap, target.nextSibling);
        return true;
      }
    }
    return false;
  }

  if (!resolved && !product) {
    // No product detected — silently hide (badge-only install)
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      if (!placeNearProduct()) mount();
    });
  } else {
    if (!placeNearProduct()) mount();
  }
})();
