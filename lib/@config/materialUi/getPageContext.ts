import amber from '@material-ui/core/colors/amber'
import indigo from '@material-ui/core/colors/indigo'
import { createGenerateClassName, createMuiTheme } from '@material-ui/core/styles'
import { SheetsRegistry } from 'jss'
import { ICreatePageContext } from './types'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700]
    },
    secondary: {
      light: amber[300],
      main: amber[500],
      dark: amber[700]
    }
  },
  typography: {
    useNextVariants: true
  }
})

const createPageContext = (): ICreatePageContext => {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  }
}

/* tslint:disable */
declare global {
  namespace NodeJS {
    interface Global {
      __INIT_MATERIAL_UI__: any
    }
    interface Process {
      browser: boolean
    }
  }
}
/* tslint:enable */

export default function getPageContex(): ICreatePageContext {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext()
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext()
  }

  return global.__INIT_MATERIAL_UI__
}
