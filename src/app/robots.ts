import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/site"

/*
  Replaces the old static public/robots.txt, which pointed at a stale sitemap.

  The AI crawlers are listed explicitly rather than left to the `*` rule. Some
  of them (OAI-SearchBot, PerplexityBot, ClaudeBot) are the retrieval side of
  an answer engine — being crawlable there is what makes the artist show up in
  a generated answer at all. They are named so the intent survives if the `*`
  rule is ever tightened.
*/
const aiAgents = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "meta-externalagent",
]

const robots = (): MetadataRoute.Robots => ({
  rules: [
    { userAgent: "*", allow: "/" },
    { userAgent: aiAgents, allow: "/" },
  ],
  sitemap: `${siteUrl}/sitemap.xml`,
  host: siteUrl,
})

export default robots
