import clientCredentials from '@config/firebase/client.js'
import Layout from '@layout/Layout'
import firebase from 'firebase'
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

  public componentWillMount(): void {
    if (!firebase.apps.length) {
      // Initialize Firebase
      firebase.initializeApp(clientCredentials)

      // Initialize Firestore
      const firestore = firebase.firestore()
      firestore.settings({ timestampsInSnapshots: true })
    }
  }

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
