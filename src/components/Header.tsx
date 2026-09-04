"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import Arrow from "@/components/Arrow"
import ExternalLink from "@/components/ExternalLink"
import { links, nav } from "@/lib/site"

/*
  Dark glass on a light site, deliberately: it lets the hero photograph read
  full-bleed behind the header and bookends the dark footer.

  This is a client component only because of the mobile menu — the markup it
  renders is otherwise static.
*/
const Header = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const firstMenuLink = useRef<HTMLAnchorElement>(null)

  /*
    The reference build never locked body scroll behind the overlay; the spec
    calls for adding it. The attribute (rather than an inline style) keeps the
    rule in globals.css with the rest of the menu.
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
      <header className="site-header">
        <Link
          className="brand"
          href="/"
        >
          {/* Source art is dark-on-transparent, so it is inverted in CSS for
              the dark header. Native ratio 613x533 — height is set, width auto. */}
          <Image
            src="/assets/mark-01.png"
            alt="Sam Drysdale"
            width={613}
            height={533}
            priority
          />
          <span>Sam Drysdale</span>
        </Link>

        <nav
          className="nav"
          aria-label="Primary"
        >
          {nav.map(({ label, href, external }) =>
            external ? (
              <ExternalLink
                key={href}
                href={href}
              >
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
            className="nav-cta"
            href={links.newsletter}
          >
            Sign up
            <Arrow />
          </ExternalLink>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </header>

      {menuOpen && (
        <div className="menu-overlay">
          <div className="menu-top">
            <Image
              src="/assets/mark-01.png"
              alt=""
              width={613}
              height={533}
            />
            <button
              className="menu-toggle"
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
          </div>

          <nav
            className="menu-nav"
            aria-label="Mobile"
            onClick={() => setMenuOpen(false)}
          >
            {nav.map(({ label, href, external }, index) =>
              external ? (
                <ExternalLink
                  key={href}
                  href={href}
                >
                  {label}
                </ExternalLink>
              ) : (
                <Link
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
            className="menu-cta"
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
