import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body style={{maxWidth: '100vw', overflowX: 'hidden', margin: 'unset'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
