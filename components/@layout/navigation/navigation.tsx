import { handleLogout, UserSpecificContent } from '@auth'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ChatIcon from '@material-ui/icons/Chat'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PageviewIcon from '@material-ui/icons/Pageview'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import React, { ReactNode } from 'react'
import styles from './styles.css'
import { INavigationProps, INavigationState, PathName } from './types'

export class InternalNavigation extends React.PureComponent<INavigationProps, INavigationState> {
  public state: INavigationState = {
    activeRoute: PathName.START
  }

  public render(): ReactNode {
    const { activeRoute } = this.state
    return (
      <div className={styles.navigation}>
        <div className={styles.desktopNavigation}>
          <AppBar position="static">
            <Toolbar>
              <Link href="/">
                <Typography className={styles.title} variant="h6" color="inherit" noWrap>
                  Publify
                </Typography>
              </Link>
              <div className={styles.flexGrowPlaceholder} />
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
        <div className={styles.mobileNavigation}>
          <BottomNavigation value={activeRoute} onChange={this.handleNavigationChange}>
            <BottomNavigationAction label="Start" value={PathName.START} icon={<PageviewIcon />} />
            <BottomNavigationAction label="Dashboard" value={PathName.DASHBOARD} icon={<DashboardIcon />} />
            <BottomNavigationAction label="Messages" value={PathName.MESSAGES} icon={<ChatIcon />} />
            <BottomNavigationAction label="Login" value={PathName.LOGIN} icon={<AccountBoxIcon />} />
          </BottomNavigation>
        </div>
      </div>
    )
  }

  public componentWillMount(): void {
    const { router } = this.props
    if (router && router.pathname !== '/' && router.pathname !== `/${PathName.DETAIL}`) {
      const pathName = router.pathname.replace('/', '') as PathName
      this.setState({ activeRoute: pathName })
    }
  }

  private handleNavigationChange = (event: React.ChangeEvent, value: PathName): void => {
    event.preventDefault()

    if (value === PathName.START) {
      Router.push('/')
    } else {
      Router.push(`/${value}`)
    }

    this.setState({ activeRoute: value })
  }
}

// tslint:disable-next-line:no-any
export const Navigation = withRouter<any>(InternalNavigation)
