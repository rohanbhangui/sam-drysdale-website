import localFont from "next/font/local"
import Script from "next/script"

import "./globals.css"

import Header from "@/components/header"
import Footer from "@/components/footer"

/*
  woff2-only on purpose: next/font/local emits one @font-face rule per
  src entry rather than merging same-weight/style files into a single
  rule's format fallback list. Shipping a .woff entry alongside .woff2
  for the same weight/style produces two @font-face rules with
  identical descriptors — the browser doesn't treat those as fallback
  formats, it lets the later rule fully replace the earlier one. That
  silently dropped the real variable GeneralSans-Variable.woff2 face in
  favor of the static, Bold-only .woff file, so no CSS font-weight
  value ever had any visible effect. woff2 alone has >97% global
  browser support, so there's no need for a .woff fallback here.
*/
const generalSans = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
})

const generalSansItalic = localFont({
  src: [
    {
      path: "../../public/fonts/GeneralSans-VariableItalic.woff2",
      weight: "200 700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans-italic",
  display: "swap",
})

const lora = localFont({
  src: [
    {
      path: "../../public/fonts/Lora-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lora-Italic.woff2",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../../public/fonts/Lora-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../../public/fonts/Lora-BoldItalic.woff2",
      weight: "bold",
      style: "italic",
    },
  ],
  variable: "--font-lora",
  display: "swap",
})

const vogue = localFont({
  src: [
    {
      path: "../../public/fonts/Vogue-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
  ],
  variable: "--font-vogue",
  display: "swap",
})

const acrossTheRoad = localFont({
  src: [
    {
      path: "../../public/fonts/AcrosstheRoad.woff2",
      weight: "normal",
      style: "normal",
    },
  ],
  variable: "--font-across-the-road",
  display: "swap",
})

const description =
  "The rising Toronto based singer-songwriter is the 4:00AM, bourbon soaked evolution of a high school kid who just liked to play guitar in his bedroom. Raw lyrics and a velvet grit voice accompany a hybrid sound of modern low-fi pop production with hints of R&B and blues mixed in the haze. The darkest parts of youth, substance, and relationships are his biggest fears, but also his muse."

export const viewport = {
  themeColor: "#0d0d0d",
}

export const metadata = {
  metadataBase: new URL("https://www.samdrysdalemusic.com"),
  title: "Sam Drysdale",
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
        color: "#3f3f3f",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#0d0d0d",
    "msapplication-config": "/browserconfig.xml",
  },
  openGraph: {
    type: "website",
    url: "https://www.samdrysdalemusic.com/",
    title: "Sam Drysdale",
    description,
    images: ["/sam-drysdale.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Drysdale",
    description,
    images: ["/sam-drysdale.png"],
  },
}

const RootLayout = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${generalSansItalic.variable} ${lora.variable} ${vogue.variable} ${acrossTheRoad.variable}`}
    >
      <body>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
        >
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
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2613641268732071&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          strategy="afterInteractive"
        />
        <Script
          noModule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          strategy="afterInteractive"
        />
        <main>
          <Header />
          {children}
          <Footer id="social" />
        </main>
      </body>
    </html>
  )
}

export default RootLayout
