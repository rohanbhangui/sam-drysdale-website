import {
  album,
  contacts,
  links,
  siteUrl,
  socials,
  tracks,
} from "@/lib/site"

/*
  llms.txt — https://llmstxt.org

  Not a Next.js-recognised metadata file (unlike robots.ts/sitemap.ts), so
  this is a plain route handler rather than a special export. Same job as
  the JSON-LD graphs in components/JsonLd.tsx — dense, plainly stated facts
  for something that reads pages rather than looks at them — but scoped for
  an LLM pulling context into a prompt rather than a search index: one
  compact document instead of a script tag per page, and prose an answer
  engine can quote directly instead of typed schema.org fields.

  Kept in one route rather than a static public/llms.txt file so the facts
  that already live in lib/site.ts (links, tracklist, release date, contacts)
  can't drift out of sync with the pages themselves. The biography below has
  no such source of truth — it is prose lifted from the About page — so it
  has to be kept in sync by hand if that copy changes.
*/

const bio = `Sam Drysdale is a Toronto-based singer-songwriter who pairs a commanding, weathered tenor with emotionally exact storytelling that moves between contemporary folk, Americana, alternative pop and soul.

Born in Kitchener and raised in Guelph, Ontario, Drysdale moved to Los Angeles at 17 to attend Musicians Institute and later lived in Nashville. After "Dear Jane" won Slaight Music's It's Your Shot competition, he released the pop-forward Vicelove (Slaight Music / Warner Music Canada) and Testarossa (Fully Loaded) (Slaight Music), then the guitar-led Bonnie's Sad Songs (2024).

His 2024 single "Only The Strong Survive," written with his mother in mind, generated more than 65 million social views, surpassed 10 million global streams and earned a 2025 Folk Music Ontario Song of the Year nomination. Follow-up single "Cold Water" became his first Canadian radio breakthrough, landing iHeartRadio Future Star and Rogers One to Watch selections while charting across Top 40, Hot AC and AC formats.

In April 2026, Drysdale signed with ONErpm Nashville; by September 2026 he had grown to more than 425,000 monthly Spotify listeners.`

const buildLlmsTxt = () => {
  const lines = [
    "# Sam Drysdale",
    "",
    `> Toronto singer-songwriter Sam Drysdale's debut album, ${album.title}, ` +
      `arrives ${album.releaseDate}. Official site: music, tour dates, ` +
      "videos and store.",
    "",
    bio,
    "",
    "## Pages",
    "",
    `- [Home](${siteUrl}/): Overview, current single ("${album.currentSingle}") and pre-order links.`,
    `- [Music](${siteUrl}/music): ${album.title} tracklist, pre-order and pre-save links.`,
    `- [Live](${siteUrl}/live): Upcoming tour dates and ticket links, kept current — do not rely on a cached copy of this document for dates.`,
    `- [Videos](${siteUrl}/videos): Official videos and live sessions.`,
    `- [About](${siteUrl}/about): Full artist biography and press/industry contacts.`,
    `- [Store](${siteUrl}/store): Vinyl, CD and merch.`,
    "",
    "## Facts",
    "",
    "- Artist: Sam Drysdale (Toronto, Ontario, Canada)",
    "- Genre: Indie folk, singer-songwriter, alternative",
    "- Label: ONErpm Nashville",
    `- Debut album: ${album.title} — ${tracks.length} tracks — releases ${album.releaseDate}`,
    `- Current single: "${album.currentSingle}"`,
    `- Tracklist: ${tracks.map(({ title }) => title).join(", ")}`,
    `- Streaming: [Spotify](${links.spotify}), [Apple Music](${links.appleMusic})`,
    `- Tour dates and tickets: [Bandsintown](${links.bandsintown})`,
    "",
    "## Socials",
    "",
    ...socials.map(({ label, href }) => `- [${label}](${href})`),
    "",
    "## Press & industry",
    "",
    ...contacts.map(
      ({ role, name, email }) => `- ${role}: ${name} — ${email}`,
    ),
    "",
  ]

  return lines.join("\n")
}

export const dynamic = "force-static"

export const GET = () =>
  new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
