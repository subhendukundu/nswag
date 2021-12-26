import React from "react";
import Head from 'next/head'


function MetaData({ title, noTracking }) {
  return (
    <Head>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="https://acqu.co" />
      <meta name="title" content={title} />
      <meta
        name="description"
        content="Seamlessly exit your Amazon business in less than 30 days. Sell your Amazon FBA e-commerce business and continue to profit as your brand grows with us."
      />
      <meta name="keywords" content="analytics, open-source" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://acqu.co" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="Seamlessly exit your Amazon business in less than 30 days. Sell your Amazon FBA e-commerce business and continue to profit as your brand grows with us. "
      />
      <meta
        property="og:image"
        content="https://uploads-ssl.webflow.com/5e57b021f53be6722a091469/6119baa275eb548d2c5bc4d3_acquco%20preview.png"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://acqu.co" />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content="Seamlessly exit your Amazon business in less than 30 days. Sell your Amazon FBA e-commerce business and continue to profit as your brand grows with us. "
      />
      <meta
        property="twitter:image"
        content="https://uploads-ssl.webflow.com/5e57b021f53be6722a091469/6119baa275eb548d2c5bc4d3_acquco%20preview.png"
      />
      <script>
        {`if(typeof require === 'undefined') var require = {};
        if (typeof exports === 'undefined') var exports = {};`}
      </script>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' />
    </Head>
  );
}

export default MetaData;
