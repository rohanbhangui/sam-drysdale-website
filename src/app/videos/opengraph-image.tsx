import { renderOgImage, size, contentType } from "@/lib/og"

export const alt = "Sam Drysdale videos"
export { size, contentType }

const Image = () =>
  renderOgImage({
    eyebrow: "Sam Drysdale",
    title: "Videos",
    meta: "Official videos and sessions",
  })

export default Image
