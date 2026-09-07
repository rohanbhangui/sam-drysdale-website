import Image from "next/image"
import Link from "next/link"

import Arrow from "@/components/Arrow"
import DateRow from "@/components/DateRow"
import ExternalLink from "@/components/ExternalLink"
import Hero from "@/components/Hero"
import { Display, Text } from "@/components/Type"
import { getLiveShows } from "@/lib/bandsintown"
import { album, links } from "@/lib/site"
import { buttonStyles } from "@/components/buttonStyles"
import styles from "./Home.module.css"

/*
  Five campaign sections, in this order. This is the structure from the client
  brief — don't insert anything between them.

  Excluded per the brief: no discography, no video carousel, no Instagram
  embed, no merch catalogue here.
*/
const HomePage = async () => {
  /* Falls back to the placeholder list on any failure — see lib/bandsintown. */
  const { shows } = await getLiveShows()

  return (
    <main className="[animation:pageIn_0.8s_var(--ease-cove)_both]">
      {/* 01 — Hero. Client component: pointer parallax + roughened headline. */}
      <Hero />

      {/* 02 — Current single. */}
      <section
        className={styles.bleed}
        data-screen-label="02 Current single"
      >
        <div className={styles.background}>
          {/* The A Place video still — the same 2560x1440 frame the /videos
              hero uses, referenced rather than duplicated. Swap alongside
              `album.currentSingle` when the next single lands. */}
          <Image
            src="/assets/videos/a-place.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </div>
        {/* One even scrim over the whole frame — see Home.module.css. */}
        <div className={styles.scrim} />

        {/* White glyph, for the dark bed. A tiny PNG — plain <img> on purpose. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.icon}
          src="/assets/icons/a-place.png"
          alt=""
        />
        <Display step="title" className="text-bone">
          {album.currentSingle}
        </Display>
        <Text
          step="eyebrow"
          className="text-[rgba(247,243,233,0.72)]"
        >
          Out now
        </Text>
        <div className="flex flex-wrap justify-center gap-3">
          <ExternalLink
            className={buttonStyles.primaryLight}
            href={links.album}
          >
            Listen
            <Arrow />
          </ExternalLink>
          <Link className={buttonStyles.outlineLight} href="/videos">
            Watch
          </Link>
        </div>
      </section>

      {/* 03 — Live. Three dates here; the full list lives on /live. */}
      <section
        className="bg-sand-deep px-(--gutter) py-[clamp(80px,12vh,150px)]"
        data-screen-label="03 Live"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-[clamp(28px,5vh,52px)]">
          <Display step="section">Live</Display>
          {shows.length > 0 ? (
            <div className="flex flex-col">
              {shows.slice(0, 3).map((show) => (
                <DateRow key={show.id} show={show} />
              ))}
              <div className="border-t border-[rgba(20,18,13,0.16)]" />
            </div>
          ) : (
            /* Between routings Bandsintown returns an empty list. Say so rather
             than rendering a bare rule with nothing under it. */
            <Text step="meta">No dates announced right now.</Text>
          )}
          <Link
            className={`${buttonStyles.outline} self-start`}
            href="/live"
          >
            View all dates
          </Link>
        </div>
      </section>

      {/* 04 — Merch. One product only; the brief explicitly excluded a
        catalogue here. */}
      <section
        className="bg-sand px-(--gutter) py-[clamp(80px,12vh,150px)]"
        data-screen-label="04 Merch"
      >
        <div className="mx-auto grid max-w-[1400px] grid-2-merch">
          <div className="flex flex-col gap-[clamp(16px,2.6vh,28px)]">
            <Display step="feature">
              Purgatory
              <br />
              Cove
            </Display>
            <Text step="meta">Limited edition vinyl</Text>
            <Link
              className={`${buttonStyles.primary} self-start`}
              href="/store"
            >
              Pre-order
              <Arrow />
            </Link>
          </div>
          <div className="plate">
            <div className="plate-well">
              {/* TODO: replace with the real vinyl mock-up. */}
              <span className="slot">Vinyl mock-up</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Sign up. */}
      <section
        className="bg-ink px-(--gutter) py-[clamp(80px,13vh,170px)] text-sand"
        data-screen-label="05 Sign up"
      >
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-[clamp(20px,3.5vh,36px)] text-center">
          <Display step="feature" className="text-sand">
            Stay in
            <br />
            the loop
          </Display>
          {/* Laylo owns the capture — no form here. The old inline form
              only faked success and never sent the address anywhere. */}
          <ExternalLink
            className={buttonStyles.primaryLight}
            href={links.newsletter}
          >
            Join the list
            <Arrow />
          </ExternalLink>
        </div>
      </section>
    </main>
  )
}

export default HomePage
