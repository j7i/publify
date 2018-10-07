import Layout from '@layout/Layout'
import App, { Container } from 'next/app'

export default class MyApp extends App {
  // We could pass router props as well
  // public static async getInitialProps({ Component, router, ctx }): Promise<IPageProps> {
  //   let pageProps = {}

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return { pageProps }
  // }
  //
  // <Component {...pageProps} />

  public render(): JSX.Element {
    const { Component } = this.props
    return (
      <Container>
        <Layout>
          <Component />
        </Layout>
      </Container>
    )
  }
}
