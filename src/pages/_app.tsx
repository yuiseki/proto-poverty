import Head from 'next/head';
import { GlobalStyles, css } from 'twin.macro';
import { Global } from '@emotion/react';
import { AppProps } from 'next/app';

const globalStyles = css`
  html,
  body {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  html {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  body {
    padding: 0 !important;
    margin: 0 !important;
    height: 98%;
  }

  body > div:first-of-type,
  div#__next {
    height: 100%;
  }
`;

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>貧困可視化プロトタイプ</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <GlobalStyles />
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
);

export default App;
