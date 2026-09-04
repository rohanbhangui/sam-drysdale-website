import type { Metadata } from "next"
import Image from "next/image"

import ExternalLink from "@/components/ExternalLink"
import { Display, Text } from "@/components/Type"
import { featuredVideo, videos } from "@/lib/site"
import { VideosJsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Official videos, live sessions and the album trailer from Sam Drysdale, including The Cage and Cold Water.",
  alternates: { canonical: "/videos" },
  /* Without its own openGraph block a page inherits the root one wholesale,
     so every share preview would read "Sam Drysdale — Purgatory Cove". */
  openGraph: {
    title: "Videos — Sam Drysdale",
    url: "/videos",
  },
  twitter: {
    title: "Videos — Sam Drysdale",
  },
}

const VideosPage = () => (
  <main className="pt-(--header-h) [animation:pageIn_0.8s_var(--ease-cove)_both]">
    <VideosJsonLd />
    <section className="bg-sand px-(--gutter) pt-[clamp(56px,9vh,110px)] pb-[clamp(64px,10vh,130px)]">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-[clamp(32px,5vh,64px)]">
        <Display as="h1" step="title">
          Videos
        </Display>

        <ExternalLink
          className="flex flex-col gap-[18px] rounded-sm border border-[rgba(20,18,13,0.1)] bg-sand-deep p-[clamp(12px,1.4vw,18px)] transition-transform duration-700 ease-cove hover:-translate-y-[3px] hover:text-inherit"
          href={featuredVideo.href}
        >
          <div className="media">
            <Image
              src={featuredVideo.image}
              alt=""
              fill
              sizes="(max-width: 1500px) 100vw, 1500px"
              priority
            />
            <span
              className="absolute top-1/2 left-1/2 flex size-[clamp(64px,7vw,92px)] -translate-1/2 items-center justify-center rounded-full border border-[rgba(247,243,233,0.7)] bg-[rgba(11,10,7,0.35)] text-lg leading-none text-bone backdrop-blur-[6px]"
              aria-hidden="true"
            >
              &#9654;
            </span>
          </div>
          <div className="flex flex-wrap justify-between gap-2.5 px-1.5 pb-1.5">
            <span className="font-display text-display-card leading-none uppercase">
              {featuredVideo.title}
            </span>
            <span className="self-end text-[10px] font-medium tracking-[0.24em] text-[rgba(20,18,13,0.55)] uppercase">
              {featuredVideo.meta}
            </span>
          </div>
        </ExternalLink>

        <div className="grid grid-videos">
          {videos.map(({ title, meta, image, href }) => (
            <ExternalLink
              className="flex flex-col gap-4 rounded-sm border border-[rgba(20,18,13,0.1)] bg-sand-deep p-[clamp(10px,1.3vw,18px)] transition-transform duration-700 ease-cove hover:-translate-y-[3px] hover:text-inherit"
              href={href}
              key={title}
            >
              <div className="media">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, 380px"
                />
                <span
                  className="absolute top-1/2 left-1/2 flex size-14 -translate-1/2 items-center justify-center rounded-full border border-[rgba(247,243,233,0.7)] bg-[rgba(11,10,7,0.35)] text-[13px] leading-none text-bone"
                  aria-hidden="true"
                >
                  &#9654;
                </span>
              </div>
              <div className="flex flex-col gap-1.5 px-1.5 pb-1.5">
                <span className="text-[13px] font-medium tracking-[0.14em] uppercase">
                  {title}
                </span>
                <span className="text-[10px] font-normal tracking-[0.22em] text-[rgba(20,18,13,0.5)] uppercase">
                  {meta}
                </span>
              </div>
            </ExternalLink>
          ))}
        </div>
        <Text step="caption">
          Thumbnails are placeholders pending video stills
        </Text>
      </div>
    </section>
  </main>
)

export default VideosPage
