import type { Metadata } from "next"
import Image from "next/image"

import Arrow from "@/components/Arrow"
import ExternalLink from "@/components/ExternalLink"
import { Display, Text } from "@/components/Type"
import { album, links, tracks } from "@/lib/site"
import { AlbumJsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "Music",
  description: `${album.title} is the debut album from Sam Drysdale — thirteen songs, out ${album.releaseDate}. Pre-order the vinyl or pre-save the record.`,
  alternates: { canonical: "/music" },
  /* Without its own openGraph block a page inherits the root one wholesale,
     so every share preview would read "Sam Drysdale — Purgatory Cove". */
  openGraph: {
    title: "Music — Sam Drysdale",
    url: "/music",
  },
  twitter: {
    title: "Music — Sam Drysdale",
  },
}

const MusicPage = () => (
  <main className="page page-interior">
    <AlbumJsonLd />
    <section className="section-sand section-album">
      <div className="wrap grid grid-2-album">
        <div className="plate plate-album">
          <Image
            src="/assets/cover-digital.jpg"
            alt={`${album.title} album cover`}
            width={1400}
            height={1400}
            priority
            sizes="(max-width: 700px) 100vw, 620px"
          />
        </div>
        <div className="stack stack-sm">
          <Text
            as="span"
            step="eyebrow"
            className="eyebrow-ink"
          >
            The debut album
          </Text>
          <Display
            as="h1"
            step="section"
          >
            Purgatory
            <br />
            Cove
          </Display>
          <Text step="meta">{album.releaseDate}</Text>
          <div className="btn-row">
            <ExternalLink
              className="btn btn-primary"
              href={links.album}
            >
              Pre-order
              <Arrow />
            </ExternalLink>
            <ExternalLink
              className="btn btn-outline"
              href={links.album}
            >
              Pre-save
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>

    <section className="section section-sand-deep section-tracks">
      <div className="wrap stack stack-md">
        <Display step="sub">Thirteen songs</Display>
        <div className="grid grid-tracks">
          {tracks.map(({ title, icon }) => (
            <div
              className="track"
              key={icon}
            >
              <div className="track-icon">
                {/* Dark glyphs, for the sandstone background. Tiny PNGs —
                    next/image optimisation would cost more than it saves. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/icons-black/${icon}.png`}
                  alt=""
                />
              </div>
              <span className="track-title">{title}</span>
            </div>
          ))}
        </div>
        <Text step="caption">Track order to be confirmed</Text>
      </div>
    </section>
  </main>
)

export default MusicPage
