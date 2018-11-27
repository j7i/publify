import { firestore } from '@config/firebase'
import { FirebaseCollection } from '@config/firebase/types.d'
import { PureComponent, ReactNode } from 'react'
import { IChatControllerProps, IChatControllerState, IChatRenderProps, IMessage } from './types'

export default class ChatController extends PureComponent<IChatControllerProps, IChatControllerState> {
  public state: IChatControllerState = {
    message: '',
    messages: [],
    loading: true
  }

  public componentDidMount(): void {
    const { seekingId, seekingOwnerId, loggedInUser } = this.props
    const firestoreChat = firestore.collection('chats').doc(seekingId + loggedInUser)

    // seekingOwnerId is possibly undefined
    firestoreChat
      .get()
      .then((docSnapshot: firebase.firestore.DocumentSnapshot) => {
        if (docSnapshot.exists) {
          this.startChatConversation(seekingId, loggedInUser)
        } else {
          firestoreChat
            .set({
              members: [seekingOwnerId, loggedInUser]
            })
            .then(() => {
              this.startChatConversation(seekingId, loggedInUser)
            })
        }
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error initializing chat: ', error)
      })
  }

  public startChatConversation(seekingId: string, loggedInUser: string): void {
    firestore
      .collection('chats')
      .doc(seekingId + loggedInUser)
      .collection('messages')
      .onSnapshot(
        (querySnapshot: firebase.firestore.QuerySnapshot) => {
          let messages: firebase.firestore.DocumentData = []
          querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
            messages.push(doc.data())
          })
          messages.sort((a: IMessage, b: IMessage) => {
            return a.date.seconds - b.date.seconds
          })
          this.setState({
            messages,
            loading: false
          })
        },
        (error: Error) => {
          // tslint:disable-next-line:no-console
          console.error(error)
        }
      )
  }

  public componentWillUnmount(): void {
    const { seekingId } = this.props

    firestore
      .collection('chats')
      .doc(seekingId)
      .collection('messages')
      // tslint:disable-next-line:no-empty
      .onSnapshot(() => {})
  }

  public sendMessage = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const { seekingId, loggedInUser } = this.props
    const message = {
      content: this.state.message,
      date: new Date(),
      uid: loggedInUser
    }

    this.setState({
      message: ''
    })

    firestore
      .collection(FirebaseCollection.CHATS)
      .doc(seekingId + loggedInUser)
      .collection('messages')
      .add({ ...message })
      .then(() => {
        // tslint:disable-next-line:no-console
        console.log('Message sent')
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding message: ', error)
      })
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target

    event.persist()
    this.setState({
      message: value
    })
  }

  public render(): ReactNode {
    const { children, loggedInUser } = this.props

    const chatRenderProps: IChatRenderProps = {
      ...this.state,
      loggedInUser,
      handleChange: this.handleChange,
      sendMessage: this.sendMessage
    }

    return children(chatRenderProps)
  }
}
