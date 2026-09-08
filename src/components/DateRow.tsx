import ExternalLink from "@/components/ExternalLink"
import type { LiveShow } from "@/lib/bandsintown"

type DateRowProps = {
  show: LiveShow
  /** The /live page uses a slightly tighter column minimum than home. */
  variant?: "home" | "live"
}

/*
  Markup is unchanged from the placeholder build — the intrinsic grid is what
  absorbs variable-length venue names, and Bandsintown venue names are far
  longer and less predictable than the stand-ins were.
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
    {/* Same slot, same rhythm — only the word and the colour change. */}
    <span
      className={`text-[11px] font-medium tracking-[0.22em] uppercase ${
        show.soldOut ? "text-[rgba(20,18,13,0.45)]" : "text-teal"
      }`}
    >
      {show.soldOut ? "Sold out" : "Tickets"}
    </span>
  </ExternalLink>
)

export default DateRow
