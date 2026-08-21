"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const HashLink = ({ to, className = "", children }) => {
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "",
  )

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const isSelected = hash && to.endsWith(hash)

  return (
    <Link
      href={to}
      className={`${className} ${isSelected ? "selected" : ""}`.trim()}
    >
      {children}
    </Link>
  )
}

export default HashLink
