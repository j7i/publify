import { FirebaseCollection, firestore } from '@config'
import { PureComponent, ReactNode } from 'react'
import { IChatControllerProps, IChatControllerState, IChatRenderProps, IMessage } from '../types'

export class ChatController extends PureComponent<IChatControllerProps, IChatControllerState> {
  public state: IChatControllerState = {
    message: '',
    messages: [],
    loading: true
  }

  public componentDidMount(): void {
    const { advertId, advertTitle, advertOwnerId, advertOwnerName, loggedInUserId, loggedInUserName } = this.props

    this.firestoreChat()
      .get()
      .then((docSnapshot: firebase.firestore.DocumentSnapshot) => {
        if (docSnapshot.exists) {
          this.startChatConversation()
        } else if (advertOwnerId) {
          this.firestoreChat()
            .set({
              memberInfos: { [advertOwnerId]: { name: advertOwnerName }, [loggedInUserId]: { name: loggedInUserName } },
              members: [advertOwnerId, loggedInUserId],
              advertId,
              advertTitle
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
            let timeA = `${a.date.seconds}${a.date.nanoseconds}`
            let timeB = `${b.date.seconds}${b.date.nanoseconds}`
            return parseInt(timeA, 10) - parseInt(timeB, 10)
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