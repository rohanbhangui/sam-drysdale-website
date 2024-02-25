import { SM, MD, LG, XLG, XXL, XXXL } from "./variables"

const Theme = {
  mediaQuery: {
    small: `(min-width: ${SM}px)`,
    medium: `(min-width: ${MD}px)`,
    // because Ipad mini and regular Ipad share the same viewport (1024 width)
    // required to allow the filter to hide
    large: `(min-width: ${LG + 1}px) and (min-height: ${MD}px)`,
    xlarge: `(min-width: ${XLG}px)`,
    xxlarge: `(min-width: ${XXL}px)`,
    xxxlarge: `(min-width: ${XXXL}px)`,
  },
  colors: {
    primary: "#4B6450",
    secondary: "#CCAD80",
    dark: "#030000",
    light: "#ffffff",
    text: "#000000",
  },
}

export default Theme
