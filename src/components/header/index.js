"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import HashLink from "./hashLink"

const navLinkClasses =
  "inline-block text-[2.2rem] medium:text-xs uppercase no-underline opacity-[0.33] text-white medium:text-black font-[550] transition-opacity duration-150 visited:opacity-100 active:opacity-100 hover:opacity-100"

const Header = () => {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleOpen = () => setIsMobileOpen((prev) => !prev)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={`h-16 z-[100] relative my-2 medium:my-0 ${
        isMobileOpen ? "medium:fixed medium:w-full" : ""
      }`}
    >
      <nav className="relative justify-between h-full flex items-center px-2 max-w-[1600px] w-full mx-auto">
        <Link href="/" className={isMobileOpen ? "fixed" : ""}>
          <img src="/img/logo.svg" alt="" className="w-16" />
        </Link>
        <ion-icon
          name={isMobileOpen ? "close-outline" : "menu-outline"}
          onClick={toggleOpen}
          className={`relative z-30 text-[2.25rem] transition-all duration-300 medium:hidden ${
            isMobileOpen ? "text-white fixed top-6 right-2" : ""
          }`}
        />
        <ul
          className={`opacity-0 pointer-events-none fixed top-1/2 -translate-y-1/2 transition-all duration-300 medium:transition-none medium:opacity-100 medium:pointer-events-auto medium:static medium:translate-y-0 ${
            isMobileOpen ? "opacity-100 pointer-events-auto" : ""
          }`}
        >
          <li className="block medium:inline-block align-middle mx-3">
            <HashLink to="/#listen" className={navLinkClasses}>
              Listen
            </HashLink>
          </li>
          <li className="block medium:inline-block align-middle mx-3">
            <HashLink to="/#watch" className={navLinkClasses}>
              Watch
            </HashLink>
          </li>
          <li className="block medium:inline-block align-middle mx-3">
            <HashLink to="/#shows" className={navLinkClasses}>
              Shows
            </HashLink>
          </li>
          <li className="block medium:inline-block align-middle mx-3">
            <HashLink to="/#about" className={navLinkClasses}>
              About
            </HashLink>
          </li>
          <li className="block medium:inline-block align-middle mx-3">
            <HashLink to="/#social" className={navLinkClasses}>
              Social
            </HashLink>
          </li>
          <li className="block medium:inline-block align-middle mx-3">
            <a
              href="https://shop.samdrysdalemusic.com"
              className={navLinkClasses}
            >
              Store
            </a>
          </li>
        </ul>
        <div
          className={`medium:hidden fixed inset-0 h-screen bg-black/70 opacity-0 pointer-events-none transition-all duration-300 backdrop-blur-[10px] ${
            isMobileOpen ? "opacity-100 pointer-events-auto" : ""
          }`}
        />
      </nav>
    </header>
  )
}

export default Header
