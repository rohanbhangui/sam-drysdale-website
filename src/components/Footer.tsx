import Image from "next/image"
import Link from "next/link"

import ExternalLink from "@/components/ExternalLink"
import { album, contacts, links, nav, socials } from "@/lib/site"

/*
  Socials are text links in Ballinger Mono rather than icons. That was a
  deliberate departure from the client brief — it reads cleaner and avoids
  approximated brand marks. Flagged for the client to revisit.
*/
const siteNav = nav.filter(({ href }) => href !== links.shop)

const Footer = () => (
  <footer className="bg-ink px-(--gutter) pt-[clamp(48px,7vh,80px)] pb-7 text-[rgba(239,232,217,0.78)]">
    <div className="mx-auto flex max-w-[1500px] flex-col gap-[clamp(32px,5vh,56px)]">
      <div className="grid grid-footer">
        <div className="flex flex-col gap-4">
          {/* Pre-inverted copy of the mark, so no CSS filter here. */}
          <Image
            className="block h-[34px] w-auto max-w-full self-start object-contain opacity-[0.92]"
            src="/assets/mark-01-white.png"
            alt=""
            width={613}
            height={533}
          />
          <span className="text-[10px] font-medium tracking-[0.24em] text-[rgba(239,232,217,0.5)] uppercase">
            {album.title}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-medium tracking-[0.24em] text-[rgba(239,232,217,0.45)] uppercase">
            Follow
          </span>
          <div className="flex flex-col gap-[9px] [&_a]:text-xs [&_a]:font-light [&_a]:tracking-[0.1em]">
            {socials.map(({ label, href }) => (
              <ExternalLink key={label} href={href}>
                {label}
              </ExternalLink>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-medium tracking-[0.24em] text-[rgba(239,232,217,0.45)] uppercase">
            Site
          </span>
          <div className="flex flex-col gap-[9px] [&_a]:text-xs [&_a]:font-light [&_a]:tracking-[0.1em]">
            {/* Store is dropped here on purpose — the header still carries
                it, and the footer already sends people off-site under Follow.
                Header and footer share one `nav`, hence the filter. */}
            {siteNav.map(({ label, href, external }) =>
              external ? (
                <ExternalLink key={href} href={href}>
                  {label}
                </ExternalLink>
              ) : (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-medium tracking-[0.24em] text-[rgba(239,232,217,0.45)] uppercase">
            Industry
          </span>
          <div className="flex flex-col gap-[11px] text-[11px] leading-[1.5] font-light text-[rgba(239,232,217,0.62)]">
            {contacts.map(({ role, name, email }) => (
              <span key={email}>
                {role}: {name}
                <br />
                <a href={`mailto:${email}`}>{email}</a>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-[26px] gap-y-3.5 border-t border-[rgba(239,232,217,0.14)] pt-[22px]">
        <div className="flex flex-wrap gap-5 text-[10px] font-medium tracking-[0.22em] text-[rgba(239,232,217,0.5)] uppercase">
          <Link href="/about">Press / EPK</Link>
          <a href="mailto:guillaume@frndsandfmly.co">Contact</a>
          <a href="mailto:guillaume@frndsandfmly.co">Management</a>
          {/* TODO: needs a real privacy page. */}
          <Link href="/">Privacy</Link>
        </div>
        <span className="text-[10px] font-normal tracking-[0.2em] text-[rgba(239,232,217,0.38)] uppercase">
          &copy; 2026 Sam Drysdale
        </span>
      </div>
    </div>
  </footer>
)

export default Footer
