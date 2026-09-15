/**
 * The trailing circle glyph carried by primary buttons only. That asymmetry
 * against the outline variants is what makes hierarchy legible without a
 * colour change — don't add it to outline buttons.
 */
const Arrow = () => (
  <span
    className="-ml-[0.2em] flex size-[30px] shrink-0 items-center justify-center rounded-full text-xs leading-none"
    aria-hidden="true"
  >
    &#8599;
  </span>
)

export default Arrow
