import { StyleRules } from '@material-ui/core/styles'
import { WithStyles } from '@material-ui/core/styles/withStyles'
import { MenuProps } from 'material-ui'

export interface INavigationProps {
  classes: WithStyles['classes']
}

export interface INavigationState {
  // tslint:disable-next-line:no-any
  anchorEl: any
  // tslint:disable-next-line:no-any
  mobileMoreAnchorEl: any
}
