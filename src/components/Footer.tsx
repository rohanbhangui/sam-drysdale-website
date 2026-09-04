import Image from "next/image"
import Link from "next/link"

import ExternalLink from "@/components/ExternalLink"
import { album, contacts, nav, socials } from "@/lib/site"

/*
  Socials are text links in Ballinger Mono rather than icons. That was a
  deliberate departure from the client brief — it reads cleaner and avoids
  approximated brand marks. Flagged for the client to revisit.
*/
const Footer = () => (
  <footer className="site-footer">
    <div className="footer-inner wrap-wide">
      <div className="grid grid-footer">
        <div className="footer-col footer-brand">
          {/* Pre-inverted copy of the mark, so no CSS filter here. */}
          <Image
            src="/assets/mark-01-white.png"
            alt=""
            width={613}
            height={533}
          />
          <span>{album.title}</span>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Follow</span>
          <div className="footer-links">
            {socials.map(({ label, href }) => (
              <ExternalLink
                key={label}
                href={href}
              >
                {label}
              </ExternalLink>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Site</span>
          <div className="footer-links">
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
                >
                  {label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Industry</span>
          <div className="footer-contacts">
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

      <div className="footer-bottom">
        <div className="footer-utility">
          <Link href="/about">Press / EPK</Link>
          <a href="mailto:guillaume@frndsandfmly.co">Contact</a>
          <a href="mailto:guillaume@frndsandfmly.co">Management</a>
          {/* TODO: needs a real privacy page. */}
          <Link href="/">Privacy</Link>
        </div>
        <span className="footer-copy">&copy; 2026 Sam Drysdale</span>
      </div>
    </div>
  </footer>
)

export default Footer
