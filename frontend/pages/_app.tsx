import Head from 'next/head'
import dynamic from "next/dynamic";
import type { AppProps } from 'next/app';
import React from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});

//Warning: viewport meta tags should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-viewport-meta

// HYDRATION render HTML error semakin menjadi jadi dalam next.js, solusi
// menggunakan dynamic dan App Props dalam _app.tsx 