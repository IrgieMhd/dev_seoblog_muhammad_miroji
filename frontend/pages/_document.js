import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default function Document() {

  const setGoogleTags = () => {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7JST3GMGZV');
        `
      };
    }
  }

  return (
    <Html lang="en">
      <Head>
        {/* adding html head section to meta then include bootstrap cdn */}
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.2/css/bootstrap.min.css" />
        {/*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />*/}
        <link rel="stylesheet" href="/static/global.css" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7JST3GMGZV"></script>
        <script dangerouslySetInnerHTML={setGoogleTags()} />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}