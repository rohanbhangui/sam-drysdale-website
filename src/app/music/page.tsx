import type { Metadata } from "next"
import Image from "next/image"

import Arrow from "@/components/Arrow"
import ExternalLink from "@/components/ExternalLink"
import { Display, Text } from "@/components/Type"
import { album, links, tracks } from "@/lib/site"
import { AlbumJsonLd } from "@/components/JsonLd"
import { buttonStyles } from "@/components/buttonStyles"

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
  <main className="pt-(--header-h) [animation:pageIn_0.8s_var(--ease-cove)_both]">
    <AlbumJsonLd />
    <section className="bg-sand px-(--gutter) pt-[clamp(56px,9vh,120px)] pb-[clamp(48px,7vh,90px)]">
      <div className="mx-auto grid max-w-[1400px] grid-2-album">
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
        <div className="flex flex-col gap-[clamp(16px,2.6vh,28px)]">
          <Text
            as="span"
            step="eyebrow"
            className="text-[rgba(20,18,13,0.6)]"
          >
            The debut album
          </Text>
          <Display as="h1" step="section">
            Purgatory
            <br />
            Cove
          </Display>
          <Text step="meta">{album.releaseDate}</Text>
          <div className="flex flex-wrap gap-3">
            <ExternalLink
              className={buttonStyles.primary}
              href={links.album}
            >
              Pre-order
              <Arrow />
            </ExternalLink>
            <ExternalLink
              className={buttonStyles.outline}
              href={links.album}
            >
              Pre-save
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>

    <section className="border-t border-[rgba(20,18,13,0.1)] bg-sand-deep px-(--gutter) py-[clamp(64px,10vh,130px)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-[clamp(28px,5vh,52px)]">
        <Display step="sub">Thirteen songs</Display>
        {/* Rows mirror DateRow: same hover indent, same right-aligned
            action. They deliberately do NOT link to a track — nothing is
            streamable yet — they point at the album pre-save, the same
            place as the button at the top of the page. Swap the label to
            "Listen" and the href to per-track links after release. The glyph
            grid this replaced is preserved in git, its art in
            public/assets/icons-black — see the note in lib/site.ts. */}
        <ol className="flex flex-col">
          {tracks.map(({ title }, index) => (
            <li key={title}>
              <ExternalLink
                className="grid-track grid w-full items-baseline gap-x-5 border-t border-[rgba(20,18,13,0.16)] py-[clamp(14px,2.2vh,24px)] transition-[padding] duration-600 ease-cove hover:pl-3.5 hover:text-inherit"
                href={links.album}
              >
                <span className="text-[11px] font-medium tracking-[0.18em] text-[rgba(20,18,13,0.42)] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-row font-light tracking-[0.06em]">
                  {title}
                </span>
                <span className="text-[11px] font-medium tracking-[0.22em] text-teal uppercase">
                  Pre-save
                </span>
              </ExternalLink>
            </li>
          ))}
          <li className="border-t border-[rgba(20,18,13,0.16)]" />
        </ol>
      </div>
    </section>
  </main>
)

export default MusicPage
