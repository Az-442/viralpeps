import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Shared breadcrumb trail component. Data-driven via src/data/breadcrumbs.ts.
 * Renders: Home › [parent] › [current] using the ViralPeps brand style
 * (blue/gray, small clean text). Fully responsive.
 *
 * The last item (current page) has no href and is rendered as plain text.
 */
export default function BreadcrumbList({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <ol className="max-w-[76rem] mx-auto px-4 py-2.5 flex flex-wrap items-center gap-y-1 text-xs text-gray-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center">
              {i > 0 && <span className="mx-1.5 text-gray-300" aria-hidden="true">›</span>}
              {isLast || !item.href ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
