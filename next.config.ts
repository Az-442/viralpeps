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
    ];
  },
};

export default nextConfig;
