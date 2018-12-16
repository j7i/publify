import { firebaseApp } from '@config'
import LinearProgress from '@material-ui/core/LinearProgress'
import Router from 'next/router'
import { PureComponent } from 'react'
import { IUserSpecificContentProps, IUserSpecificContentState } from './types'

export class UserSpecificContent extends PureComponent<IUserSpecificContentProps, IUserSpecificContentState> {
  public state: IUserSpecificContentState = {
    user: null,
    isAuthorizing: true
  }

  public componentWillMount = (): void => {
    firebaseApp.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
      this.setState({ isAuthorizing: false })
    })
  }

  public componentDidUpdate = (): void => {
    if (!this.state.user) {
      Router.push('/login')
    }
  }

  public render(): JSX.Element {
    const { children } = this.props
    const { user, isAuthorizing } = this.state

    if (isAuthorizing) {
      return <LinearProgress />
    }

    return children(user)
  }
}
