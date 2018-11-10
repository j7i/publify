import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { MuiThemeProviderProps } from '@material-ui/core/styles/MuiThemeProvider'
import { StylesCreator } from '@material-ui/core/styles/withStyles'
import { GenerateClassName, SheetsRegistry } from 'jss'

export interface ICreatePageContext {
  theme: Theme
  sheetsManager: MuiThemeProviderProps['sheetsManager']
  sheetsRegistry: SheetsRegistry
  generateClassName: GenerateClassName
}

export interface IPageContextProps {
  pageContext: ICreatePageContext
}
