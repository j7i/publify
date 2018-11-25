import { firestore } from '@config/firebase'
import { FirebaseCollection } from '@config/firebase/types.d'
import { PureComponent, ReactNode } from 'react'
import { IChatControllerProps, IChatControllerState, IChatRenderProps } from './types'

export default class ChatController extends PureComponent<IChatControllerProps, IChatControllerState> {
  public state: IChatControllerState = {
    message: '',
    messages: [],
    loading: true
  }

  public componentWillMount(): void {
    const { messages } = this.props

    if (messages) {
      this.setState({
        messages
      })
    }
  }

  public componentDidMount(): void {
    // const { seeking, uid } = this.props

    // let chatContent = []

    firestore
      .collection('chats')
      .doc('EPeGdT4BM3b2EaUK16rL')
      .collection('messages')
      .onSnapshot(
        (querySnapshot: firebase.firestore.QuerySnapshot) => {
          let messages: firebase.firestore.DocumentData = []
          querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
            messages.push(doc.data())
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
    const { seeking } = this.props

    firestore
      .collection('chats')
      .doc(seeking)
      .collection('messages')
      // tslint:disable-next-line:no-empty
      .onSnapshot(() => {})
  }

  public sendMessage = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const { seeking, loggedInUser } = this.props
    const message = {
      content: this.state.message,
      date: new Date(),
      uid: loggedInUser
    }

    firestore
      .collection(FirebaseCollection.CHATS)
      .doc(seeking)
      .collection('messages')
      .add({ ...message })
      .then(() => {
        this.setState({
          message: ''
        })
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
