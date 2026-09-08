import { renderOgImage, size, contentType } from "@/lib/og"

export const alt = "Sam Drysdale live dates"
export { size, contentType }

const Image = () =>
  renderOgImage({
    eyebrow: "Sam Drysdale",
    title: "Live",
    meta: "Tour dates and tickets",
  })

export default Image
