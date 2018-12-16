import { WithStyles } from '@material-ui/core/styles/withStyles'

export interface INavigationProps {
  classes: WithStyles['classes']
}

export interface INavigationState {
  // tslint:disable-next-line:no-any
  anchorEl: any
  // tslint:disable-next-line:no-any
  mobileMoreAnchorEl: any
}
