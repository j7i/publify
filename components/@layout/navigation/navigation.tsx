import { handleLogout, UserSpecificContent } from '@auth'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { INavigationProps, INavigationState } from './types'

const styles = (theme: Theme): StyleRules => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
})

class Navigation extends React.PureComponent<INavigationProps, INavigationState> {
  public state: INavigationState = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  }

  public render(): ReactNode {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link href="/">
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Publify
              </Typography>
            </Link>
            <div className={classes.grow} />
            <UserSpecificContent>
              {(user: firebase.User): ReactNode => (
                <>
                  {user && (
                    <>
                      <Link href="/dashboard">
                        <Button color="inherit">Dashboard</Button>
                      </Link>
                      <Link href="/messages">
                        <Button color="inherit">Messages</Button>
                      </Link>
                    </>
                  )}
                  <Link href="/login">
                    <Button onClick={user && handleLogout} color="inherit">
                      {user ? 'Logout' : 'Login'}
                    </Button>
                  </Link>
                </>
              )}
            </UserSpecificContent>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

// TODO: No default
export default withStyles(styles)(Navigation)
