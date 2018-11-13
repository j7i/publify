import Document, { Head, Main, NextDocumentContext, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  // tslint:disable-next-line:no-any
  public static async getInitialProps({ renderPage }: NextDocumentContext): Promise<any> {
    let pageContext
    // tslint:disable-next-line:no-any
    const page = renderPage((Component: any) => {
      // tslint:disable-next-line:no-any
      const WrappedComponent = (props: any): JSX.Element => {
        pageContext = props.pageContext
        return <Component {...props} />
      }

      return WrappedComponent
    })

    return {
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
          />
          {flush() || null}
        </>
      )
    }
  }

  public render(): JSX.Element {
    const { pageContext } = this.props

    return (
      <html lang="">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
