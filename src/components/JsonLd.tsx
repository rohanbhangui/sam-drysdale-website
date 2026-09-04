import {
  album,
  contacts,
  dates,
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
          foundingLocation: { "@type": "Place", name: "Toronto, Ontario, Canada" },
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
  TODO: these carry placeholder venues and no real start times, so they are
  deliberately marked EventScheduled with a city-level location only. Once the
  Bandsintown fetch lands, feed it real `startDate` and venue names — an Event
  with a fabricated time is worse than no Event at all.
*/
export const EventsJsonLd = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@graph": dates.map(({ date, city, venue, href }) => ({
        "@type": "MusicEvent",
        name: `Sam Drysdale — ${city}`,
        performer: { "@id": artistId },
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: venue,
          address: { "@type": "PostalAddress", addressLocality: city },
        },
        url: href,
        description: `${date} · ${city}`,
      })),
    }}
  />
)

export const VideosJsonLd = () => (
  <JsonLd
    data={{
      "@context": "https://schema.org",
      "@graph": [featuredVideo, ...videos].map(({ title, meta, image, href }) => ({
        "@type": "VideoObject",
        name: `${title} — ${meta}`,
        description: `${title} by Sam Drysdale. ${meta}.`,
        thumbnailUrl: `${siteUrl}${image}`,
        contentUrl: href,
        uploadDate: "2026-09-01",
      })),
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
