import { Chat } from '@communication/chat'
import { FirebaseCollection } from '@config'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import firebase from 'firebase'
import { PureComponent, ReactNode } from 'react'
import styles from './messengerStyles.css'
import { IChat, IMessengerProps, IMessengerState } from './types'

export class Messenger extends PureComponent<IMessengerProps, IMessengerState> {
  public state: IMessengerState = {
    chats: [],
    currentChat: ''
  }

  public componentDidMount(): void {
    this.getUserSpecificChats()
  }

  public render(): ReactNode {
    const { chats, currentChat } = this.state

    return (
      <Paper className={styles.messenger}>
        <List className={styles.chatList} component="nav" subheader={<ListSubheader>Messages</ListSubheader>}>
          {chats.length !== 0 &&
            chats.map((chat: IChat, index: number) => {
              return (
                <ListItem
                  className={styles.chatListItem}
                  key={index}
                  selected={chat.id === currentChat}
                  button
                  onClick={(): void => this.startConversation(chat.id)}
                >
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary={chat.advertId} />
                </ListItem>
              )
            })}
        </List>
        {currentChat && <Chat chatId={currentChat} key={currentChat} displayMode="embedded" />}
      </Paper>
    )
  }

  private startConversation = (currentChat: string): void => {
    this.setState({
      currentChat
    })
  }

  private getUserSpecificChats = async (): Promise<void> => {
    const firestore = firebase.firestore()
    const { user } = this.props

    // tslint:disable-next-line:no-any
    let chats: any[] = []
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
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
