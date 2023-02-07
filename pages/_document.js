import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.acsb }}></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-97158185-1"></script>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.ga }}></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
