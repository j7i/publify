import { Icon, IconButton, Snackbar, SnackbarContent } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { INotificationProps, INotificationState } from './types'

export class SnackbarNotification extends PureComponent<INotificationProps> {
  public state: INotificationState = {
    open: true
  }

  public render(): ReactNode {
    const { severity, message } = this.props
    const { open } = this.state

    if (open) {
      return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={this.state.open}
          autoHideDuration={6000}
        >
          <SnackbarContent
            className={classNames(styles[severity], styles.notification)}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={styles.message}>
                <Icon className={classNames(styles.icon, styles.iconVariant)} />
                {message}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="Close" color="inherit" className={styles.close} onClick={this.handleClose}>
                <CloseIcon className={styles.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      )
    } else {
      return null
    }
  }

  private handleClose = (): void => {
    this.setState({ open: false })
  }
}
