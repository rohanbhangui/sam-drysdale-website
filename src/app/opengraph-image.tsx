import { renderOgImage, size, contentType } from "@/lib/og"

export const alt = "Sam Drysdale — Purgatory Cove"
export { size, contentType }

const Image = () =>
  renderOgImage({
    eyebrow: "The debut album",
    title: "Purgatory Cove",
    meta: "Sam Drysdale · October 23",
  })

export default Image
