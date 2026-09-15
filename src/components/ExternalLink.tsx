import type { AnchorHTMLAttributes, ReactNode } from "react"

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
}

/** Every off-site link opens in a new tab with `rel="noopener"`. */
const ExternalLink = ({ href, children, ...rest }: ExternalLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    {...rest}
  >
    {children}
  </a>
)

export default ExternalLink
