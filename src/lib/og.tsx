import { ImageResponse } from "next/og"

/*
  Shared renderer for every route's share card.

  Each route owns a thin `opengraph-image.tsx` that calls this with its own
  words, so a link to /music and a link to /live preview differently instead of
  all resolving to one generic image.

  Assets are read off disk rather than fetched: `fetch()` against a file:// URL
  is not implemented in the Turbopack build, and these routes are prerendered
  at build time anyway, so a plain readFile is both simpler and sufficient.
*/

import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/*
  Two fixed base dirs rather than one generic join(cwd, ...segments) helper:
  Turbopack's file tracer couldn't see through the rest-param spread, so it
  fell back to tracing the entire project — public/ videos included — into
  every route that imports this module. A literal subfolder segment at each
  call site is what the tracer needs to scope to just that folder instead.
*/
const ogFontsDir = join(process.cwd(), "src/og-fonts")
const publicAssetsDir = join(process.cwd(), "public/assets")

const ogFont = (name: string) => readFile(join(ogFontsDir, name))
const publicAsset = (name: string) => readFile(join(publicAssetsDir, name))

/* Read once per build, not once per card. Worldstar is subset to uppercase
   only and Ballinger to the glyphs these cards use — the full Worldstar is
   ~1MB, which does not belong in a function bundle. */
let assets: Promise<[Buffer, Buffer, string]> | undefined

const loadAssets = () => {
  assets ??= Promise.all([
    ogFont("Worldstar-subset.ttf"),
    ogFont("BallingerMono-Medium-subset.otf"),
    /* og-cover.jpg is cover-digital.jpg pre-cropped to this card's exact
       1200x630, so satori isn't decoding a 1400x1400 print master just to
       throw most of it away. Rendered PNG weight (~2.3MB either way) is
       driven by the rock texture's detail, not the source file's size or
       dimensions — cropping tighter didn't move it. A blurred copy gets it
       down to ~1.4MB but visibly softens the photo, so that trade was left
       for whoever owns the card's look to decide. Regenerate this from
       cover-digital.jpg if the cover art changes. */
    publicAsset("og-cover.jpg").then(
      (buffer) => `data:image/jpeg;base64,${buffer.toString("base64")}`,
    ),
  ])
  return assets
}

type OgCard = {
  /** Wide-tracked label above the title. */
  eyebrow: string
  /** The headline, set in Worldstar. Keep it short — two words reads best. */
  title: string
  /** The line under the title. */
  meta: string
}

export const renderOgImage = async ({ eyebrow, title, meta }: OgCard) => {
  const [display, mono, bg] = await loadAssets()

  /* Long titles have to step down or they run off a 1200px card. */
  const titleSize = title.length > 14 ? 92 : title.length > 9 ? 116 : 140

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          backgroundColor: "#0B0A07",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bg}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />
        {/* Same scrim logic as the hero: dark enough at the foot to carry
            bone-coloured type, light enough at the top to keep the photo. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,7,5,0.92) 0%, rgba(8,7,5,0.55) 45%, rgba(8,7,5,0.45) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "0 68px 60px",
          }}
        >
          <div
            style={{
              fontFamily: "Ballinger Mono",
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(247,243,233,0.72)",
              paddingBottom: 26,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: "Worldstar",
              fontSize: titleSize,
              lineHeight: 0.88,
              letterSpacing: "-0.015em",
              textTransform: "uppercase",
              color: "#F7F3E9",
              paddingBottom: 28,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "Ballinger Mono",
              fontSize: 22,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(239,232,217,0.86)",
            }}
          >
            {meta}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Worldstar", data: display, style: "normal", weight: 400 },
        { name: "Ballinger Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  )
}
