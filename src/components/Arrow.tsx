/**
 * The trailing circle glyph carried by primary buttons only. That asymmetry
 * against the outline variants is what makes hierarchy legible without a
 * colour change — don't add it to outline buttons.
 */
const Arrow = () => (
  <span
    className="arrow"
    aria-hidden="true"
  >
    &#8599;
  </span>
)

export default Arrow
