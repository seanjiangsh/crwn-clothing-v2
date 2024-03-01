import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Open Sans", sans-serif;
    overflow: hidden;
    width:100dvw;
    height:100dvh;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
