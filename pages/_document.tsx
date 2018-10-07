// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  // tslint:disable-next-line:no-any
  public static async getInitialProps(ctx: any): Promise<any> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  public render(): JSX.Element {
    return (
      <html lang="">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
