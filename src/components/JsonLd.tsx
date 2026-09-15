import type { LiveShow } from "@/lib/bandsintown"
import {
  album,
  contacts,
  links,
  siteUrl,
  socials,
  tracks,
  videos,
  featuredVideo,
} from "@/lib/site"

/*
  Schema.org graphs.

  This is the highest-leverage part of the SEO work: a crawler reading the page
  sees enormous display type and almost no prose, so the structured data is
  what actually tells Google and the answer engines that this is a musician,
  that Purgatory Cove is an album released on a specific date, which songs are
  on it, and when the tour dates are. Without it there is very little text to
  reason about.

  Emitted as a single @graph per page so the nodes can cross-reference by @id.
*/

const artistId = `${siteUrl}/#artist`
const albumId = `${siteUrl}/music#album`
const websiteId = `${siteUrl}/#website`

const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    // Values here are our own constants, not user input.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

/** Artist + website. Rendered on every page from the root layout. */
export const SiteJsonLd = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MusicGroup",
          "@id": artistId,
          name: "Sam Drysdale",
          url: siteUrl,
          genre: ["Indie Folk", "Singer-Songwriter", "Alternative"],
          foundingLocation: {
            "@type": "Place",
            name: "Toronto, Ontario, Canada",
          },
          image: `${siteUrl}/assets/og-bg.jpg`,
          sameAs: socials.map(({ href }) => href),
          album: { "@id": albumId },
        },
        {
          "@type": "WebSite",
          "@id": websiteId,
          url: siteUrl,
          name: "Sam Drysdale",
          publisher: { "@id": artistId },
          inLanguage: "en",
        },
      ],
    }}
  />
)

/** Album + its thirteen tracks. */
export const AlbumJsonLd = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "MusicAlbum",
      "@id": albumId,
      name: album.title,
      albumProductionType: "https://schema.org/StudioAlbum",
      albumReleaseType: "https://schema.org/AlbumRelease",
      numTracks: tracks.length,
      byArtist: { "@id": artistId },
      // TODO: swap for the confirmed ISO release date once the label locks it.
      datePublished: "2026-10-23",
      image: `${siteUrl}/assets/cover-digital.jpg`,
      url: `${siteUrl}/music`,
      track: tracks.map(({ title }, index) => ({
        "@type": "MusicRecording",
        position: index + 1,
        name: title,
        byArtist: { "@id": artistId },
      })),
      offers: {
        "@type": "Offer",
        url: links.album,
        availability: "https://schema.org/PreOrder",
      },
    }}
  />
)

/*
  Tour dates.

  Fed by the Bandsintown fetch, which is the only source of a trustworthy
  `startDate` — an Event with a fabricated time is worse than no Event at all.
  So the placeholder list emits nothing: `LivePage` passes `shows` only when
  the data is real, and a real-but-empty schedule renders no graph either.
*/
export const EventsJsonLd = ({ shows }: { shows: LiveShow[] }) => {
  if (shows.length === 0) return null

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": shows.map((show) => ({
          "@type": "MusicEvent",
          name: `Sam Drysdale — ${show.city}`,
          performer: { "@id": artistId },
          /* Bandsintown datetimes are venue wall-clock with no offset, which
             is exactly what schema.org wants for a local event time. */
          startDate: show.datetime,
          ...(show.endsAt ? { endDate: show.endsAt } : {}),
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode:
            "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: show.venue,
            address: show.address
              ? {
                  "@type": "PostalAddress",
                  addressLocality: show.address.city,
                  addressRegion: show.address.region,
                  addressCountry: show.address.country,
                  ...(show.address.streetAddress
                    ? { streetAddress: show.address.streetAddress }
                    : {}),
                  ...(show.address.postalCode
                    ? { postalCode: show.address.postalCode }
                    : {}),
                }
              : {
                  "@type": "PostalAddress",
                  addressLocality: show.city,
                },
          },
          url: show.href,
          offers: {
            "@type": "Offer",
            url: show.href,
            availability: show.soldOut
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
            ...(show.onSaleDatetime
              ? { validFrom: show.onSaleDatetime }
              : {}),
          },
        })),
      }}
    />
  )
}

export const VideosJsonLd = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@graph": [featuredVideo, ...videos].map(
        ({ title, meta, image, href, uploadDate }) => ({
          "@type": "VideoObject",
          name: `${title} — ${meta}`,
          description: `${title} by Sam Drysdale. ${meta}.`,
          thumbnailUrl: `${siteUrl}${image}`,
          /* Real YouTube watch URL, and the video's actual publish date —
             both required for a VideoObject to be eligible for rich results. */
          contentUrl: href,
          embedUrl: href.replace("watch?v=", "embed/"),
          uploadDate,
          author: { "@id": artistId },
        }),
      ),
    }}
  />
)

export const AboutJsonLd = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@type": "AboutPage",
      url: `${siteUrl}/about`,
      mainEntity: { "@id": artistId },
      // Publicists and management, so a search engine can attribute enquiries.
      about: contacts.map(({ role, name, email }) => ({
        "@type": "ContactPoint",
        contactType: role,
        name,
        email,
      })),
    }}
  />
)
