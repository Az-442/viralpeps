import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ViralPeps News",
  description:
    "Research peptide articles published on independent sites, collected in one place.",
  alternates: { canonical: "https://www.viralpeps.co.uk/news" },
};

const POSTS = [
  {
    host: "timebusinessnews.com",
    url: "https://timebusinessnews.com/how-to-evaluate-a-uk-research-peptide-supplier-before-you-buy/",
    anchor: "UK peptide supplier",
  },
  {
    host: "trans4mind.com",
    url: "https://trans4mind.com/counterpoint/index-health-fitness/research-peptides-storage-affects-purity.html",
    anchor: "Melanotan II",
  },
  {
    host: "ventsmagazine.com",
    url: "https://ventsmagazine.com/2026/09/01/the-most-searched-research-peptides-right-now-a-science-first-overview/",
    anchor: "Semaglutide",
  },
  {
    host: "apsense.com",
    url: "https://www.apsense.com/article/889432-beyond-the-metabolic-boom-three-other-research-peptide-categories-driving.html",
    anchor: "Semax",
  },
  {
    host: "timebusinessnews.com",
    url: "https://timebusinessnews.com/fragments-isoforms-and-derivatives-the-research-peptides-built-from-larger-molecules/",
    anchor: "AOD-9604",
  },
  {
    host: "newsnblogs.com",
    url: "https://newsnblogs.com/short-regulatory-peptides-what-makes-epitalon-cardiogen-and-p21-a-different-kind-of-research-compound/",
    anchor: "epitalon",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/news" />

      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-14">
        <div className="max-w-[76rem] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            ViralPeps{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              News
            </span>
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Research peptide articles published on independent sites.
          </p>
        </div>
      </section>

      <section className="max-w-[76rem] mx-auto px-4 py-12">
        <ul className="space-y-4">
          {POSTS.map((p) => (
            <li key={p.url} className="text-gray-900 text-sm leading-relaxed">
              <a href={p.url} className="text-blue-700 underline">
                {p.anchor}
              </a>{" "}
              <span className="text-gray-700">({p.host})</span>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  );
}
