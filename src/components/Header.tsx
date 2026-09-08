"use client"

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import Arrow from "@/components/Arrow"
import ExternalLink from "@/components/ExternalLink"
import { links, nav } from "@/lib/site"

/*
  Past this many pixels the header takes on its glass. Small on purpose — the
  bar should commit the moment the page moves, not drift in.
*/
const SCROLL_THRESHOLD = 8

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

/* A boolean, so React re-renders on the crossing rather than every pixel. */
const getScrolled = () => window.scrollY > SCROLL_THRESHOLD

/*
  Dark glass on a light site, deliberately: it lets the hero photograph read
  full-bleed behind the header and bookends the dark footer.

  On the home page the bar starts bare — no tint, no blur, no rule — so the
  hero loop runs edge to edge, and fades its glass in on the first scroll.
  Everywhere else it stays glass from the start: the header type is `text-sand`
  and every other page opens on a `bg-sand` section, so a transparent bar there
  would be light-on-light and unreadable.

  This is a client component only because of the mobile menu — the markup it
  renders is otherwise static.
*/
const Header = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    // Server render assumes the top of the page.
    () => false,
  )
  // The open mobile overlay needs the bar solid regardless of scroll.
  const glass = pathname !== "/" || scrolled || menuOpen
  const firstMenuLink = useRef<HTMLAnchorElement>(null)

  /*
    The reference build never locked body scroll behind the overlay; the spec
    calls for adding it. The attribute keeps the scroll lock declarative.
  */
  useEffect(() => {
    if (!menuOpen) return

    document.body.setAttribute("data-menu-open", "true")
    firstMenuLink.current?.focus({ preventScroll: true })

    const close = () => setMenuOpen(false)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    document.addEventListener("keydown", onKeyDown)
    // Links inside the overlay close it themselves; this catches the back
    // button, which would otherwise navigate behind an open menu.
    window.addEventListener("popstate", close)

    return () => {
      document.body.removeAttribute("data-menu-open")
      document.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("popstate", close)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-80 flex h-(--header-h) items-center justify-between border-b px-[clamp(16px,4vw,40px)] text-sand transition-[background-color,border-color,backdrop-filter] duration-500 ease-cove ${
          glass
            ? "border-[rgba(239,232,217,0.12)] bg-[rgba(15,14,10,0.72)] backdrop-blur-[22px] backdrop-saturate-[140%]"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link
          className="flex shrink-0 items-center gap-3 [&>span]:text-[11px] [&>span]:font-medium [&>span]:tracking-[0.24em] [&>span]:uppercase"
          href="/"
        >
          {/* Source art is dark-on-transparent, so it is inverted in CSS for
              the dark header. Native ratio 613x533 — height is set, width auto. */}
          <Image
            className="block h-[22px] w-auto invert"
            src="/assets/mark-01.png"
            alt="Sam Drysdale"
            width={613}
            height={533}
            priority
          />
          <span>Sam Drysdale</span>
        </Link>

        <nav
          className="flex items-center gap-[clamp(18px,2.6vw,34px)] max-[900px]:hidden [&_a]:py-1.5 [&_a]:text-[11px] [&_a]:font-medium [&_a]:tracking-[0.22em] [&_a]:uppercase [&_a]:transition-opacity [&_a]:duration-500 [&_a]:ease-cove [&_a[aria-current=page]]:opacity-55"
          aria-label="Primary"
        >
          {nav.map(({ label, href, external }) =>
            external ? (
              <ExternalLink key={href} href={href}>
                {label}
              </ExternalLink>
            ) : (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ),
          )}
          <ExternalLink
            className="ml-1 inline-flex items-center gap-3 rounded-full bg-sand py-[11px] pr-1.5 pl-4 text-ink transition-transform duration-500 ease-cove hover:-translate-y-px hover:text-ink active:scale-[0.98] [&>span]:-ml-[0.22em] [&>span]:size-6 [&>span]:bg-[rgba(20,18,13,0.1)] [&>span]:text-[11px]"
            href={links.newsletter}
          >
            Sign up
            <Arrow />
          </ExternalLink>
        </nav>

        <button
          className="hidden h-[38px] cursor-pointer rounded-full border border-[rgba(239,232,217,0.34)] bg-transparent px-4 text-[10px] font-medium tracking-[0.22em] text-sand uppercase max-[900px]:block"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-90 flex flex-col bg-[rgba(15,14,10,0.96)] p-6 text-bone backdrop-blur-[28px] [animation:pageIn_0.5s_var(--ease-cove)_both]">
          <div className="flex h-10 items-center justify-between">
            <Image
              className="h-5 w-auto invert"
              src="/assets/mark-01.png"
              alt=""
              width={613}
              height={533}
            />
            <button
              className="h-[38px] cursor-pointer rounded-full border border-[rgba(239,232,217,0.34)] bg-transparent px-4 text-[10px] font-medium tracking-[0.22em] text-sand uppercase"
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col justify-center gap-1 [&_a]:font-display [&_a]:text-[clamp(40px,13vw,72px)] [&_a]:leading-[1.02] [&_a]:uppercase"
            aria-label="Mobile"
            onClick={() => setMenuOpen(false)}
          >
            {nav.map(({ label, href, external }, index) =>
              external ? (
                <ExternalLink
                  className="[animation:menuIn_0.6s_var(--ease-cove)_both]"
                  style={{
                    animationDelay: `${0.04 + index * 0.05}s`,
                  }}
                  key={href}
                  href={href}
                >
                  {label}
                </ExternalLink>
              ) : (
                <Link
                  className="[animation:menuIn_0.6s_var(--ease-cove)_both]"
                  style={{
                    animationDelay: `${0.04 + index * 0.05}s`,
                  }}
                  key={href}
                  href={href}
                  ref={index === 0 ? firstMenuLink : undefined}
                >
                  {label}
                </Link>
              ),
            )}
          </nav>

          <ExternalLink
            className="flex items-center justify-between rounded-full bg-sand py-3.5 pr-3.5 pl-6 text-xs font-medium tracking-[0.22em] text-ink uppercase [animation:menuIn_0.6s_var(--ease-cove)_0.3s_both] hover:text-ink [&>span]:ml-0 [&>span]:size-8 [&>span]:bg-[rgba(20,18,13,0.1)] [&>span]:text-[13px]"
            href={links.newsletter}
          >
            Sign up
            <Arrow />
          </ExternalLink>
        </div>
      )}
    </>
  )
}

export default Header
