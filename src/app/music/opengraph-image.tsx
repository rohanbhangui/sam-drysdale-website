import { renderOgImage, size, contentType } from "@/lib/og"

export const alt = "Purgatory Cove — the debut album"
export { size, contentType }

const Image = () =>
  renderOgImage({
    eyebrow: "The debut album",
    title: "Purgatory Cove",
    meta: "Sam Drysdale · Thirteen songs · October 23",
  })

export default Image
