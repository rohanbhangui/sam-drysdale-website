import { SM, MD, LG, XLG, XXL } from "./variables";

import { primary, secondary } from "../assets/styles/typography";

const Theme = {
  mediaQuery: {
    small: `(min-width: ${SM}px)`,
    medium: `(min-width: ${MD}px)`,
    // because Ipad mini and regular Ipad share the same viewport (1024 width)
    // required to allow the filter to hide
    large: `(min-width: ${LG + 1}px) and (min-height: ${MD}px)`,
    xlarge: `(min-width: ${XLG}px)`,
    xxlarge: `(min-width: ${XXL}px)`,
  },
  colors: {
    primary: "#E30000",
    dark: "#030000",
    text: "#ffffff"
  },
};

export default Theme;
