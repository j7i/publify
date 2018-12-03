import AdvertCardElement from '@advert/advertCardElement'
import { IAdvert } from '@advert/advertListElement/types'
import Chat from '@communication/chat'
import firebase from '@config/firebase/index'
import { FirebaseCollection } from '@config/firebase/types.d'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import 'isomorphic-unfetch'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IChat, IDashboardProps, IDashboardState } from './types'

export default class Dashboard extends PureComponent<IDashboardProps, IDashboardState> {
  public state: IDashboardState = {
    adverts: [],
    chats: [],
    currentChat: ''
  }

  public componentDidMount(): void {
    this.getUserSpecificAdverts()
    this.getUserSpecificChats()
  }

  public startConversation = (currentChat: string): void => {
    this.setState({
      currentChat
    })
  }

  public render(): JSX.Element {
    const { adverts, chats, currentChat } = this.state
    return (
      <div className={styles.dashboard}>
        <section className={styles.adverts}>
          {adverts.length !== 0 && adverts.map((advert: IAdvert, index: number) => <AdvertCardElement key={index} withActions advert={advert} />)}
        </section>
        {chats.length !== 0 && (
          <Paper className={styles.chatList}>
            <List component="nav" subheader={<ListSubheader>Messages</ListSubheader>}>
              {chats.map((chat: IChat, index: number) => {
                return (
                  <ListItem key={index} selected={chat.id === currentChat} button onClick={(): void => this.startConversation(chat.id)}>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary={chat.advertId} />
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        )}
        {currentChat && <Chat chatId={currentChat} key={currentChat} />}
      </div>
    )
  }

  private getUserSpecificAdverts = async (): Promise<void> => {
    const firestore = firebase.firestore()
    const { user } = this.props

    // tslint:disable-next-line:no-any
    let adverts: any[] = []
    firestore
      .collection(FirebaseCollection.ADVERTS)
      .where('userId', '==', user!.uid)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          adverts.push({ id: doc.id, ...doc.data() })
        })
      })
      .then(() => {
        this.setState({ adverts })
      })
      // tslint:disable-next-line:no-any
      .catch((error: any) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
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
      // tslint:disable-next-line:no-any
      .catch((error: any) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
