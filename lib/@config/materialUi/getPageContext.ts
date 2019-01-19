import { lime, teal } from '@material-ui/core/colors'
import { createGenerateClassName, createMuiTheme } from '@material-ui/core/styles'
import { SheetsRegistry } from 'jss'
import { ICreatePageContext } from './types'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700]
    },
    secondary: {
      light: lime[100],
      main: lime[300],
      dark: lime[600]
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

export function getPageContext(): ICreatePageContext {
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
