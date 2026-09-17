/** @type {import('next').NextConfig} */
const nextConfig = {
  // Drops the `X-Powered-By: Next.js` response header — no functional
  // purpose, just tells the world what to target.
  poweredByHeader: false,

  // Old Wix product URLs (e.g. /product-page/i-m-a-product-6) are still
  // getting crawled and 404ing years later. Send them to the live store
  // instead of leaving them dead.
  async redirects() {
    return [
      {
        source: "/product-page/:slug*",
        destination: "/store",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
