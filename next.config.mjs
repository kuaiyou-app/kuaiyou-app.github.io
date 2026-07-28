/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub org pages: https://kuaiyou-app.github.io/
  basePath: "",
  // Export docs/index.html so GitHub Pages directory-style /docs/ routes work.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
