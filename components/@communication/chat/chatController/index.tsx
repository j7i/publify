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
    const { advertId, advertOwnerId, loggedInUserId } = this.props

    this.firestoreChat()
      .get()
      .then((docSnapshot: firebase.firestore.DocumentSnapshot) => {
        if (docSnapshot.exists) {
          this.startChatConversation()
        } else {
          this.firestoreChat()
            .set({
              members: [advertOwnerId, loggedInUserId],
              advertId
            })
            .then(() => {
              this.startChatConversation()
            })
        }
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error initializing chat: ', error)
      })
  }

  public componentWillUnmount(): void {
    this.firestoreChat()
      .collection(FirebaseCollection.CHAT_MESSAGES)
      // tslint:disable-next-line:no-empty
      .onSnapshot(() => {})
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist()

    const { value } = event.target

    this.setState({
      message: value
    })
  }

  public sendMessage = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const { loggedInUserId } = this.props
    const message = {
      content: this.state.message,
      date: new Date(),
      uid: loggedInUserId
    }

    this.setState({
      message: ''
    })

    this.firestoreChat()
      .collection(FirebaseCollection.CHAT_MESSAGES)
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

  public render(): ReactNode {
    const { children, loggedInUserId } = this.props

    const chatRenderProps: IChatRenderProps = {
      ...this.state,
      loggedInUserId,
      handleChange: this.handleChange,
      sendMessage: this.sendMessage
    }

    return children(chatRenderProps)
  }

  private firestoreChat = (): firebase.firestore.DocumentReference => {
    const { advertId, loggedInUserId, chatId } = this.props
    const chat = advertId && loggedInUserId ? advertId + loggedInUserId : chatId

    return firestore.collection(FirebaseCollection.CHATS).doc(chat)
  }

  private startChatConversation = (): void => {
    this.firestoreChat()
      .collection(FirebaseCollection.CHAT_MESSAGES)
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
}
