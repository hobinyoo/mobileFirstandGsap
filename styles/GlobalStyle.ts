import { css } from '@emotion/react'

//GlobalStyles
export const GlobalStyle = css`
  @font-face {
    font-family: 'KoreanRKTR';
    src: url('/fonts/roket.ttf') format('ttf');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'KoreanRKTR';
    src: url('/fonts/roket.woff') format('woff');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'KoreanRKTR';
    src: url('/fonts/roket.otf') format('otf');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  :root {
    --primary: #ffc636;
    --secondary: #0a0b5b;

    // Fonts As per the type scale generator => https://material-io.cn/inline-tools/typography/
    --fontBig: 7rem; //88 px
    --fontxxxl: 5.5rem; //88 px
    --fontxxl: 3.4375rem; //55 px
    --fontxl: 2.75rem; //44 px
    --fontlg: 1.9375rem; //31 px
    --fontmd: 1.375rem; //22 px
    --fontsm: 1.125rem; //18 px
    --fontxs: 1rem; //16 px
    --fontxxs: 0.75rem; //12 px
    //font

    --fontR: 'KoreanRKTR';
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  /* reset */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
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

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;

    /* 배경 색상 지정 */
    /* background-color: black; */

    /* 사파리 새로고침 막기 */
    overflow: hidden;
    /* overscroll-behavior: contain; */
  }
`
