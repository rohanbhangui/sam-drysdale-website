import type { Metadata } from "next"

/*
  Single source of truth for copy and links. Everything the client still owes
  is marked TODO so the placeholders are findable in one file rather than
  scattered through six pages.
*/

export const siteUrl = "https://www.samdrysdalemusic.com"

export const links = {
  album: "https://onerpm.link/PurgatoryCove",
  newsletter: "https://laylo.com/samdrysdalemusic",
  bandsintown: "https://www.bandsintown.com/a/15565154-sam-drysdale",
  instagram: "https://www.instagram.com/samdrysdalemusic",
  tiktok: "https://www.tiktok.com/@samdrysdalemusic",
  youtube: "https://www.youtube.com/@samdrysdalemusic",
  // Live Shopify storefront. The /store route stays built but unlinked for
  // now — point the nav back at it once that page has real products.
  shop: "https://shop.samdrysdalemusic.com/",
  /* The vinyl product itself. `album` is the streaming pre-save, which is a
     different action — don't collapse the two. */
  vinyl:
    "https://shop.samdrysdalemusic.com/products/purgatory-cove-this-water-is-home-black-blue-limited-edition",
  // Verified from the Bandsintown API's artist.links array (artist 15565154).
  spotify: "https://open.spotify.com/artist/6zWCrZExrSgGtBjCO1jkjY",
  appleMusic:
    "https://music.apple.com/ca/artist/sam-drysdale/589211182",
} as const

/** Bandsintown artist id. Tour dates are fetched in lib/bandsintown.ts. */
export const bandsintownArtistId = "15565154-sam-drysdale"

/*
  Spread this into every page's `openGraph` block.

  Next.js merges metadata shallowly: a page that declares `openGraph` REPLACES
  the root one outright rather than merging into it. Before this existed, every
  subpage silently dropped og:type, og:site_name and og:locale — only the home
  page carried them. Pages add their own `title` and `url` on top.
*/
export const openGraphBase = {
  type: "website",
  siteName: "Sam Drysdale",
  locale: "en_CA",
  videos: [
    {
      // Absolute on both: scrapers do not resolve relative og:video URLs.
      url: `${siteUrl}/assets/hero.mp4`,
      secureUrl: `${siteUrl}/assets/hero.mp4`,
      type: "video/mp4",
      width: 1920,
      height: 1080,
    },
  ],
} satisfies Metadata["openGraph"]

export const album = {
  title: "Purgatory Cove",
  releaseDate: "October 23",
  currentSingle: "A Place",
} as const

export type NavItem = {
  label: string
  href: string
  /** Renders as a new-tab link rather than a client-side route. */
  external?: boolean
}

export const nav: NavItem[] = [
  { label: "Music", href: "/music" },
  { label: "Live", href: "/live" },
  { label: "Videos", href: "/videos" },
  { label: "Store", href: links.shop, external: true },
  { label: "About", href: "/about" },
]

export type Track = { title: string; icon: string }

/*
  Confirmed sequence, from the album microsite. Two titles were also wrong
  here before: "Apples" is "Apples and Oranges", and "Who's Gonna Love You"
  is "Who's Gonna Love You the Way I Do?".

  `icon` is retained but not rendered. The client's note was that the glyph
  grid does not make sense until the record is actually out, so /music shows
  a plain tracklist for now — the art stays in public/assets/icons-black so
  the grid can come back after release without redoing this.
*/
export const tracks: Track[] = [
  { title: "A Place", icon: "a-place" },
  { title: "The Window", icon: "the-window" },
  { title: "The Astronaut", icon: "the-astronaut" },
  { title: "The Cage", icon: "the-cage" },
  {
    title: "Conversations With No One",
    icon: "conversations-with-no-one",
  },
  { title: "Rusty Knight", icon: "rusty-knight" },
  { title: "Boys", icon: "boys" },
  { title: "Cold Water", icon: "cold-water" },
  {
    title: "Who's Gonna Love You the Way I Do?",
    icon: "whos-gonna-love-you",
  },
  { title: "Apples and Oranges", icon: "apples" },
  { title: "Black Dog", icon: "black-dog" },
  {
    title: "Love You Into Loving Me",
    icon: "love-you-into-loving-me",
  },
  { title: "Purgatory Cove", icon: "purgatory-cove" },
]

export type Video = {
  title: string
  /** Sits under the title — keeps qualifiers out of the name itself. */
  meta: string
  image: string
  href: string
  /** Real publish date from YouTube, for VideoObject structured data. */
  uploadDate: string
}

/*
  Real stills and real YouTube links. Watch URLs are trimmed to the bare
  `?v=<id>` — the `list=RD…&start_radio=1` tail on the originals is just the
  autoplay-radio state from whoever copied the link, and it would drop fans
  into an algorithmic mix instead of Sam's video.

  `uploadDate` is each video's actual publish date, read off YouTube. Google
  requires it for VideoObject, and a guessed one is worse than none.
*/
export const featuredVideo: Video = {
  title: "A Place",
  meta: "Official video",
  image: "/assets/videos/a-place.jpg",
  href: "https://www.youtube.com/watch?v=o-lw57zo2zM",
  uploadDate: "2026-06-25",
}

export const videos: Video[] = [
  {
    title: "The Cage",
    meta: "Official video",
    image: "/assets/videos/the-cage.jpg",
    href: "https://www.youtube.com/watch?v=HHjTDYVqrFg",
    uploadDate: "2026-08-27",
  },
  {
    title: "The Window",
    meta: "Official video",
    image: "/assets/videos/the-window.jpg",
    href: "https://www.youtube.com/watch?v=mXktMI8ywsU",
    uploadDate: "2026-08-06",
  },
  {
    title: "Cold Water",
    meta: "Official video",
    image: "/assets/videos/cold-water.jpg",
    href: "https://www.youtube.com/watch?v=Slbr-mfhVJQ",
    uploadDate: "2026-05-14",
  },
  {
    /* YouTube titles this one "A Place (Live from The Rock)". Parenthetical
       kept out of the name and demoted to `meta`, per the design. */
    title: "A Place",
    meta: "Acoustic",
    image: "/assets/videos/a-place-acoustic.jpg",
    href: "https://www.youtube.com/watch?v=gJdBiw-HFlQ",
    uploadDate: "2026-07-27",
  },
]

export type Product = {
  title: string
  price: string
  /** Placeholder label until the product shot lands. */
  slot: string
  href: string
}

/* TODO: needs product shots and a real checkout. */
export const products: Product[] = [
  {
    title: "Purgatory Cove, Limited Edition Vinyl",
    price: "Pre-order",
    slot: "Vinyl mock-up",
    href: links.album,
  },
  {
    title: "Purgatory Cove, CD",
    price: "Pre-order",
    slot: "CD mock-up",
    href: links.album,
  },
  {
    title: "Cove Tee",
    price: "Coming soon",
    slot: "Tee mock-up",
    href: links.album,
  },
]

export type Contact = { role: string; name: string; email: string }

export const contacts: Contact[] = [
  {
    role: "Press CA",
    name: "Dayna Shiskos, Red Umbrella",
    email: "dayna@redumbrellapr.com",
  },
  {
    role: "Press US",
    name: "Avery King Smith, King Publicity",
    email: "avery@kingpublicity.com",
  },
  {
    role: "Label",
    name: "Lindsey Terry, ONErpm",
    email: "lindsey.terry@onerpm.com",
  },
  {
    role: "Management",
    name: "Guillaume Moffet, Friends & Family",
    email: "guillaume@frndsandfmly.co",
  },
]

export const socials: NavItem[] = [
  { label: "Instagram", href: links.instagram },
  { label: "TikTok", href: links.tiktok },
  { label: "YouTube", href: links.youtube },
  { label: "Spotify", href: links.spotify },
  { label: "Apple Music", href: links.appleMusic },
]
