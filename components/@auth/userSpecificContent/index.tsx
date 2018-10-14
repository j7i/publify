import firebase from 'firebase'
import { PureComponent } from 'react'
import { IUserSpecificContentProps, IUserSpecificContentState } from './types'

export default class UserSpecificContent extends PureComponent<IUserSpecificContentProps, IUserSpecificContentState> {
  public state: IUserSpecificContentState = {
    user: null,
    isAuthorizing: true
  }

  public componentWillMount = (): void => {
    // tslint:disable-next-line:no-any
    firebase.auth().onAuthStateChanged((user: any) => {
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
      return <p>Authorizing...</p>
    }

    return children(user)
  }
}
