// tslint:disable

import clientCredentials from '@config/firebase/client.js'
import getPageContext from '@config/materialUi/getPageContext'
import Layout from '@layout/Layout'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import firebase from 'firebase'
import App, { Container } from 'next/app'
import JssProvider from 'react-jss/lib/JssProvider'

export default class MyApp extends App {
  public static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  constructor(props) {
    super(props)
  }

  public pageContext = getPageContext()

  public componentWillMount(): void {
    if (!firebase.apps.length) {
      // Initialize Firebase
      firebase.initializeApp(clientCredentials)

      // Initialize Firestore
      const firestore = firebase.firestore()
      firestore.settings({ timestampsInSnapshots: true })
    }
  }

  public componentDidMount(): void {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  public render(): JSX.Element {
    const { Component, pageProps } = this.props
    const { sheetsRegistry, generateClassName, theme, sheetsManager } = this.pageContext
    return (
      <Container>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Layout>
              <Component pageContext={this.pageContext} {...pageProps} />
            </Layout>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}
