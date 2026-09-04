import type { Metadata } from "next"

import Arrow from "@/components/Arrow"
import DateRow from "@/components/DateRow"
import ExternalLink from "@/components/ExternalLink"
import { Display } from "@/components/Type"
import { dates, links } from "@/lib/site"
import { EventsJsonLd } from "@/components/JsonLd"
import { buttonStyles } from "@/components/buttonStyles"

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
  <main className="pt-(--header-h) [animation:pageIn_0.8s_var(--ease-cove)_both]">
    <EventsJsonLd />
    <section className="bg-sand px-(--gutter) pt-[clamp(56px,9vh,110px)] pb-[clamp(64px,10vh,130px)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-[clamp(28px,5vh,52px)]">
        <Display as="h1" step="title">
          Live
        </Display>
        <div className="flex flex-col">
          {dates.map((show) => (
            <DateRow
              key={show.date + show.city}
              show={show}
              variant="live"
            />
          ))}
          <div className="border-t border-[rgba(20,18,13,0.16)]" />
        </div>
        <div className="flex flex-wrap items-center gap-[18px]">
          <ExternalLink
            className={buttonStyles.primary}
            href={links.bandsintown}
          >
            Bandsintown
            <Arrow />
          </ExternalLink>
          <span className="m-0 text-[10px] font-normal tracking-[0.2em] text-[rgba(20,18,13,0.45)] uppercase">
            Dates above are placeholders. Live page should pull from
            Bandsintown.
          </span>
        </div>
      </div>
    </section>
  </main>
)

export default LivePage
