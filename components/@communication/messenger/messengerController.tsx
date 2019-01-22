import { FirebaseCollection, firestore } from '@config'
import { NotificationSeverity, SnackbarNotification } from '@core'
import { PureComponent, ReactNode } from 'react'
import { IMessengerControllerProps, IMessengerControllerState, IMessengerViewRenderProps } from './types'

export class MessengerController extends PureComponent<IMessengerControllerProps, IMessengerControllerState> {
  public state: IMessengerControllerState = {
    chats: [],
    currentChat: '',
    notification: null
  }

  public componentDidMount(): void {
    this.getUserSpecificChats()
  }

  public render(): ReactNode {
    const { chats, currentChat } = this.state
    const { children, user } = this.props
    const renderProps: IMessengerViewRenderProps = {
      user,
      chats,
      currentChat,
      clearCurrentConversation: this.clearCurrentConversation,
      startConversation: this.startConversation
    }

    return children(renderProps)
  }

  private clearCurrentConversation = (): void => {
    this.setState({
      currentChat: ''
    })
  }

  private startConversation = (currentChat: string): void => {
    this.setState({
      currentChat
    })
  }

  private getUserSpecificChats = async (): Promise<void> => {
    // tslint:disable-next-line:no-any
    let chats: any[] = []
    const { user } = this.props
    firestore
      .collection(FirebaseCollection.CHATS)
      .where('members', 'array-contains', user!.uid)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          chats.push({ id: doc.id, ...doc.data() })
        })
      })
      .then(() => {
        this.setState({ chats })
        if (window.innerWidth > 991) {
          this.setState({ currentChat: chats[0].id })
        }
      })
      .catch((error: Error) => {
        this.setState({
          notification: <SnackbarNotification key={Date.now() + Math.random()} message={error.message} severity={NotificationSeverity.ERROR} />
        })
      })
  }
}
