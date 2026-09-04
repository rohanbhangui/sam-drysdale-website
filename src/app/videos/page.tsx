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
  <main className="page page-interior">
    <VideosJsonLd />
    <section className="section-sand section-interior">
      <div className="wrap-wide stack stack-lg">
        <Display
          as="h1"
          step="title"
        >
          Videos
        </Display>

        <ExternalLink
          className="card video-hero"
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
              className="play play-lg"
              aria-hidden="true"
            >
              &#9654;
            </span>
          </div>
          <div className="video-hero-caption">
            <span className="video-hero-title">{featuredVideo.title}</span>
            <span className="video-hero-meta">{featuredVideo.meta}</span>
          </div>
        </ExternalLink>

        <div className="grid grid-videos">
          {videos.map(({ title, meta, image, href }) => (
            <ExternalLink
              className="card"
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
                  className="play"
                  aria-hidden="true"
                >
                  &#9654;
                </span>
              </div>
              <div className="card-meta">
                <span className="card-title">{title}</span>
                <span className="card-sub">{meta}</span>
              </div>
            </ExternalLink>
          ))}
        </div>
        <Text step="caption">Thumbnails are placeholders pending video stills</Text>
      </div>
    </section>
  </main>
)

export default VideosPage
