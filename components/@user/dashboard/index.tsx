import { IAdvert } from '@advert/advertListElement/types'
import Chat from '@communication/chat'
import firebase from '@config/firebase/index'
import { FirebaseCollection } from '@config/firebase/types.d'
import { AppBar, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Tab, Tabs } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ChatIcon from '@material-ui/icons/Chat'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import EditAdvert from '@user/editAdvert'
import 'isomorphic-unfetch'
import Router from 'next/router'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IChat, IDashboardProps, IDashboardState } from './types'

export default class Dashboard extends PureComponent<IDashboardProps, IDashboardState> {
  public state: IDashboardState = {
    adverts: [],
    chats: [],
    currentChat: '',
    currentTabIndex: 0
  }

  public componentDidMount(): void {
    this.getUserSpecificAdverts()
    this.getUserSpecificChats()
  }

  public render(): JSX.Element {
    const { adverts, chats, currentAdvert, currentChat, currentTabIndex } = this.state
    return (
      <>
        <AppBar position="sticky">
          <Tabs value={currentTabIndex} onChange={this.handleChange} indicatorColor="secondary" textColor="inherit" centered>
            <Tab label="Adverts" />
            <Tab label="Messages" />
            <Tab label="User settings" />
          </Tabs>
        </AppBar>
        <div className={styles.dashboard}>
          {currentTabIndex === 0 && (
            <Paper className={styles.dashboardSection}>
              <List className={styles.itemList} component="nav" subheader={<ListSubheader>Adverts</ListSubheader>}>
                <ListItem className={styles.chatListItem} button onClick={(): void => this.createAdvert()}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Create New'} />
                </ListItem>

                <Divider />

                {adverts.length !== 0 &&
                  adverts.map((advert: IAdvert, index: number) => (
                    <ListItem
                      className={styles.chatListItem}
                      key={index}
                      selected={index === currentAdvert}
                      button
                      onClick={(): void => this.selectAdvert(index)}
                    >
                      <ListItemIcon>
                        <SpeakerNotesIcon />
                      </ListItemIcon>
                      <ListItemText primary={advert.description} />
                    </ListItem>
                  ))}
              </List>
              {currentAdvert !== undefined && <EditAdvert key={currentAdvert} advert={adverts[currentAdvert]} />}
            </Paper>
          )}

          {currentTabIndex === 1 &&
            chats.length !== 0 && (
              <Paper className={styles.dashboardSection}>
                <List className={styles.itemList} component="nav" subheader={<ListSubheader>Messages</ListSubheader>}>
                  {chats.map((chat: IChat, index: number) => {
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
            )}
          {currentTabIndex === 2 && <h1>Todo: usersettings</h1>}
        </div>
      </>
    )
  }

  public handleChange = (event: React.ChangeEvent, tabIndex: number): void => {
    event.preventDefault()
    this.setState({ currentTabIndex: tabIndex })
  }

  private startConversation = (currentChat: string): void => {
    this.setState({
      currentChat
    })
  }

  private selectAdvert = (index: number): void => {
    this.setState({
      currentAdvert: index
    })
  }

  private createAdvert = (): void => {
    Router.push('/create')
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
      .then(() => {
        this.setState({ currentAdvert: 0 })
      })
      // tslint:disable-next-line:no-any
      .catch((error: any) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
