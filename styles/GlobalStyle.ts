import { css } from '@emotion/react'

//GlobalStyles
export const GlobalStyle = css`
  :root {
    --primary: #ffc636;
    --secondary: #0a0b5b;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  /* reset */
  body,
  p,
  a,
  ul,
  li {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  li {
    list-style-type: none;
  }

  /* base styles */
  body {
    overflow-x: hidden;
  }

`
