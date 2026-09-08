import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Arrow from "@/components/Arrow"
import { Display, Text } from "@/components/Type"
import { album, openGraphBase } from "@/lib/site"
import { AboutJsonLd } from "@/components/JsonLd"
import { buttonStyles } from "@/components/buttonStyles"

export const metadata: Metadata = {
  title: "About",
  description:
    "Toronto singer-songwriter Sam Drysdale — 425,000 monthly Spotify listeners, signed to ONErpm Nashville. New album Purgatory Cove arrives October 23, 2026.",
  alternates: { canonical: "/about" },
  /* Next replaces (not merges) the root openGraph when a page declares one,
     so the shared site-level fields come in via the spread. */
  openGraph: {
    ...openGraphBase,
    title: "About — Sam Drysdale",
    url: "/about",
  },
  twitter: {
    title: "About — Sam Drysdale",
  },
}

/* Album and EP titles inside the bio. See the note in the markup. */
const workTitle = "font-medium text-ink not-italic"

const AboutPage = () => (
  <main className="pt-(--header-h) [animation:pageIn_0.8s_var(--ease-cove)_both]">
    <AboutJsonLd />
    <section className="bg-sand px-(--gutter) pt-[clamp(56px,9vh,110px)] pb-[clamp(64px,10vh,130px)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-[clamp(36px,6vh,72px)]">
        <Display as="h1" step="title">
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
          <div className="flex max-w-[60ch] flex-col gap-[22px]">
            {/* Client-supplied bio, verbatim. Work titles are marked with
                <cite> — the semantically correct element — but rendered
                not-italic: Ballinger Mono ships no italic cut, so an <em> or a
                default <cite> would synthesise a fake oblique. Full-strength
                ink against the 72%-opacity body does the same job in the
                voice the rest of the site already uses. */}
            <Text step="lead">
              Sam Drysdale writes songs about the places people go
              when they need to be alone. {album.title}, his new
              album, arrives {album.releaseDate}.
            </Text>
            <Text step="body">
              Toronto-based singer-songwriter Sam Drysdale pairs a
              commanding, weathered tenor with emotionally exact
              storytelling that moves between contemporary folk,
              Americana, alternative pop and soul. His 2024 breakout
              &ldquo;Only The Strong Survive,&rdquo; written with his
              mother in mind, generated more than 65 million social
              views, surpassed 10 million global streams and earned a
              2025 Folk Music Ontario Song of the Year nomination.
              Follow-up single &ldquo;Cold Water&rdquo; became his
              first Canadian radio breakthrough, landing iHeartRadio
              Future Star and Rogers One to Watch selections while
              charting across Top 40, Hot AC and AC formats. In April
              2026, Drysdale signed with ONErpm Nashville; by
              September 2026, he had grown to more than 425,000
              monthly Spotify listeners.
            </Text>
            <Text step="body">
              Born in Kitchener and raised in Guelph, Ontario,
              Drysdale moved to Los Angeles at 17 to attend Musicians
              Institute and later lived in Nashville. After
              &ldquo;Dear Jane&rdquo; won Slaight Music&rsquo;s
              It&rsquo;s Your Shot competition, he began releasing
              music the pop-forward{" "}
              <cite className={workTitle}>Vicelove</cite> (Slaight
              Music / Warner Music Canada) and{" "}
              <cite className={workTitle}>
                Testarossa (Fully Loaded)
              </cite>{" "}
              (Slaight Music) through the return-to-form, guitar-led
              intimacy of 2024&rsquo;s{" "}
              <cite className={workTitle}>
                Bonnie&rsquo;s Sad Songs
              </cite>
              . His new album,{" "}
              <cite className={workTitle}>Purgatory Cove</cite>,
              arrives October 23, 2026. Led by &ldquo;A Place&rdquo;
              and &ldquo;The Window,&rdquo; the record explores
              heartbreak as a liminal state and the friendships,
              memories and hard-won perspective that eventually guide
              us through it.
            </Text>
            <div className="flex flex-wrap gap-3">
              <Link className={buttonStyles.primary} href="/music">
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
