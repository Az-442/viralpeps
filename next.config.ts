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
    ];
  },
};

export default nextConfig;
