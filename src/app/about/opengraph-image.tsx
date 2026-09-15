import { renderOgImage, size, contentType } from "@/lib/og"

export const alt = "About Sam Drysdale"
export { size, contentType }

const Image = () =>
  renderOgImage({
    eyebrow: "Sam Drysdale",
    title: "About",
    meta: "Toronto singer-songwriter",
  })

export default Image
