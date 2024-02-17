/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["pub-c84c666dc6b44affb668786aad0e2eb7.r2.dev"],
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
