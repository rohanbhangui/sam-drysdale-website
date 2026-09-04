import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Arrow from "@/components/Arrow"
import { Display, Text } from "@/components/Type"
import { album } from "@/lib/site"
import { AboutJsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "About",
  description:
    "Sam Drysdale is a Toronto singer-songwriter. His debut album Purgatory Cove arrives October 23.",
  alternates: { canonical: "/about" },
  /* Without its own openGraph block a page inherits the root one wholesale,
     so every share preview would read "Sam Drysdale — Purgatory Cove". */
  openGraph: {
    title: "About — Sam Drysdale",
    url: "/about",
  },
  twitter: {
    title: "About — Sam Drysdale",
  },
}

const AboutPage = () => (
  <main className="page page-interior">
    <AboutJsonLd />
    <section className="section-sand section-interior">
      <div className="wrap stack stack-xl">
        <Display
          as="h1"
          step="title"
        >
          About
        </Display>
        <div className="grid grid-2-about">
          <div className="plate">
            <Image
              src="/assets/back-cover.jpg"
              alt="Sam Drysdale"
              width={2000}
              height={2000}
              priority
              sizes="(max-width: 800px) 100vw, 660px"
            />
          </div>
          {/* Ends on the album so the page points forward. */}
          <div className="stack prose-col">
            <Text step="lead">
              Sam Drysdale writes songs about the places people go when they need to be alone.{" "}
              {album.title}, his debut album, arrives {album.releaseDate}.
            </Text>
            {/* TODO: client to supply the real bio — two or three short
                paragraphs at this measure. */}
            <Text step="body">
              Placeholder copy. Drop the updated biography here. Two or three short paragraphs works
              best at this width, ending on the album and the current single so the page still
              points forward.
            </Text>
            <Text step="caption">Bio copy pending</Text>
            <div className="btn-row">
              <Link
                className="btn btn-primary"
                href="/music"
              >
                The album
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
)

export default AboutPage
