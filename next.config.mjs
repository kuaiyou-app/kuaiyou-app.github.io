/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub org pages: https://kuaiyou-app.github.io/ (repo renamed to
  // kuaiyou-app.github.io). Must stay in sync with SITE_BASE_PATH in lib/site.ts.
  basePath: "",
  // Export docs/index.html so GitHub Pages directory-style /docs/ routes work.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
