import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/vendors/regen-peptides",
        destination: "/vendors/midshire-labs",
        permanent: true,
      },
      {
        source: "/vendors/regen-peptides/:path*",
        destination: "/vendors/midshire-labs/:path*",
        permanent: true,
      },
      // --- Legacy/typo compound URLs (were internal 404s; links now omitted) ---
      {
        source: "/compounds/aod9604",
        destination: "/compounds/aod-9604",
        permanent: true,
      },
      {
        source: "/compounds/ghk-cu-bpc-157-tb-500",
        destination: "/compounds/glow",
        permanent: true,
      },
      {
        source: "/compounds/ghk-cu-bpc-157-tb-500-kpv",
        destination: "/compounds/klow",
        permanent: true,
      },
      {
        source: "/compounds/ipamorelin-cjc-1295-no-dac",
        destination: "/compounds/cjc-1295-ipamorelin-blend",
        permanent: true,
      },
      {
        source: "/compounds/ipamorelin-cjc-1295-with-dac",
        destination: "/compounds/cjc-1295",
        permanent: true,
      },
      {
        source: "/compounds/ipamorelin-tesamorelin",
        destination: "/compounds/ipamorelin",
        permanent: true,
      },
      {
        source: "/compounds/nad-5-amino-1mq-mots-c",
        destination: "/compounds/nad-plus",
        permanent: true,
      },
      {
        source: "/research/dsip-research-summary",
        destination: "/compounds/dsip",
        permanent: true,
      },
      {
        source: "/compounds/retatrutide-20mg-the-peptide-company",
        destination: "/compounds/retatrutide",
        permanent: true,
      },
      {
        source: "/go/proforma-peptides/selank",
        destination: "/compounds/selank",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/thymosin-alpha-1",
        destination: "/compounds/thymosin-alpha-1",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/selank",
        destination: "/compounds/selank",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/hcg",
        destination: "/compounds/hcg",
        permanent: true,
      },
      {
        source: "/go/xl-peptides/bacteriostatic-water",
        destination: "/compounds/bacteriostatic-water",
        permanent: true,
      },
      {
        source: "/go/xl-peptides/melanotan-i",
        destination: "/compounds/melanotan-i",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/epitalon",
        destination: "/compounds/epitalon",
        permanent: true,
      },
      {
        source: "/go/xl-peptides/melanotan-ii",
        destination: "/compounds/melanotan-ii",
        permanent: true,
      },
      {
        source: "/go/proforma-peptides/semax",
        destination: "/compounds/semax",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/pt-141-bremelanotide",
        destination: "/compounds/pt-141-bremelanotide",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/tesamorelin",
        destination: "/compounds/tesamorelin",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/sermorelin",
        destination: "/compounds/sermorelin",
        permanent: true,
      },
      {
        source: "/go/tide-labs/pt-141-bremelanotide",
        destination: "/compounds/pt-141-bremelanotide",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/cjc-1295",
        destination: "/compounds/cjc-1295",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/melanotan-ii",
        destination: "/compounds/melanotan-ii",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/melanotan-i",
        destination: "/compounds/melanotan-i",
        permanent: true,
      },
      {
        source: "/go/tide-labs/sermorelin-grf-1-29-5mg",
        destination: "/compounds/sermorelin",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/oxytocin",
        destination: "/compounds/oxytocin",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/cagrilintide",
        destination: "/compounds/cagrilintide",
        permanent: true,
      },
      {
        source: "/go/tide-labs/snap-8-argireline-10mg",
        destination: "/compounds/snap-8",
        permanent: true,
      },
      {
        source: "/go/bio-peptides-uk/igf-1-lr3",
        destination: "/compounds/igf-1-lr3",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/tesamorelin",
        destination: "/compounds/tesamorelin",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/aod-9604",
        destination: "/compounds/aod-9604",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/semax",
        destination: "/compounds/semax",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/ghrp-6",
        destination: "/compounds/ghrp-6",
        permanent: true,
      },
      {
        source: "/go/tide-labs/snap-8",
        destination: "/compounds/snap-8",
        permanent: true,
      },
      {
        source: "/go/tide-labs/hexarelin-5mg",
        destination: "/compounds/hexarelin",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/fragment-176-191",
        destination: "/compounds/fragment-176-191",
        permanent: true,
      },
      {
        source: "/go/tide-labs/tb-500",
        destination: "/compounds/tb-500",
        permanent: true,
      },
      {
        source: "/go/proforma-peptides/thymosin-alpha-1",
        destination: "/compounds/thymosin-alpha-1",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/ss-31",
        destination: "/compounds/ss-31",
        permanent: true,
      },
      {
        source: "/go/the-peptide-company/glp-transformation-stack-the-peptide-company",
        destination: "/vendors/the-peptide-company",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/5-amino-1mq",
        destination: "/compounds/5-amino-1mq",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/tesamorelin",
        destination: "/compounds/tesamorelin",
        permanent: true,
      },
      {
        source: "/compounds/hgh-frag-176-191",
        destination: "/compounds/fragment-176-191",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/epitalon",
        destination: "/compounds/epitalon",
        permanent: true,
      },
      {
        source: "/go/tide-labs/cjc-1295-with-dac",
        destination: "/compounds/cjc-1295-with-dac",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/dsip",
        destination: "/compounds/dsip",
        permanent: true,
      },
      {
        source: "/go/tide-labs/acetic-acid-reconstitution-solvent-10ml",
        destination: "/compounds/acetic-acid-reconstitution-solvent-10ml",
        permanent: true,
      },
      {
        source: "/go/the-peptide-company/metabolic-stack-the-peptide-company",
        destination: "/vendors/the-peptide-company",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/ipamorelin",
        destination: "/compounds/ipamorelin",
        permanent: true,
      },
      {
        source: "/go/raccoon-peptides/ss-31",
        destination: "/compounds/ss-31",
        permanent: true,
      },
      {
        source: "/go/tide-labs/kpv",
        destination: "/compounds/kpv",
        permanent: true,
      },
      {
        source: "/go/tide-labs/5-amino-1mq",
        destination: "/compounds/5-amino-1mq",
        permanent: true,
      },
      {
        source: "/go/tide-labs/ghrp-6",
        destination: "/compounds/ghrp-6",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/selank",
        destination: "/compounds/selank",
        permanent: true,
      },
      {
        source: "/go/tide-labs/ahk-cu-100mg",
        destination: "/compounds/ahk-cu",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/ara-290",
        destination: "/compounds/ara-290",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/cjc-1295-ipamorelin-blend",
        destination: "/compounds/cjc-1295-ipamorelin-blend",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/igf-1-lr3",
        destination: "/compounds/igf-1-lr3",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/kisspeptin-10",
        destination: "/compounds/kisspeptin-10",
        permanent: true,
      },
      {
        source: "/go/mypep-biotech/ghk-cu",
        destination: "/compounds/ghk-cu",
        permanent: true,
      },
      {
        source: "/go/mypep-biotech/cagrilintide",
        destination: "/compounds/cagrilintide",
        permanent: true,
      },
      {
        source: "/go/mypep-biotech/liraglutide",
        destination: "/compounds/liraglutide",
        permanent: true,
      },
      {
        source: "/go/tide-labs/cognitive-signalling-set-semax-selank",
        destination: "/compounds/cognitive-signalling-set-semax-selank",
        permanent: true,
      },
      {
        source: "/go/mypep-biotech/ipamorelin",
        destination: "/compounds/ipamorelin",
        permanent: true,
      },
      {
        source: "/go/mypep-biotech/oxytocin",
        destination: "/compounds/oxytocin",
        permanent: true,
      },
      {
        source: "/go/mypep-biotech/tesamorelin",
        destination: "/compounds/tesamorelin",
        permanent: true,
      },
      {
        source: "/go/mypep-biotech/kpv",
        destination: "/compounds/kpv",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/gonadorelin",
        destination: "/compounds/gonadorelin",
        permanent: true,
      },
      {
        source: "/go/the-peptide-company/age-reversal-stack-the-peptide-company",
        destination: "/vendors/the-peptide-company",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/pt-141-bremelanotide",
        destination: "/compounds/pt-141-bremelanotide",
        permanent: true,
      },
      {
        source: "/go/the-peptide-company/bacteriostatic-water",
        destination: "/compounds/bacteriostatic-water",
        permanent: true,
      },
      {
        source: "/go/the-peptide-company/retatrutide-20mg-the-peptide-company",
        destination: "/compounds/retatrutide",
        permanent: true,
      },
      {
        source: "/go/tide-labs/nad-research-peptide",
        destination: "/compounds/nad-plus",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/ss-31",
        destination: "/compounds/ss-31",
        permanent: true,
      },
      {
        source: "/go/peptidesx/semaglutide",
        destination: "/compounds/semaglutide",
        permanent: true,
      },
      {
        source: "/go/tide-labs/bacteriostatic-water",
        destination: "/compounds/bacteriostatic-water",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/retatrutide",
        destination: "/compounds/retatrutide",
        permanent: true,
      },
      {
        source: "/go/mypep-biotech/epitalon",
        destination: "/compounds/epitalon",
        permanent: true,
      },
      {
        source: "/research/sc-bpc-157",
        destination: "/research/bpc157-research-summary",
        permanent: true,
      },
      {
        source: "/go/precision-peptides/retatrutide",
        destination: "/compounds/retatrutide",
        permanent: true,
      },
      {
        source: "/go/raw-peptides/mots-c",
        destination: "/compounds/mots-c",
        permanent: true,
      },
      {
        source: "/go/proforma-peptides/melanotan-ii",
        destination: "/compounds/melanotan-ii",
        permanent: true,
      },
      {
        source: "/go/bio-peptides-uk/tirzepatide",
        destination: "/compounds/tirzepatide",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/aod-9604",
        destination: "/compounds/aod-9604",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/dsip",
        destination: "/compounds/dsip",
        permanent: true,
      },
      {
        source: "/go/tide-labs/kpv-5mg-peptide-research",
        destination: "/compounds/kpv",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/tesamorelin",
        destination: "/compounds/tesamorelin",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/mots-c",
        destination: "/compounds/mots-c",
        permanent: true,
      },
      {
        source: "/go/tide-labs/ara-290",
        destination: "/compounds/ara-290",
        permanent: true,
      },
      {
        source: "/go/mypep-biotech/bpc-157",
        destination: "/compounds/bpc-157",
        permanent: true,
      },
      {
        source: "/go/tide-labs/ss-31",
        destination: "/compounds/ss-31",
        permanent: true,
      },
      {
        source: "/go/tide-labs/hexarelin",
        destination: "/compounds/hexarelin",
        permanent: true,
      },
      {
        source: "/go/tide-labs/ipamorelin-5mg-peptide-research",
        destination: "/compounds/ipamorelin",
        permanent: true,
      },
      {
        source: "/go/tide-labs/selank",
        destination: "/compounds/selank",
        permanent: true,
      },
      {
        source: "/go/tide-labs/ahk-cu",
        destination: "/compounds/ahk-cu",
        permanent: true,
      },
      {
        source: "/go/tide-labs/ss-31-10mg",
        destination: "/compounds/ss-31",
        permanent: true,
      },
      {
        source: "/go/tide-labs/epitalon",
        destination: "/compounds/epitalon",
        permanent: true,
      },
      {
        source: "/go/tide-labs/cjc-1295",
        destination: "/compounds/cjc-1295",
        permanent: true,
      },
      {
        source: "/go/tide-labs/nad-plus",
        destination: "/compounds/nad-plus",
        permanent: true,
      },
      {
        source: "/go/the-peptide-company/total-repair-stack-the-peptide-company",
        destination: "/vendors/the-peptide-company",
        permanent: true,
      },
      {
        source: "/go/tide-labs/ghrh-fragment-176-191",
        destination: "/compounds/fragment-176-191",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/ara-290",
        destination: "/compounds/ara-290",
        permanent: true,
      },
      {
        source: "/go/proforma-peptides/dsip",
        destination: "/compounds/dsip",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/thymosin-alpha-1",
        destination: "/compounds/thymosin-alpha-1",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/vip",
        destination: "/compounds/vip",
        permanent: true,
      },
      {
        source: "/go/tide-labs/sermorelin",
        destination: "/compounds/sermorelin",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/retatrutide",
        destination: "/compounds/retatrutide",
        permanent: true,
      },
      {
        source: "/go/bioplex-peptides/kpv",
        destination: "/compounds/kpv",
        permanent: true,
      },
      {
        source: "/compounds/mt-1-melanotan-1-acetate-10mg",
        destination: "/compounds/melanotan-i",
        permanent: true,
      },
      {
        source: "/go/astra-labs/tirzepatide",
        destination: "/compounds/tirzepatide",
        permanent: true,
      },
      {
        source: "/go/biohack-peptides/bacteriostatic-water",
        destination: "/compounds/bacteriostatic-water",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/glow",
        destination: "/compounds/glow",
        permanent: true,
      },
      {
        source: "/go/the-peptide-code/glow",
        destination: "/compounds/glow",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/nad-plus",
        destination: "/compounds/nad-plus",
        permanent: true,
      },
      {
        source: "/research/sc-tirzepatide",
        destination: "/research/tirzepatide-research-summary",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/kpv",
        destination: "/compounds/kpv",
        permanent: true,
      },
      {
        source: "/go/xl-peptides/semax",
        destination: "/compounds/semax",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/bacteriostatic-water",
        destination: "/compounds/bacteriostatic-water",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/ghrp-2",
        destination: "/compounds/ghrp-2",
        permanent: true,
      },
      {
        source: "/go/xl-peptides/mt-1-melanotan-1-acetate-10mg",
        destination: "/compounds/melanotan-i",
        permanent: true,
      },
      {
        source: "/go/uk-peptide-lab/l-carnitine",
        destination: "/compounds/l-carnitine",
        permanent: true,
      },
      {
        source: "/go/the-peptide-company/semaglutide",
        destination: "/compounds/semaglutide",
        permanent: true,
      },
      {
        source: "/go/peptides-lab-uk/retatrutide",
        destination: "/compounds/retatrutide",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/hexarelin",
        destination: "/compounds/hexarelin",
        permanent: true,
      },
      {
        source: "/go/express-peptides/bacteriostatic-water",
        destination: "/compounds/bacteriostatic-water",
        permanent: true,
      },
      {
        source: "/research/sc-semaglutide",
        destination: "/research/semaglutide-research-summary",
        permanent: true,
      },
      {
        source: "/go/bio-peptides-uk/glutathione",
        destination: "/compounds/glutathione",
        permanent: true,
      },
      {
        source: "/go/proforma-peptides/tesamorelin",
        destination: "/compounds/tesamorelin",
        permanent: true,
      },
      {
        source: "/go/proforma-peptides/igf-1-des",
        destination: "/compounds/igf-1-des",
        permanent: true,
      },
      {
        source: "/go/kensington-labs/bpc-157",
        destination: "/compounds/bpc-157",
        permanent: true,
      },
      {
        source: "/go/dr-peptides/sermorelin",
        destination: "/compounds/sermorelin",
        permanent: true,
      },
      {
        source: "/go/bio-peptides-uk/semaglutide",
        destination: "/compounds/semaglutide",
        permanent: true,
      },
      {
        source: "/go/new-wave-peptides/sermorelin",
        destination: "/compounds/sermorelin",
        permanent: true,
      },
      {
        source: "/go/the-peptide-company/semaglutide-20mg-the-peptide-company",
        destination: "/compounds/semaglutide",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/kisspeptin-10",
        destination: "/compounds/kisspeptin-10",
        permanent: true,
      },
      {
        source: "/go/research-peptide-uk/mt-1-melanotan-1-acetate-10mg",
        destination: "/compounds/melanotan-i",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/ghrp-6",
        destination: "/compounds/ghrp-6",
        permanent: true,
      },
      {
        source: "/go/proforma-peptides/ara-290",
        destination: "/compounds/ara-290",
        permanent: true,
      },
      {
        source: "/research-hub/how-to-read-a-coa",
        destination: "/research/how-to-read-a-coa",
        permanent: true,
      },
      {
        source: "/go/peptides-lab-uk/tirzepatide",
        destination: "/compounds/tirzepatide",
        permanent: true,
      },
      {
        source: "/go/bio-peptides-uk/cagrilintide",
        destination: "/compounds/cagrilintide",
        permanent: true,
      },
      {
        source: "/go/biohack-peptides/hcg",
        destination: "/compounds/hcg",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/pt-141-bremelanotide",
        destination: "/compounds/pt-141-bremelanotide",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/epitalon",
        destination: "/compounds/epitalon",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/klow",
        destination: "/compounds/klow",
        permanent: true,
      },
      {
        source: "/go/chroma-peptides/mt-1-melanotan-1-acetate-10mg",
        destination: "/compounds/melanotan-i",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/cjc-1295-ipamorelin-blend",
        destination: "/compounds/cjc-1295-ipamorelin-blend",
        permanent: true,
      },
      {
        source: "/compounds/myostatin",
        destination: "/compounds/myostatin-1mg",
        permanent: true,
      },
      {
        source: "/compounds/tesofensine",
        destination: "/compounds/tesofensine-500mcg-60-capsules",
        permanent: true,
      },
      {
        source: "/compounds/ace-031",
        destination: "/compounds/ace-031-1mg",
        permanent: true,
      },
      {
        source: "/compounds/igf-1-1-3",
        destination: "/compounds/igf-1-1-3-1mg",
        permanent: true,
      },
      {
        source: "/compounds/melatonin",
        destination: "/compounds/melatonin-10mg",
        permanent: true,
      },
      {
        source: "/compounds/gagrilintide",
        destination: "/compounds/cagrilintide",
        permanent: true,
      },
      {
        source: "/compounds/follistatin",
        destination: "/compounds/follistatin-344",
        permanent: true,
      },
      {
        source: "/go/reta-uk/pt-141-bremelanotide",
        destination: "/compounds/pt-141-bremelanotide",
        permanent: true,
      },
      {
        source: "/compounds/mk-677",
        destination: "/compounds/mk-677-ibutamoren-10mg-100-tablets",
        permanent: true,
      },
      {
        source: "/compounds/mt-1",
        destination: "/compounds/melanotan-i",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/ss-31",
        destination: "/compounds/ss-31",
        permanent: true,
      },
      {
        source: "/go/regen-peptides/fragment-176-191",
        destination: "/compounds/fragment-176-191",
        permanent: true,
      },
      {
        source: "/go/the-peptide-company/hgh-191aa-the-peptide-company",
        destination: "/vendors/the-peptide-company",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/adamax",
        destination: "/compounds/adamax",
        permanent: true,
      },
      {
        source: "/go/uk-peptide-lab/cagrilintide",
        destination: "/compounds/cagrilintide",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/ara-290",
        destination: "/compounds/ara-290",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/sermorelin",
        destination: "/compounds/sermorelin",
        permanent: true,
      },
      {
        source: "/compounds/mt-2-melanotan-2-acetate-10mg",
        destination: "/compounds/melanotan-ii",
        permanent: true,
      },
      {
        source: "/go/dr-peptides/slu-pp-332",
        destination: "/compounds/slu-pp-332",
        permanent: true,
      },
      {
        source: "/go/xl-peptides/selank",
        destination: "/compounds/selank",
        permanent: true,
      },
      {
        source: "/go/flex-peptides/tirzepatide",
        destination: "/compounds/tirzepatide",
        permanent: true,
      },
      {
        source: "/go/supply-peptides/melanotan-ii",
        destination: "/compounds/melanotan-ii",
        permanent: true,
      },
      {
        source: "/go/applied-peptides/melanotan-ii",
        destination: "/compounds/melanotan-ii",
        permanent: true,
      },
      {
        source: "/research/melanotan2-research-summary",
        destination: "/research/melanotan-ii-research-summary",
        permanent: true,
      },
      {
        source: "/go/biohack-peptides/melanotan-ii",
        destination: "/compounds/melanotan-ii",
        permanent: true,
      },
      {
        source: "/go/bio-peptides-uk/epitalon",
        destination: "/compounds/epitalon",
        permanent: true,
      },
      {
        source: "/go/anglo-peptides/bacteriostatic-water",
        destination: "/compounds/bacteriostatic-water",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
