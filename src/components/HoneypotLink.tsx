/**
 * HoneypotLink — an invisible trap anchor.
 *
 * Rendered on pages that carry /go/ links. It is hidden from sighted users,
 * from screen readers (aria-hidden) and from keyboard tab order (tabIndex -1),
 * so a real person can never reach or activate it.
 *
 * A link-following crawler or scraper enumerating anchors will click it. That
 * hit permanently blocklists the visitor in the click logger, which is the only
 * reliable way to stop a polite, full-header, low-rate bot that defeats every
 * honest header heuristic.
 *
 * Server component — no JS, no client bundle cost.
 */
export default function HoneypotLink() {
  return (
    <a
      href="/go/__hp"
      aria-hidden="true"
      tabIndex={-1}
      rel="nofollow noindex"
      data-nosnippet=""
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        border: 0,
        pointerEvents: "none",
        opacity: 0,
      }}
    >
      Compare verified UK supplier pricing
    </a>
  );
}
