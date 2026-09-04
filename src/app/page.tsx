import Image from "next/image"
import Link from "next/link"

import Arrow from "@/components/Arrow"
import DateRow from "@/components/DateRow"
import ExternalLink from "@/components/ExternalLink"
import Hero from "@/components/Hero"
import SignupForm from "@/components/SignupForm"
import { Display, Text } from "@/components/Type"
import { album, dates, links } from "@/lib/site"

/*
  Five campaign sections, in this order. This is the structure from the client
  brief — don't insert anything between them.

  Excluded per the brief: no discography, no video carousel, no Instagram
  embed, no merch catalogue here.
*/
const HomePage = () => (
  <main className="page">
    {/* 01 — Hero. Client component: pointer parallax + roughened headline. */}
    <Hero />

    {/* 02 — Current single. */}
    <section
      className="bleed on-dark"
      data-screen-label="02 Current single"
    >
      <div className="bleed-bg">
        <Image
          src="/assets/cage-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </div>
      {/* One even scrim over the whole frame — see globals.css. */}
      <div className="bleed-scrim" />

      {/* White glyph, for the dark bed. A tiny PNG — plain <img> on purpose. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="bleed-icon"
        src="/assets/icons/the-cage.png"
        alt=""
      />
      <Display
        step="title"
        className="bleed-title"
      >
        {album.currentSingle}
      </Display>
      <Text step="eyebrow">Out now</Text>
      <div className="btn-row btn-row-center">
        <ExternalLink
          className="btn btn-primary-light"
          href={links.album}
        >
          Listen
          <Arrow />
        </ExternalLink>
        <Link
          className="btn btn-outline-light"
          href="/videos"
        >
          Watch
        </Link>
      </div>
    </section>

    {/* 03 — Live. Three dates here; the full list lives on /live. */}
    <section
      className="section section-sand-deep"
      data-screen-label="03 Live"
    >
      <div className="wrap stack stack-md">
        <Display step="section">Live</Display>
        <div className="dates">
          {dates.slice(0, 3).map((show) => (
            <DateRow
              key={show.date + show.city}
              show={show}
            />
          ))}
          <div className="dates-end" />
        </div>
        <Link
          className="btn btn-outline self-start"
          href="/live"
        >
          View all dates
        </Link>
      </div>
    </section>

    {/* 04 — Merch. One product only; the brief explicitly excluded a
        catalogue here. */}
    <section
      className="section section-sand"
      data-screen-label="04 Merch"
    >
      <div className="wrap grid grid-2-merch">
        <div className="stack stack-sm">
          <Display step="feature">
            Purgatory
            <br />
            Cove
          </Display>
          <Text step="meta">Limited edition vinyl</Text>
          <Link
            className="btn btn-primary self-start"
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
      className="section-ink signup"
      data-screen-label="05 Sign up"
    >
      <div className="wrap-narrow signup-inner">
        <Display
          step="feature"
          className="signup-title"
        >
          Stay in
          <br />
          the loop
        </Display>
        <SignupForm />
      </div>
    </section>
  </main>
)

export default HomePage
