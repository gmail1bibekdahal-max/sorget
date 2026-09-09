import type { NextConfig } from "next";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.sorget.site";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/login",
        destination: `${appUrl}/login`,
        permanent: false,
      },
      {
        source: "/signup",
        destination: `${appUrl}/signup`,
        permanent: false,
      },
      {
        source: "/signup/setup",
        destination: `${appUrl}/signup`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
