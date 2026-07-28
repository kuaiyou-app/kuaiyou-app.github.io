/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub project pages: https://kuaiyou-app.github.io/kuaiyou-website/
  // Must stay in sync with SITE_BASE_PATH in lib/site.ts.
  basePath: "/kuaiyou-website",
  // Export docs/index.html so GitHub Pages directory-style /docs/ routes work.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
