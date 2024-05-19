import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-touch-callout: none;
  }

  body {
    margin: 0;
    font-family: "Open Sans", sans-serif;
    overflow: hidden;
    position: fixed;
    user-select: none;
  }

  #root {
    width: 100dvw;
    height: 100dvh;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
