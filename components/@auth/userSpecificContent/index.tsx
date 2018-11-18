import firebase from '@config/firebase/index'
import LinearProgress from '@material-ui/core/LinearProgress'
import { PureComponent } from 'react'
import { IUserSpecificContentProps, IUserSpecificContentState } from './types'

export default class UserSpecificContent extends PureComponent<IUserSpecificContentProps, IUserSpecificContentState> {
  public state: IUserSpecificContentState = {
    user: null,
    isAuthorizing: true
  }

  public componentWillMount = (): void => {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
      this.setState({ isAuthorizing: false })
    })
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
