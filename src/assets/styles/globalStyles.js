import { createGlobalStyle } from "styled-components"
import { Typography, FontFace } from "./typography"

const GlobalStyle = createGlobalStyle`
  ${FontFace}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;

    &.mobile-open {
      overflow: hidden;
      pointer-events: none;
    }
  }

  html {
    font-size: calc(60% + 0.8vmin);
    scroll-behavior: smooth;

    &.smooth-scroll {
      scroll-behavior: smooth;
    }
  }

  body {
    background: ${({ theme }) => theme.colors.light};
  }

  #root {
    width: 100%;
  }

  * {
    font-size: 1rem;
    font-family: 'GeneralSans-Variable', serif;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 550;
  }

  /* reset the index.css */
  a {
    margin: 0;
  }

  ${Typography}
`

export default GlobalStyle
