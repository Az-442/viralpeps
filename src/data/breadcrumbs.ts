import type { BreadcrumbItem } from "@/components/BreadcrumbList";

/**
 * Data-driven breadcrumb config.
 *
 * Map route patterns to parent chains. Each key is a route pattern used to
 * look up breadcrumb ancestors for a given current-page slug. Add a new page
 * here with one entry and it gets breadcrumbs automatically.
 *
 * Fallback: if no entry matches, the calling page falls back to
 * Home › [current page] (see the getBreadcrumbs helper below), so the
 * component never breaks for unconfigured routes.
 */

// Home is prepended automatically by getBreadcrumbs.
const HOME: { label: string; href: string } = { label: "Home", href: "/" };

/**
 * Build the breadcrumb items for a current page.
 *
 * @param pattern - route pattern key into BREADCRUMBS (e.g. "compounds")
 * @param currentLabel - human-readable label for the current page (last item, no href)
 * @param currentHref - optional href for the current page (usually omitted)
 */
export function getBreadcrumbs(
  pattern: string,
  currentLabel: string,
  currentHref?: string
): BreadcrumbItem[] {
  const parents: BreadcrumbItem[] = BREADCRUMBS[pattern] ?? [];
  return [
    HOME,
    ...parents,
    { label: currentLabel, href: currentHref },
  ];
}

/**
 * Breadcrumb parent chains keyed by route pattern.
 * Values are the "parent" trail between Home and the current page.
 */
export const BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  // Home › Peptides › [compound]
  compounds: [{ label: "Peptides", href: "/compounds" }],
  // Home › Suppliers › [vendor]
  vendors: [{ label: "Suppliers", href: "/vendors" }],
  // Home › Research
  research: [{ label: "Research", href: "/research" }],
  // Home › Tools
  tools: [{ label: "Tools", href: "/tools" }],
};
