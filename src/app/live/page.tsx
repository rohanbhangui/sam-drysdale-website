import type { Metadata } from "next"

import Arrow from "@/components/Arrow"
import DateRow from "@/components/DateRow"
import ExternalLink from "@/components/ExternalLink"
import { Display, Text } from "@/components/Type"
import { getLiveShows } from "@/lib/bandsintown"
import { links } from "@/lib/site"
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
  Dates come from Bandsintown — see lib/bandsintown.ts. The whole page is
  statically rendered and regenerated hourly by the fetch's `revalidate`, so a
  visitor never waits on their API and their API sees ~1 request an hour.
*/
const LivePage = async () => {
  const { shows } = await getLiveShows()

  return (
    <main className="pt-(--header-h) [animation:pageIn_0.8s_var(--ease-cove)_both]">
      <EventsJsonLd shows={shows} />
      <section className="bg-sand px-(--gutter) pt-[clamp(56px,9vh,110px)] pb-[clamp(64px,10vh,130px)]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-[clamp(28px,5vh,52px)]">
          <Display as="h1" step="title">
            Live
          </Display>
          {shows.length > 0 ? (
            <div className="flex flex-col">
              {shows.map((show) => (
                <DateRow key={show.id} show={show} variant="live" />
              ))}
              <div className="border-t border-[rgba(20,18,13,0.16)]" />
            </div>
          ) : (
            <div className="flex flex-col gap-4 border-t border-[rgba(20,18,13,0.16)] pt-[clamp(20px,3vh,30px)]">
              <Text step="meta">
                No dates announced right now. Follow on Bandsintown to
                hear first.
              </Text>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-[18px]">
            <ExternalLink
              className={buttonStyles.primary}
              href={links.bandsintown}
            >
              Bandsintown
              <Arrow />
            </ExternalLink>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LivePage
