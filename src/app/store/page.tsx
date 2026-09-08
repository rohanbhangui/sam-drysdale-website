import type { Metadata } from "next"

import Arrow from "@/components/Arrow"
import ExternalLink from "@/components/ExternalLink"
import { Display, Text } from "@/components/Type"
import { openGraphBase, products } from "@/lib/site"

export const metadata: Metadata = {
  title: "Store",
  description:
    "Purgatory Cove limited edition vinyl, CD and merch from Sam Drysdale.",
  alternates: { canonical: "/store" },
  /* Next replaces (not merges) the root openGraph when a page declares one,
     so the shared site-level fields come in via the spread. */
  openGraph: {
    ...openGraphBase,
    title: "Store — Sam Drysdale",
    url: "/store",
  },
  twitter: {
    title: "Store — Sam Drysdale",
  },
}

/* Stub. TODO: product shots and a real checkout. */
const StorePage = () => (
  <main className="pt-(--header-h) [animation:pageIn_0.8s_var(--ease-cove)_both]">
    <section className="bg-sand px-(--gutter) pt-[clamp(56px,9vh,110px)] pb-[clamp(64px,10vh,130px)]">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-[clamp(28px,5vh,52px)]">
        <Display as="h1" step="title">
          Store
        </Display>
        <div className="grid grid-store">
          {products.map(({ title, price, slot, href }) => (
            <div
              className="flex flex-col gap-4 rounded-sm border border-[rgba(20,18,13,0.1)] bg-sand-deep p-[clamp(10px,1.3vw,18px)] transition-transform duration-700 ease-cove hover:-translate-y-[3px]"
              key={title}
            >
              <div className="media media-square">
                <span className="slot">{slot}</span>
              </div>
              <div className="flex flex-col gap-1.5 px-1.5 pb-1.5">
                <span className="text-[13px] font-medium tracking-[0.14em] uppercase">
                  {title}
                </span>
                <span className="text-[11px] font-light tracking-[0.12em] text-[rgba(20,18,13,0.55)] uppercase">
                  {price}
                </span>
              </div>
              <ExternalLink
                className="mx-1.5 mb-1.5 flex items-center justify-between gap-3 rounded-full bg-ink py-[11px] pr-[11px] pl-5 text-[11px] font-medium tracking-[0.2em] text-sand uppercase transition-transform duration-600 ease-cove hover:-translate-y-0.5 hover:text-sand active:scale-[0.98] [&>span]:size-7 [&>span]:bg-[rgba(239,232,217,0.16)] [&>span]:text-[11px]"
                href={href}
              >
                Pre-order
                <Arrow />
              </ExternalLink>
            </div>
          ))}
        </div>
        <Text step="caption">
          Store stub. Product shots and checkout to be connected.
        </Text>
      </div>
    </section>
  </main>
)

export default StorePage
