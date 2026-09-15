/*
  Bandsintown artist-events fetch.

  API: https://rest.bandsintown.com — spec at
  https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.1

  Only two endpoints exist and only one matters here:

    GET /artists/id_{artist_id}/events?app_id=…&date=upcoming

  `app_id` is mandatory on every call and is issued by Bandsintown on request
  (artists.bandsintown.com/support/api-installation). It is not a secret in the
  cryptographic sense — the widget ships it client-side — but we keep it
  server-side anyway so the key can be rotated without a redeploy of anything
  cached in browsers, and so an abusive client cannot burn our quota.

  `date` accepts "upcoming" | "past" | "all" | "2026-01-01,2026-12-31".
  A 200 is always a JSON array; an unknown artist yields a non-array error
  body, which is why `Array.isArray` guards the parse.

  Bandsintown publish no numeric rate limit, but their "Optimizing API usage"
  note asks integrators to cache aggressively, reuse confirmed ids rather than
  re-deriving them, and back off on 404s for 24h or more — they reserve the
  right to throttle or suspend keys that don't. Hence a single id-based call
  behind Next's data cache, revalidated hourly.

  Caching note (Next 16): fetch is NOT cached by default any more — it is
  opt-in. The `next.revalidate` below is what puts this in the persistent data
  cache; without it we would hit Bandsintown on every single request. See
  https://nextjs.org/docs/app/api-reference/functions/fetch
*/

import { cache } from "react"

import { bandsintownArtistId, links } from "@/lib/site"

const API_BASE = "https://rest.bandsintown.com"

/** Tour routing changes on the order of days, not seconds. */
const REVALIDATE_SECONDS = 60 * 60

/*
  Bandsintown is a third party in the critical path of a statically rendered
  page. Cap it so a hung connection stalls one background regeneration rather
  than the build. Passing a signal opts this fetch out of Next's per-render
  memoization, which is why `getLiveShows` is wrapped in React.cache below.
*/
const TIMEOUT_MS = 8000

/* ---------- wire format ---------- */

/*
  Transcribed from an actual live response, NOT from the SwaggerHub spec —
  the published spec (v3.0.1) is out of date and the real payload carries a
  lot more. Divergences that matter, all verified against artist 15565154:

  - `sold_out` and `free` exist as top-level booleans. The spec implies you
    must infer availability from `offers[].status`; don't, just read the flag.
  - `ends_at` exists, so events have a real end time for schema.org.
  - `venue.location` arrives pre-formatted ("Ottawa, ON").
  - `venue` also carries `street_address` and `postal_code`.
  - `on_sale_datetime` comes back as "" — an empty string, not null.
  - The event embeds a whole `artist` object, including a `links` array of
    verified streaming URLs.
  - `venue.name` is unreliable — see `venueLabel` below.
*/

type BandsintownVenue = {
  /** Pre-formatted "City, REGION". */
  location: string
  /** Often the event title rather than a venue — see `venueLabel`. */
  name: string
  latitude: string
  longitude: string
  street_address?: string
  postal_code?: string
  city: string
  region: string
  country: string
}

type BandsintownOffer = {
  /** In practice "Tickets". */
  type: string
  url: string
  /** "available" | "sold out" | … */
  status: string
}

type BandsintownEvent = {
  id: string
  artist_id: string
  url: string
  /** Empty string when there is no on-sale date, never null. */
  on_sale_datetime?: string
  /** Local venue time with NO offset, e.g. "2026-10-22T19:30:00". */
  datetime: string
  starts_at?: string
  ends_at?: string
  description?: string
  title?: string
  venue: BandsintownVenue
  offers: BandsintownOffer[]
  lineup: string[]
  sold_out?: boolean
  free?: boolean
  festival_start_date?: string
  festival_end_date?: string
}

/* ---------- what the UI consumes ---------- */

/*
  A superset of `ShowDate`, so DateRow keeps rendering the same four fields and
  the design survives real data untouched. The extra fields exist for JSON-LD,
  which needs a machine-readable start time and a structured address.
*/
export type LiveShow = {
  id: string
  /** Display string, e.g. "Oct 22". */
  date: string
  /** Display string, e.g. "Toronto, ON". */
  city: string
  venue: string
  href: string
  /** Local venue time, no offset — exactly as Bandsintown sends it. */
  datetime: string | null
  endsAt: string | null
  address: {
    city: string
    region: string
    country: string
    streetAddress?: string
    postalCode?: string
  } | null
  soldOut: boolean
  onSaleDatetime: string | null
}

export type LiveShows = {
  shows: LiveShow[]
}

/* ---------- formatting ---------- */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

/*
  Bandsintown datetimes carry no timezone, because they are wall-clock time at
  the venue. Feeding that to `new Date()` would reinterpret it in the server's
  zone and could shift a late show onto the previous day, so parse the digits
  directly instead.
*/
const formatDate = (datetime: string) => {
  const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(datetime)
  if (!parts) return ""
  const month = MONTHS[Number(parts[2]) - 1]
  return month ? `${month} ${parts[3]}` : ""
}

/*
  Bandsintown already formats this as "Ottawa, ON". Fall back to assembling it
  ourselves, using the country where a region is missing (most of Europe).
*/
const formatCity = (venue: BandsintownVenue) =>
  venue.location?.trim() ||
  [venue.city, venue.region || venue.country]
    .filter(Boolean)
    .join(", ")

/*
  `venue.name` cannot be trusted. When a promoter creates an event without
  attaching a real venue record, Bandsintown echoes the EVENT TITLE into it —
  live data for this artist returns venue.name "Sam Drydale: Purgatory Cove",
  which would render the title twice in a row that already shows the city.

  So: use the name only when it differs from the title, else fall back to the
  street address, which is populated in both live events.
*/
const venueLabel = (event: BandsintownEvent) => {
  const name = event.venue.name?.trim() ?? ""
  const title = event.title?.trim() ?? ""
  if (name && name !== title) return name
  return event.venue.street_address?.trim() || "Venue TBA"
}

/*
  Prefer a real ticketing link; fall back to the Bandsintown event page, which
  always exists and always has a buy path of its own.
*/
const ticketHref = (event: BandsintownEvent) => {
  const offers = Array.isArray(event.offers) ? event.offers : []
  const live = offers.find(
    (offer) =>
      offer.url && offer.status?.toLowerCase() === "available",
  )
  return (
    live?.url ?? offers.find((offer) => offer.url)?.url ?? event.url
  )
}

const toLiveShow = (event: BandsintownEvent): LiveShow | null => {
  if (!event?.datetime || !event.venue) return null
  const date = formatDate(event.datetime)
  if (!date) return null

  return {
    id: String(event.id),
    date,
    city: formatCity(event.venue),
    venue: venueLabel(event),
    href: ticketHref(event),
    datetime: event.datetime,
    endsAt: event.ends_at?.trim() || null,
    address: {
      city: event.venue.city,
      region: event.venue.region,
      country: event.venue.country,
      streetAddress: event.venue.street_address?.trim() || undefined,
      postalCode: event.venue.postal_code?.trim() || undefined,
    },
    // Top-level flag beats inferring from offers — see the wire-format note.
    soldOut: event.sold_out === true,
    // Comes back as "" rather than null when there is no on-sale date.
    onSaleDatetime: event.on_sale_datetime?.trim() || null,
  }
}

/* ---------- the fetch ---------- */

/*
  `bandsintownArtistId` is the slug out of the artist page URL
  ("15565154-sam-drysdale"). The API's id_ form wants the numeric half only.
*/
const numericArtistId = bandsintownArtistId.split("-")[0]

/**
 * Upcoming shows for the artist, in the order Bandsintown returns them.
 *
 * Never throws. There is deliberately no invented-data fallback: on any
 * failure this returns an empty list and the pages render their "no dates
 * announced" state. Showing fabricated dates would be worse than showing
 * none — fans would plan around shows that do not exist, and the Event
 * structured data would contradict the visible page.
 *
 * In practice an outage rarely reaches a visitor anyway: these routes are
 * statically rendered, so a failed background revalidation leaves the last
 * good build in place rather than replacing it with the empty state.
 */
export const getLiveShows = cache(async (): Promise<LiveShows> => {
  const appId = process.env.BANDSINTOWN_APP_ID

  if (!appId) {
    console.error("Bandsintown: BANDSINTOWN_APP_ID is not set")
    return { shows: [] }
  }

  const url =
    `${API_BASE}/artists/id_${encodeURIComponent(numericArtistId)}/events` +
    `?app_id=${encodeURIComponent(appId)}&date=upcoming`

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      // Opts into the persistent data cache; `tags` enables revalidateTag.
      next: { revalidate: REVALIDATE_SECONDS, tags: ["bandsintown"] },
    })

    if (!response.ok) {
      console.error(
        `Bandsintown: ${response.status} ${response.statusText}`,
      )
      return { shows: [] }
    }

    // A 200 for an unknown artist returns an error object, not an array.
    const payload: unknown = await response.json()
    if (!Array.isArray(payload)) {
      console.error("Bandsintown: unexpected payload shape", payload)
      return { shows: [] }
    }

    const shows = (payload as BandsintownEvent[])
      .map(toLiveShow)
      .filter((show): show is LiveShow => show !== null)

    return { shows }
  } catch (error) {
    console.error("Bandsintown: request failed", error)
    return { shows: [] }
  }
})

/** Where to send people when there is nothing to list. */
export const bandsintownArtistUrl = links.bandsintown
