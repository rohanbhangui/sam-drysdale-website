import type { Metadata } from "next"

import Arrow from "@/components/Arrow"
import DateRow from "@/components/DateRow"
import ExternalLink from "@/components/ExternalLink"
import { Display } from "@/components/Type"
import { dates, links } from "@/lib/site"
import { EventsJsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "Live",
  description:
    "Sam Drysdale tour dates and tickets, including Toronto, Montreal, Halifax, Ottawa, Vancouver and New York.",
  alternates: { canonical: "/live" },
  /* Without its own openGraph block a page inherits the root one wholesale,
     so every share preview would read "Sam Drysdale — Purgatory Cove". */
  openGraph: {
    title: "Live — Sam Drysdale",
    url: "/live",
  },
  twitter: {
    title: "Live — Sam Drysdale",
  },
}

/*
  TODO: this should become a Bandsintown fetch in this server component,
  cached and revalidated — see `bandsintownArtistId` in lib/site.ts. Keep the
  DateRow markup as-is so the design survives real data.
*/
const LivePage = () => (
  <main className="page page-interior">
    <EventsJsonLd />
    <section className="section-sand section-interior">
      <div className="wrap stack stack-md">
        <Display
          as="h1"
          step="title"
        >
          Live
        </Display>
        <div className="dates">
          {dates.map((show) => (
            <DateRow
              key={show.date + show.city}
              show={show}
              variant="live"
            />
          ))}
          <div className="dates-end" />
        </div>
        <div className="dates-footnote">
          <ExternalLink
            className="btn btn-primary"
            href={links.bandsintown}
          >
            Bandsintown
            <Arrow />
          </ExternalLink>
          <span className="caption">
            Dates above are placeholders. Live page should pull from Bandsintown.
          </span>
        </div>
      </div>
    </section>
  </main>
)

export default LivePage
