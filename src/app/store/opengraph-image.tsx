import { renderOgImage, size, contentType } from "@/lib/og"

export const alt = "Sam Drysdale store"
export { size, contentType }

const Image = () =>
  renderOgImage({
    eyebrow: "Sam Drysdale",
    title: "Store",
    meta: "Vinyl, CD and merch",
  })

export default Image
