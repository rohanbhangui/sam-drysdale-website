import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import localFont from "next/font/local"
import Script from "next/script"

import "./globals.css"

import { openGraphBase, siteUrl } from "@/lib/site"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { SiteJsonLd } from "@/components/JsonLd"

/*
  Both families are commercial and were supplied as desktop licences
  (Worldstar.ttf, BallingerMono-*.otf). They are converted to .woff2 here —
  roughly 70% smaller — but the licence question is unresolved.

  TODO: confirm a web/@font-face licence for both before launch.
*/
const worldstar = localFont({
  src: [
    {
      path: "../../public/fonts/Worldstar.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-worldstar",
  display: "swap",
})

const ballinger = localFont({
  src: [
    {
      path: "../../public/fonts/BallingerMono-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/BallingerMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/BallingerMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/BallingerMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ballinger",
  display: "swap",
})

/*
  One clear sentence that names the artist, the album, the format and the date.
  Answer engines quote this almost verbatim, so it states the facts plainly
  rather than reading as ad copy.
*/
const description =
  "Purgatory Cove is the debut album from Toronto singer-songwriter Sam Drysdale, out October 23. Hear the single A Place, pre-order the vinyl, and find live dates."

export const viewport: Viewport = {
  themeColor: "#0F0E0A",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  applicationName: "Sam Drysdale",
  authors: [{ name: "Sam Drysdale", url: siteUrl }],
  creator: "Sam Drysdale",
  publisher: "Sam Drysdale",
  category: "music",
  keywords: [
    "Sam Drysdale",
    "Purgatory Cove",
    "The Cage",
    "A Place",
    "debut album",
    "Toronto singer-songwriter",
    "indie folk",
    "vinyl pre-order",
    "tour dates",
  ],
  title: {
    default: "Sam Drysdale — Purgatory Cove",
    template: "%s — Sam Drysdale",
  },
  description,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#14120D",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#0F0E0A",
    "msapplication-config": "/browserconfig.xml",
  },
  /* Share images come from the opengraph-image.tsx route in each segment, so
     no `images` key here — setting one would override the generated card. */
  openGraph: {
    ...openGraphBase,
    url: siteUrl,
    title: "Sam Drysdale — Purgatory Cove",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Drysdale — Purgatory Cove",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html
    lang="en"
    className={`${worldstar.variable} ${ballinger.variable}`}
  >
    <body>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2613641268732071');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* Meta's tracking pixel — has to stay a bare <img>. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2613641268732071&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      <SiteJsonLd />
      <Header />
      {children}
      <Footer />
    </body>
  </html>
)

export default RootLayout
