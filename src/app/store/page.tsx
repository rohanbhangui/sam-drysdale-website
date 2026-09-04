import type { Metadata } from "next"

import Arrow from "@/components/Arrow"
import ExternalLink from "@/components/ExternalLink"
import { Display, Text } from "@/components/Type"
import { products } from "@/lib/site"

export const metadata: Metadata = {
  title: "Store",
  description: "Purgatory Cove limited edition vinyl, CD and merch from Sam Drysdale.",
  alternates: { canonical: "/store" },
  /* Without its own openGraph block a page inherits the root one wholesale,
     so every share preview would read "Sam Drysdale — Purgatory Cove". */
  openGraph: {
    title: "Store — Sam Drysdale",
    url: "/store",
  },
  twitter: {
    title: "Store — Sam Drysdale",
  },
}

/* Stub. TODO: product shots and a real checkout. */
const StorePage = () => (
  <main className="page page-interior">
    <section className="section-sand section-interior">
      <div className="wrap-wide stack stack-md">
        <Display
          as="h1"
          step="title"
        >
          Store
        </Display>
        <div className="grid grid-store">
          {products.map(({ title, price, slot, href }) => (
            <div
              className="card"
              key={title}
            >
              <div className="media media-square">
                <span className="slot">{slot}</span>
              </div>
              <div className="card-meta">
                <span className="card-title">{title}</span>
                <span className="card-price">{price}</span>
              </div>
              <ExternalLink
                className="card-cta"
                href={href}
              >
                Pre-order
                <Arrow />
              </ExternalLink>
            </div>
          ))}
        </div>
        <Text step="caption">Store stub. Product shots and checkout to be connected.</Text>
      </div>
    </section>
  </main>
)

export default StorePage
