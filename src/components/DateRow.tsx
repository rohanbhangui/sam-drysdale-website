import ExternalLink from "@/components/ExternalLink"
import type { ShowDate } from "@/lib/site"

type DateRowProps = {
  show: ShowDate
  /** The /live page uses a slightly tighter column minimum than home. */
  variant?: "home" | "live"
}

/*
  Keep this markup identical when the Bandsintown fetch lands — the intrinsic
  grid is what absorbs variable-length venue names.
*/
const DateRow = ({ show, variant = "home" }: DateRowProps) => (
  <ExternalLink
    className={`date-row${variant === "live" ? " date-row-live" : ""}`}
    href={show.href}
  >
    <span className="date-when">{show.date}</span>
    <span className="date-city">{show.city}</span>
    <span className="date-venue">{show.venue}</span>
    <span className="date-tickets">Tickets</span>
  </ExternalLink>
)

export default DateRow
