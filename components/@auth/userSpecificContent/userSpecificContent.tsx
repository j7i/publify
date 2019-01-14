import { firebaseApp, FirebaseCollection, firestore } from '@config'
import LinearProgress from '@material-ui/core/LinearProgress'
import { PureComponent, ReactNode } from 'react'
import { IUserSpecificContentProps, IUserSpecificContentState } from './types'

export class UserSpecificContent extends PureComponent<IUserSpecificContentProps, IUserSpecificContentState> {
  public state: IUserSpecificContentState = {
    user: null,
    isAuthorizing: true
  }

  public componentDidMount = (): void => {
    firebaseApp.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.setState({ user }, () => this.getUserInfos(user))
      } else {
        this.setState({ user: null }, () => this.setState({ isAuthorizing: false }))
      }
    })
  }

  public render(): ReactNode {
    const { children } = this.props
    const { user, isAuthorizing, userInfo } = this.state

    if (isAuthorizing) {
      return <LinearProgress />
    }

    return children(user, userInfo)
  }

  private getUserInfos = async (user: firebase.User): Promise<void> => {
    if (user) {
      firestore
        .collection(FirebaseCollection.USERS)
        .doc(user!.uid)
        .get()
        .then((doc: firebase.firestore.DocumentData) => {
          this.setState(
            {
              userInfo: { id: doc.id, ...doc.data() }
            },
            () => this.setState({ isAuthorizing: false })
          )
        })
        .catch((error: Error) => {
          // tslint:disable-next-line:no-console
          console.error('Error adding document: ', error)
        })
    }
  }
}
