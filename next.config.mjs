/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub project pages: https://kuaiyou-app.github.io/kuaiyou-website/
  // For an org-root site (kuaiyou-app.github.io), set this to "" and rename the repo.
  basePath: "/kuaiyou-website",
  // Export docs/index.html so GitHub Pages directory-style /docs/ routes work.
  trailingSlash: true,
};

export default nextConfig;
