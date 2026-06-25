import Link from "next/link";
import compounds from "@/data/compounds.json";

const categories = [...new Set(compounds.map((c) => c.category))];

export default function CompoundsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Compounds</h1>

        {categories.map((cat) => {
          const group = compounds.filter((c) => c.category === cat);
          return (
            <section key={cat} className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">{cat.replace(/-/g, " ")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.map((c) => (
                  <Link
                    key={c.id}
                    href={`/compounds/${c.slug}`}
                    className="p-4 border border-gray-100 rounded-lg hover:border-blue-100 hover:shadow-sm transition-all"
                  >
                    <h3 className="font-medium text-gray-900">{c.name}</h3>
                    {c.aliases.length > 0 && <p className="text-xs text-gray-400 mt-0.5">{c.aliases[0]}</p>}
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{c.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
