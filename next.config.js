/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["db1c7b8a49d4520d9428e7b1097f5bf6.r2.cloudflarestorage.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/community",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
