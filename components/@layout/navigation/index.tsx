import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import Link from 'next/link'
import React from 'react'
import { INavigationProps, INavigationState } from './types'

const styles = (theme: Theme): StyleRules => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

class Navigation extends React.PureComponent<INavigationProps, INavigationState> {
  public state: INavigationState = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  }

  public handleClose = (): void => {
    this.setState({ anchorEl: null })
  }

  public handleProfileMenuOpen = (event: React.SyntheticEvent): void => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleMenuClose = (): void => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  public handleMobileMenuOpen = (event: React.SyntheticEvent): void => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  public handleMobileMenuClose = (): void => {
    this.setState({ mobileMoreAnchorEl: null })
  }

  public render(): JSX.Element {
    const { anchorEl, mobileMoreAnchorEl } = this.state
    const { classes } = this.props
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link href="/login">
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Link>
      </Menu>
    )

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    )

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Link href="/">
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Publify
              </Typography>
            </Link>
            <div className={classes.grow} />
            <Link href="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </Link>
            <div className={classes.sectionDesktop}>
              <IconButton aria-owns={isMenuOpen ? 'material-appbar' : undefined} aria-haspopup="true" onClick={this.handleProfileMenuOpen} color="inherit">
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    )
  }
}

export default withStyles(styles)(Navigation)
