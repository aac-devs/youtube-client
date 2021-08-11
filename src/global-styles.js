import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html {
  font-size: 1.125rem;
  line-height: 1.6;
  font-weight: 400;
  font-family: Roboto, sans-serif;
  box-sizing: border-box;
  scroll-behavior: smooth;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
  line-height: 1.43;
  letter-spacing: 0.01071em;
}

body {
  margin: 0;
  padding: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body,
html {
  display: flex;
  height: 100vh;
  width: 100%;
  /* background-color: #37474f; */
  background-color: #fff;
}

.separator::before {
  content: '•';
  color: white;
  padding: 0.4rem;
}

a {
  text-decoration: none;
  font-weight: bold;
  color: white;
}

a:active {
  color: blueviolet;
}

#root {
  width: 100%;
  display: flex;
  flex-direction: column;
}
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default GlobalStyles;
