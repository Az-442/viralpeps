import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1a2e] text-gray-400 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="url(#fLogo)" />
              <path d="M7 15V9l5 3-5 3z" fill="white" fillOpacity="0.4" />
              <path d="M8 14V10l4 2-4 2z" fill="white" />
              <defs>
                <linearGradient id="fLogo" x1="0" y1="0" x2="24" y2="24">
                  <stop stopColor="#2563eb" />
                  <stop offset="1" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-bold text-white text-sm">ViralPeps</span>
          </div>
          <p className="text-xs leading-relaxed text-gray-500">
            The UK&apos;s independent peptide comparison platform. For laboratory research use only.
          </p>
        </div>
        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Directory</h4>
          <Link href="/compounds" className="block text-xs mb-2 hover:text-white transition-colors">All Peptides</Link>
          <Link href="/vendors" className="block text-xs mb-2 hover:text-white transition-colors">Suppliers</Link>
          <Link href="/vendors/register" className="block text-xs mb-2 hover:text-white transition-colors">List Your Business</Link>
        </div>
        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Resources</h4>
          <Link href="/tools" className="block text-xs mb-2 hover:text-white transition-colors">Peptide Tools</Link>
          <Link href="/research" className="block text-xs mb-2 hover:text-white transition-colors">Research Library</Link>
          <Link href="/faq" className="block text-xs mb-2 hover:text-white transition-colors">FAQ</Link>
        </div>
        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Company</h4>
          <Link href="/about" className="block text-xs mb-2 hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="block text-xs mb-2 hover:text-white transition-colors">Contact</Link>
          <Link href="/privacy" className="block text-xs mb-2 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/disclaimer" className="block text-xs mb-2 hover:text-white transition-colors">Disclaimer</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500">© 2026 ViralPeps. For research purposes only. Not for human consumption.</p>
        <p className="text-xs text-gray-500">Prices last updated: daily</p>
      </div>
    </footer>
  );
}
