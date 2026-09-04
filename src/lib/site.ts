/*
  Single source of truth for copy and links. Everything the client still owes
  is marked TODO so the placeholders are findable in one file rather than
  scattered through six pages.
*/

export const siteUrl = "https://www.samdrysdalemusic.com"

export const links = {
  album: "https://onerpm.link/PurgatoryCove",
  newsletter: "https://laylo.com/samdrysdalemusic/CSLIaz",
  bandsintown: "https://www.bandsintown.com/a/15565154-sam-drysdale",
  instagram: "https://www.instagram.com/samdrysdalemusic",
  tiktok: "https://www.tiktok.com/@samdrysdalemusic",
  youtube: "https://www.youtube.com/@samdrysdalemusic",
  // Live Shopify storefront. The /store route stays built but unlinked for
  // now — point the nav back at it once that page has real products.
  shop: "https://shop.samdrysdalemusic.com/",
  // TODO: replace both with the real artist URLs
  spotify: "https://open.spotify.com",
  appleMusic: "https://music.apple.com",
} as const

/** Bandsintown artist id, for the fetch that should replace `dates` below. */
export const bandsintownArtistId = "15565154-sam-drysdale"

export const album = {
  title: "Purgatory Cove",
  releaseDate: "October 23",
  currentSingle: "The Cage",
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

/* TODO: sequence is not confirmed by the client — get the real order. */
export const tracks: Track[] = [
  { title: "Purgatory Cove", icon: "purgatory-cove" },
  { title: "The Cage", icon: "the-cage" },
  { title: "Cold Water", icon: "cold-water" },
  { title: "Black Dog", icon: "black-dog" },
  { title: "A Place", icon: "a-place" },
  { title: "Apples", icon: "apples" },
  { title: "Boys", icon: "boys" },
  { title: "The Window", icon: "the-window" },
  { title: "The Astronaut", icon: "the-astronaut" },
  { title: "Rusty Knight", icon: "rusty-knight" },
  { title: "Conversations With No One", icon: "conversations-with-no-one" },
  { title: "Love You Into Loving Me", icon: "love-you-into-loving-me" },
  { title: "Who's Gonna Love You", icon: "whos-gonna-love-you" },
]

export type ShowDate = {
  date: string
  city: string
  venue: string
  href: string
}

/* TODO: placeholders — replace with a Bandsintown fetch in a server
   component, keeping the row markup identical so the design survives real
   data. The home page shows the first three. */
export const dates: ShowDate[] = [
  { date: "Oct 22", city: "Toronto, ON", venue: "Venue TBA", href: links.bandsintown },
  { date: "Oct 25", city: "Montreal, QC", venue: "Venue TBA", href: links.bandsintown },
  { date: "Nov 01", city: "Halifax, NS", venue: "Venue TBA", href: links.bandsintown },
  { date: "Nov 07", city: "Ottawa, ON", venue: "Venue TBA", href: links.bandsintown },
  { date: "Nov 14", city: "Vancouver, BC", venue: "Venue TBA", href: links.bandsintown },
  { date: "Nov 21", city: "New York, NY", venue: "Venue TBA", href: links.bandsintown },
]

export type Video = {
  title: string
  meta: string
  image: string
  href: string
}

/* TODO: thumbnails are album photography standing in for video stills. Real
   build: YouTube ids, thumbnail from i.ytimg.com/vi/<id>/maxresdefault.jpg,
   click opens a modal or facade player. Do not embed live iframes in the
   grid — five players will wreck LCP. */
export const featuredVideo: Video = {
  title: "The Cage",
  meta: "Official video",
  image: "/assets/cove-brighter-3.jpg",
  href: links.youtube,
}

export const videos: Video[] = [
  { title: "Cold Water", meta: "Official video", image: "/assets/insert-2.jpg", href: links.youtube },
  { title: "Black Dog", meta: "Live session", image: "/assets/insert-3.jpg", href: links.youtube },
  { title: "Purgatory Cove", meta: "Album trailer", image: "/assets/album-cover.jpg", href: links.youtube },
  { title: "The Window", meta: "Official video", image: "/assets/back-cover.jpg", href: links.youtube },
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
  { title: "Purgatory Cove, CD", price: "Pre-order", slot: "CD mock-up", href: links.album },
  { title: "Cove Tee", price: "Coming soon", slot: "Tee mock-up", href: links.album },
]

export type Contact = { role: string; name: string; email: string }

export const contacts: Contact[] = [
  { role: "Press CA", name: "Dayna Shiskos, Red Umbrella", email: "dayna@redumbrellapr.com" },
  { role: "Press US", name: "Avery King Smith, King Publicity", email: "avery@kingpublicity.com" },
  { role: "Label", name: "Lindsey Terry, ONErpm", email: "lindsey.terry@onerpm.com" },
  { role: "Management", name: "Guillaume Moffet, Friends & Family", email: "guillaume@frndsandfmly.co" },
]

export const socials: NavItem[] = [
  { label: "Instagram", href: links.instagram },
  { label: "TikTok", href: links.tiktok },
  { label: "YouTube", href: links.youtube },
  { label: "Spotify", href: links.spotify },
  { label: "Apple Music", href: links.appleMusic },
]
