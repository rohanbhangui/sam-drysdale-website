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
    className={`grid items-baseline gap-x-6 gap-y-2 border-t border-[rgba(20,18,13,0.16)] py-[clamp(20px,3vh,30px)] transition-[padding] duration-600 ease-cove hover:pl-3.5 hover:text-inherit ${
      variant === "live" ? "grid-date-live" : "grid-date"
    }`}
    href={show.href}
  >
    <span className="text-row font-medium tracking-[0.14em] uppercase">
      {show.date}
    </span>
    <span className="text-row font-light tracking-[0.06em]">
      {show.city}
    </span>
    <span className="text-row font-light tracking-[0.06em] text-[rgba(20,18,13,0.62)]">
      {show.venue}
    </span>
    <span className="text-[11px] font-medium tracking-[0.22em] text-teal uppercase">
      Tickets
    </span>
  </ExternalLink>
)

export default DateRow
