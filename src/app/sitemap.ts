import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site"

/*
  Replaces the old static public/sitemap.xml, which listed one URL with a 2021
  lastmod. /store is included even though the nav points at the Shopify
  storefront — the page is still live and indexable.
*/
const routes = [
  { path: "/", priority: 1 },
  { path: "/music", priority: 0.9 },
  { path: "/live", priority: 0.8 },
  { path: "/videos", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/store", priority: 0.5 },
]

const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date()

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/live" ? "weekly" : "monthly",
    priority,
  }))
}

export default sitemap
