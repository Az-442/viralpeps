import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Peptide Research Guide",
  description:
    "A beginner's guide to research peptides — what they are, how to read COAs, reconstitution, pricing, and how to use ViralPeps to compare UK suppliers.",
};

const sections = [
  {
    num: 1,
    title: "What Are Research Peptides?",
    desc: "Peptides are short chains of amino acids — the building blocks of proteins. In a research setting, they are studied for their roles in tissue repair, metabolism, cellular signalling, and more.",
    body: [
      <>
        Peptides sit between individual amino acids and full proteins. Where a
        protein is a long chain built from hundreds or thousands of amino
        acids, a peptide is a much shorter chain — typically between two and
        fifty amino acids joined end to end by peptide bonds. That short length
        is what gives peptides such selectivity: each tiny chain has its own
        shape and its own preferred receptors, which is why different peptides
        are studied for very different effects.
      </>,
      <>
        In a laboratory context, peptides are{" "}
        <span className="font-medium">research tools</span>, not medicines. A
        conventional drug is usually a small chemical molecule developed and
        approved through years of clinical trials. A research peptide is a
        distinct biological chain studied for what it does in an in-vitro (test
        tube or cell-culture) setting. The two are different categories
        entirely, and the distinction matters. Because most peptides are not
        licensed medicines, they are supplied for laboratory research only — and
        are not intended for human use, diagnosis, or treatment.
      </>,
      <>
        Some of the most commonly studied peptides include{" "}
        <Link href="/compounds/bpc-157">BPC-157</Link>, looked at for its
        involvement in tissue and connective-tissue research;{" "}
        <Link href="/compounds/semaglutide">Semaglutide</Link> and{" "}
        <Link href="/compounds/tirzepatide">Tirzepatide</Link>, studied for
        their effects on metabolic pathways; and{" "}
        <Link href="/compounds/ghk-cu">GHK-Cu</Link>, a copper-binding peptide
        researched in the context of skin and connective tissue. Each has its
        own sequence, half-life, and research focus. You can{' '}
        <Link href="/compounds">browse every UK peptide we track</Link> to see
        the full range.
      </>,
      <>
        For anyone new to the space, the single most important takeaway is this:
        a peptide is defined by its amino-acid sequence. Two peptides may look
        alike in name but be completely different in structure, so always
        confirm exactly which sequence a supplier is selling before handling it.
      </>,
    ],
  },
  {
    num: 2,
    title: "The Research Peptide Market",
    desc: "Quality varies between suppliers. Third-party testing, transparency, and track record are the signals that separate credible suppliers from risky ones.",
    body: [
      <>
        The UK research peptide market has grown quickly, and with that growth
        comes a huge range of suppliers — from established, well-documented
        vendors to small operations that appear overnight. Pricing, shipping
        speed, and packaging all differ, but the factor that really separates
        one supplier from another is <span className="font-medium">quality</span>.
        Two vendors can list the same compound at very different prices, and the
        difference is often reflected in purity, batch traceability, and whether
        the product has actually been tested.
      </>,
      <>
        So what separates a credible supplier from a risky one? Three signal
        clusters matter most. First, <span className="font-medium">third-party
        testing</span>: does the vendor publish a Certificate of Analysis from a
        named, independent laboratory rather than running their own in-house
        'tests'? Second, <span className="font-medium">transparency</span>: do
        they list batch numbers, publish their COAs on the product page, state
        their purity, and answer questions directly? Third, a{" "}
        <span className="font-medium">track record</span>: how long have they
        been operating, how responsive are they, and what do other researchers
        say about the consistency of their batches?
      </>,
      <>
        Price alone is a trap. The cheapest listing is often the most expensive
        decision you can make, because an untested or poorly handled batch is
        worthless to a lab even if it arrives by return post. Equally, the most
        expensive listing is not automatically the best. The honest benchmark is
        value — the right compound, documented and traceable, at a sensible{" "}
        <span className="font-medium">price per milligram</span>.
      </>,
      <>
        We maintain a growing <Link href="/vendors">directory of UK suppliers</Link>{' '}
        with their ratings, shipping and payment policies, lab-testing status,
        and product counts. We also publish a practical guide to{" "}
        <Link href="/guide/how-to-verify-suppliers">how to verify a supplier</Link>{' '}
        before you order. Use these to build a shortlist, then check each
        vendor's COA policy for the specific compound you are researching.
      </>,
    ],
  },
  {
    num: 3,
    title: "Reading a Certificate of Analysis",
    desc: "A COA is a lab report describing a batch's purity and identity. Look for named third-party labs, HPLC results, recent dates, and batch numbers.",
    body: [
      <>
        A Certificate of Analysis (COA) is the document that tells you what is
        actually in the vial. It is issued by a laboratory after it has tested a
        specific batch of material and records the batch's identity, purity, and
        the analytical method used to measure it. For a peptide, identity
        matters just as much as purity: a clean chromatogram of the wrong
        substance is still the wrong substance.
      </>,
      <>
        When you open a COA, run through these checks. Is it issued by a{" "}
        <span className="font-medium">named third-party laboratory</span> rather
        than by the seller's own in-house testing? Independent labs have no
        financial interest in the result. Is the purity reported as a clear
        percentage, ideally measured by <span className="font-medium">HPLC</span>{" "}
        (High-Performance Liquid Chromatography), the standard method for
        separating and quantifying peptide components? Is there a{" "}
        <span className="font-medium">batch number</span> that matches the label
        on the product you received? And is the document{" "}
        <span className="font-medium">recent</span> — a COA that is months or
        years old says nothing about the batch currently in stock?
      </>,
      <>
        Watch for red flags. A COA with no laboratory name, no batch number, or
        only a vague claim such as &ldquo;pure&rdquo; or &ldquo;99%+&rdquo;
        without a measured result is not evidence of quality. Screenshots with
        no test conditions, documents that look recycled across multiple
        batches, and dates that never change should all be treated with
        suspicion. If a vendor cannot produce a current, batch-matched COA for
        the exact product you are buying, treat that as a serious concern.
      </>,
      <>
        Understanding COAs is one of the most valuable skills you can build, and
        it pairs directly with how we list suppliers. When you{" "}
        <Link href="/vendors">compare suppliers</Link>, check which ones publish
        COAs on the product page and whether those documents are batch-specific.
        A supplier that makes its COA easy to find is showing you the
        transparency we look for in section 2.
      </>,
    ],
  },
  {
    num: 4,
    title: "Reconstitution & Lab Handling",
    desc: "Most peptides arrive lyophilised. Reconstitute with bacteriostatic water. Use our calculator to get the concentration right for your research.",
    body: [
      <>
        Most research peptides arrive as a{" "}
        <span className="font-medium">lyophilised powder</span> — a dry, stable
        solid that has had the water removed under vacuum. This keeps the
        peptide stable in transit and storage. Before it can be used in the lab,
        it must be <span className="font-medium">reconstituted</span> (brought
        back into solution) by adding a solvent such as{" "}
        <span className="font-medium">bacteriostatic water</span>.
      </>,
      <>
        Reconstitution is a process that should be done carefully and
        aseptically. Draw up the bacteriostatic water with a syringe, then add
        it slowly to the peptide vial, ideally letting the water run down the
        inside wall of the vial rather than firing it directly at the powder.
        Gently swirl — never aggressively shake — until the powder has fully
        dissolved. Aggressive shaking can damage delicate peptide chains. If the
        vial has a vacuum, take care that pressure is relieved safely as you
        inject the water.
      </>,
      <>
        Once in solution you need to know the concentration of what you are
        handling, which is simple arithmetic: divide the amount of peptide by
        the volume of liquid you added. For example, reconstituting a 5&nbsp;mg
        vial with 2&nbsp;ml of water gives 2.5&nbsp;mg per ml. From there you can
        work out how many units that represents on a standard insulin syringe.
        Get the maths right before you handle anything — a 0.1&nbsp;ml error at
        the top of a syringe is a large percentage error at research doses. Our{" "}
        <Link href="/tools/dosage-calculator">dosage calculator</Link> does this
        fully-dosage maths for you, and our broader{" "}
        <Link href="/tools">research tools</Link> section has further helpers.
      </>,
      <>
        Store lyophilised peptides as directed on the label — usually cool, dry,
        and away from light. Once reconstituted, most peptides are far less
        stable and should be kept refrigerated and used within the short window
        the supplier recommends. Always label vials with the compound, batch,
        date of reconstitution, and concentration. In short: handle aseptically,
        reconstitute gently, and never guess your concentration.
      </>,
    ],
  },
  {
    num: 5,
    title: "Understanding Peptide Pricing",
    desc: "The only honest way to compare is price per milligram, not vial price. We calculate this for every listing automatically.",
    body: [
      <>
        Vial prices are almost meaningless in isolation. A &pound;30 vial of one
        compound may contain 5&nbsp;mg while a &pound;30 vial of another
        contains 10&nbsp;mg — same price, wildly different value. If a supplier
        packages a compound as a 2&nbsp;mg vial and another as a 5&nbsp;mg vial,
        comparing the two headline prices tells you nothing. The figure that
        actually lets you compare is the{" "}
        <span className="font-medium">price per milligram</span>: divide the
        total cost by the number of milligrams in the vial.
      </>,
      <>
        To compare two listings honestly: take each vial's price, divide by its
        milligram content, and compare the results. A 5&nbsp;mg vial at &pound;30
        is &pound;6 per milligram; a 10&nbsp;mg vial at &pound;45 is &pound;4.50
        per milligram — the second is genuinely cheaper, even though its
        headline price is higher. This is the only way to see the real picture,
        and it is why we standardise on it across the site.
      </>,
      <>
        Watch for hidden costs that never show up in the vial price. Postage and
        handling fees, minimum order values, and whether shipping is discounted
        on larger orders can all change the effective cost per milligram. A small
        difference in vial price can be erased or reversed by a flat delivery
        fee. It is also worth weighing up the cost of a documented batch: buying
        the absolute cheapest vial means accepting the quality trade-offs
        described in section 2.
      </>,
      <>
        On ViralPeps we{" "}
        <Link href="/compounds">compare UK peptide prices automatically</Link>,
        calculating price per milligram for every listing so you are never left
        doing the arithmetic by hand. For each compound you can see the{" "}
        <span className="font-medium">from</span> price, the average price, the
        price range, and how many suppliers carry it — so you can judge both
        value and how competitive the market is at a glance.
      </>,
    ],
  },
  {
    num: 6,
    title: "Using ViralPeps",
    desc: "Search any compound to see all UK suppliers ranked by price per mg. Compare supplier profiles, check COA policies, and find the best deal.",
    body: [
      <>
        ViralPeps is built to make peptide sourcing easier, and the fastest way
        in is the search bar or the <Link href="/compounds">compounds directory</Link>.
        Search for any compound by name or alias and you will land on a dedicated
        compound page showing every UK supplier that lists it, ranked so the
        best value sits at the top. Each compound page shows the{" "}
        <span className="font-medium">from</span> price, the average price, the
        number of suppliers, and a full comparison table with price, price per
        milligram, stock, delivery, and lab-testing status.
      </>,
      <>
        To evaluate who you are buying from, visit the{" "}
        <Link href="/vendors">supplier directory</Link>. Every vendor profile
        shows its rating, product count, delivery and payment policies, lab-test
        status, and the full list of compounds it carries. Look specifically at
        a vendor's COA policy before ordering — do they publish batch-specific
        Certificates of Analysis, and are they named third-party labs? The{" "}
        <Link href="/guide/how-to-verify-suppliers">supplier verification guide</Link>{' '}
        walks through exactly what to check.
      </>,
      <>
        By default we display the price per milligram on every listing, so you
        can compare vials of different sizes without doing the maths yourself. On
        each compound page you can also filter by vial size and use the{" "}
        <span className="font-medium">Compare</span> checkboxes to put two or
        more suppliers side by side in compare mode.
      </>,
      <>
        For educational context, the <Link href="/research">research library</Link>{' '}
        collects guides and digests on popular compounds, and the rest of this{" "}
        <Link href="/guide">guide</Link> covers the fundamentals. If you are
        planning dosage maths, our <Link href="/tools/dosage-calculator">dosage
        calculator</Link> and <Link href="/tools/cycle-calculator">cycle
        calculator</Link> remove the guesswork.
      </>,
    ],
  },
  {
    num: 7,
    title: "Glossary of Terms",
    desc: "Key terms explained: lyophilised, reconstitution, HPLC, COA, price per mg, batch, and more.",
    body: [
      <>
        <span className="font-medium">Lyophilised</span> — a form of freeze-drying
        in which water is removed from the material under vacuum, leaving a dry,
        stable solid. Most research peptides ship in this form to stay stable in
        transit.
      </>,
      <>
        <span className="font-medium">Reconstitution</span> — the step of adding
        a solvent, usually bacteriostatic water, back to a lyophilised powder to
        bring it into solution for use.
      </>,
      <>
        <span className="font-medium">HPLC</span> (High-Performance Liquid
        Chromatography) — an analytical technique used to separate, identify,
        and quantify the components of a mixture. It is the standard method for
        assessing peptide purity.
      </>,
      <>
        <span className="font-medium">COA</span> (Certificate of Analysis) — a
        laboratory report documenting the identity, purity, and testing method
        for a specific batch of material.
      </>,
      <>
        <span className="font-medium">Price per mg</span> — the cost per
        milligram of peptide, calculated by dividing a vial's price by its
        milligram content. This is the honest unit for comparing vials of
        different sizes.
      </>,
      <>
        <span className="font-medium">Batch</span> — a defined production run of
        material. Because quality can vary between runs, a batch number lets you
        match a specific COA to a specific product.
      </>,
      <>
        <span className="font-medium">Third-party testing</span> — testing
        performed by an independent laboratory with no financial interest in the
        outcome, as opposed to a seller testing its own products.
      </>,
      <>
        <span className="font-medium">In-vitro</span> — &ldquo;in glass&rdquo;,
        meaning research conducted outside a living organism, such as in a test
        tube or cell culture. All compounds on this site are for in-vitro
        laboratory research only.
      </>,
    ],
  },
  {
    num: 8,
    title: "Research Use Only",
    desc: "All compounds listed on ViralPeps are for in-vitro laboratory research only. Nothing here is medical advice.",
    body: [
      <>
        Every compound listed on ViralPeps is supplied for{" "}
        <span className="font-medium">in-vitro laboratory research</span> only.
        These products are not human or veterinary medicines, they are not
        approved for consumption, and they are not intended to diagnose, treat,
        cure, or prevent any disease or condition. The listings, comparisons, and
        guides on this site exist to help researchers source and compare research
        compounds — not to advise anyone on use in humans or animals.
      </>,
      <>
        None of the information on ViralPeps is medical advice. The editorial
        content in this guide is general and educational, written to help you
        understand what research peptides are and how the sourcing market works.
        If you have questions about a medical condition, treatment, or any health
        concern, consult a qualified medical professional. We are a price
        comparison and information resource, not a healthcare provider.
      </>,
      <>
        It is also your responsibility to consider the legal position in your own
        jurisdiction. Research compounds are regulated differently around the
        world, and what is legally available in one country may be restricted
        elsewhere. Before ordering anything, confirm that the product is lawful
        for you to purchase and hold for research purposes where you are located,
        and that you have the appropriate environment and training to handle
        laboratory chemicals safely.
      </>,
      <>
        This is the single most important principle on the site: these are
        research tools, handled in a lab, by researchers. That framing runs
        through the marketplace we compare, the{" "}
        <Link href="/compounds">products we list</Link>, and the{" "}
        <Link href="/guide">guidance we publish</Link>. Please treat these
        compounds with the seriousness a laboratory reagent deserves.
      </>,
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav current="/guide" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b1a2e] via-[#1a2d4a] to-[#0b1a2e] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-500 blur-3xl" />
        </div>
        <div className="max-w-[76rem] mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="text-blue-300 text-xs font-medium">
              Beginner&apos;s Guide
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            The Research Peptide{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Guide
            </span>
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Your comprehensive research peptides resource. Use this site for research and sourcing.
          </p>
        </div>
      </section>

      {/* INTRO COPY — keyword-rich page introduction */}
      <section className="bg-blue-50 border-t border-blue-200">
        <div className="max-w-[76rem] mx-auto px-4 py-12 md:py-16">
          <div className="bg-white border border-black rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-3 py-0.5 mb-5">
              <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              BEGINNER'S GUIDE
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The Beginner's Guide to Research Peptides in the UK
            </h1>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              New to research peptides? This guide walks you through the essentials — what peptides
              are, how the UK market works, how to read a certificate of analysis, and how to
              reconstitute and handle compounds correctly. Whether you are researching{" "}
              <Link href="/compounds/bpc-157" className="font-semibold text-blue-600 hover:text-blue-700">BPC-157</Link>,{" "}
              <Link href="/compounds/semaglutide" className="font-semibold text-blue-600 hover:text-blue-700">Semaglutide</Link>{" "}
              or any other compound, start here.
            </p>

            <h3 className="text-base font-bold text-gray-900 mb-1">Learn the Fundamentals</h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              Short chains of amino acids, practical definitions, and the research context behind
              popular compounds — explained without jargon so you can build a solid foundation
              before buying anything.
            </p>

            <h3 className="text-base font-bold text-gray-900 mb-1">Source Safely &amp; Compare Prices</h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              Quality varies between suppliers. Learn to spot credible vendors, understand COAs and
              pricing, then use our{" "}
              <Link href="/compounds" className="font-semibold text-blue-600 hover:text-blue-700">UK price comparison</Link>{" "}
              to find the best deal per milligram.
            </p>

            <h3 className="text-base font-bold text-gray-900 mb-1">Practical Steps, Clear Terms</h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Everything here is for educational and in-vitro research use only. Pair the guide with
              our{" "}
              <Link href="/tools" className="font-semibold text-blue-600 hover:text-blue-700">dosage calculator</Link>{" "}
              and{" "}
              <Link href="/tools/cycle-calculator" className="font-semibold text-blue-600 hover:text-blue-700">cycle calculator</Link>{" "}
              when you are ready to plan your research.
            </p>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <div className="max-w-[76rem] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {sections.map((s) => (
            <a
              key={s.num}
              href={`#section-${s.num}`}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
            >
              <span className="text-xs font-bold text-blue-600 bg-blue-100 rounded-full px-2 py-0.5">
                {s.num}
              </span>
              <h3 className="font-semibold text-gray-900 text-sm mt-2 group-hover:text-blue-700 transition-colors">
                {s.title}
              </h3>
            </a>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.num} id={`section-${s.num}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-100 rounded-full px-2.5 py-1">
                  {s.num}
                </span>
                <h2 className="text-xl font-bold text-gray-900">
                  {s.title}
                </h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {s.desc}
              </p>
              <div className="space-y-4">
                {s.body.map((para, i) => (
                  <p key={i} className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Ready to compare prices?
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            Search any compound and see every UK supplier ranked by price per
            milligram.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/guide/how-to-verify-suppliers"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              How to Verify a Supplier &rarr;
            </Link>
            <Link
              href="/compounds"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Browse Compounds &rarr;
            </Link>
            <Link
              href="/research"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Research Library
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
