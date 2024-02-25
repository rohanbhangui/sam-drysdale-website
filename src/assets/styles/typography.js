import { css } from "styled-components"

//across the road
import AcrossTheRoadWoff from "../fonts/AcrosstheRoad.woff"
import AcrossTheRoadWoff2 from "../fonts/AcrosstheRoad.woff2"

// lora
import LoraBoldWoff from "../fonts/Lora-Bold.woff"
import LoraBoldWoff2 from "../fonts/Lora-Bold.woff2"
import LoraBoldItalicsWoff from "../fonts/Lora-BoldItalic.woff"
import LoraBoldItalicsWoff2 from "../fonts/Lora-BoldItalic.woff2"
import LoraWoff from "../fonts/Lora-Regular.woff"
import LoraWoff2 from "../fonts/Lora-Regular.woff2"
import LoraItalicWoff from "../fonts/Lora-Italic.woff"
import LoraItalicWoff2 from "../fonts/Lora-Italic.woff2"

import GeneralSansVariableWoff from "../fonts/GeneralSans-Variable.woff"
import GeneralSansVariableWoff2 from "../fonts/GeneralSans-Variable.woff2"
import GeneralSansVariableItalicWoff from "../fonts/GeneralSans-VariableItalic.woff"
import GeneralSansVariableItalicWoff2 from "../fonts/GeneralSans-VariableItalic.woff2"

// vogue
import VogueWoff from "../fonts/Vogue-Regular.woff"
import VogueWoff2 from "../fonts/Vogue-Regular.woff2"

const FontFace = css`
  @font-face {
    font-family: "Across the Road";
    src: local("Across the Road"), local("AcrosstheRoad"),
      url("${AcrossTheRoadWoff2}") format("woff2"),
      url("${AcrossTheRoadWoff}") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Lora";
    src: local("Lora Bold Italic"), local("Lora-BoldItalic"),
      url("${LoraBoldItalicsWoff2}") format("woff2"),
      url("${LoraBoldItalicsWoff}") format("woff");
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Lora";
    src: local("Lora Bold"), local("Lora-Bold"),
      url("${LoraBoldWoff2}") format("woff2"),
      url("${LoraBoldWoff}") format("woff");
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Lora";
    src: local("Lora Italic"), local("Lora-Italic"),
      url("${LoraItalicWoff2}") format("woff2"),
      url("${LoraItalicWoff}") format("woff");
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Lora";
    src: local("Lora"), local("Lora-Regular"),
      url("${LoraWoff2}") format("woff2"),
      url("${LoraWoff}") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Vogue";
    src: local("Vogue Regular"), local("Vogue-Regular"),
      url("${VogueWoff2}") format("woff2"),
      url("${VogueWoff}") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "GeneralSans-Variable";
    src: local("General Sans"), local("General-Sans"),
      url("${GeneralSansVariableWoff2}") format("woff2"),
      url("${GeneralSansVariableWoff}") format("woff");
    font-weight: 200 700;
    font-display: swap;
    font-style: normal;
  }

  /**
    * This is a variable font
    * You can controll variable axes as shown below:
    * font-variation-settings: 'wght' 700.0;
    *
    * available axes:

    * 'wght' (range from 200.0 to 700.0)
  */

  @font-face {
    font-family: "GeneralSans-VariableItalic";
    src: local("General Sans Italic"), local("General-Sans-Italic"),
      url("${GeneralSansVariableItalicWoff2}") format("woff2"),
      url("${GeneralSansVariableItalicWoff}") format("woff");
    font-weight: 200 700;
    font-display: swap;
    font-style: italic;
  }
`

const primary = css`
  font-family: "GeneralSans-Variable", serif;
  text-transform: uppercase;
  font-weight: 550;
`

const secondary = css`
  font-family: "GeneralSans-Variable", serif;
  font-weight: 500;
`

const Typography = css`
  p {
    font-weight: 500;
    margin-top: 0.75rem;
    line-height: 1.4;
    font-size: 1.2rem;

    @media ${({ theme }) => theme.mediaQuery.small} {
      font-size: 1.1rem;
    }

    @media ${({ theme }) => theme.mediaQuery.medium} {
      font-size: 0.9rem;
    }
  }

  h1,
  .h1 {
    ${primary}
    font-size: 3.5rem;
    line-height: 0.9;
    letter-spacing: -0.1rem;

    @media ${({ theme }) => theme.mediaQuery.large} {
      font-size: 4rem;
    }

    @media ${({ theme }) => theme.mediaQuery.xlarge} {
      font-size: 4.75rem;
    }

    &.big {
      font-size: 5.5rem;
      line-height: 0.8;
      letter-spacing: -0.4rem;

      @media ${({ theme }) => theme.mediaQuery.small} {
        font-size: 7rem;
      }

      @media ${({ theme }) => theme.mediaQuery.medium} {
        font-size: 8rem;
      }

      @media ${({ theme }) => theme.mediaQuery.large} {
        font-size: 9.5rem;
      }

      @media ${({ theme }) => theme.mediaQuery.xlarge} {
        font-size: 12rem;
      }
    }
  }

  h2,
  .h2 {
    ${primary}
    font-size: 2.5rem;
    line-height: 1;
    letter-spacing: -0.02rem;
  }

  h3,
  .h3 {
    ${secondary}
    font-weight: 550;
    margin-top: 0.75rem;
    line-height: 1.5rem;
    font-size: 1.3rem;
    letter-spacing: -0.05rem;

    @media ${({ theme }) => theme.mediaQuery.small} {
      font-size: 1rem;
    }
  }

  h4,
  .h4 {
    ${secondary}
    font-weight: 600;
    margin-top: 0.75rem;
    line-height: 1rem;
    font-size: 0.6rem;
    letter-spacing: 0.02rem;
  }
`

export { Typography, FontFace, primary, secondary }
