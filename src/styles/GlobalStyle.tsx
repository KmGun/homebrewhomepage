import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/Pretendard/Pretendard-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/Pretendard/Pretendard-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/Pretendard/Pretendard-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  html, body {
    background-color: #1a1a1a;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 
                 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    word-break: keep-all;
  }
`;

export default GlobalStyle;
