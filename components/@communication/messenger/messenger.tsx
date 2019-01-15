import { Chat } from '@communication/chat'
import { FirebaseCollection } from '@config'
import { AppBar, Avatar, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Toolbar } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import classNames from 'classnames'
import firebase from 'firebase'
import { Fragment, PureComponent, ReactNode } from 'react'
import styles from './messengerStyles.css'
import { IChat, IMessengerProps, IMessengerState } from './types'

export class Messenger extends PureComponent<IMessengerProps, IMessengerState> {
  public state: IMessengerState = {
    chats: [],
    currentChat: undefined
  }

  public componentDidMount(): void {
    this.getUserSpecificChats()
  }

  public render(): ReactNode {
    const { chats, currentChat } = this.state
    const { user } = this.props

    return (
      <Paper className={styles.messenger}>
        <div className={classNames(styles.messengerAppBar, { [styles.active]: currentChat })}>
          <AppBar>
            <Toolbar>
              {currentChat ? (
                <>
                  <IconButton color="inherit" aria-label="Back" onClick={this.clearCurrentConversation}>
                    <KeyboardBackspaceIcon />
                  </IconButton>
                  Back
                  <div className={styles.grow} />
                </>
              ) : (
                <>Messages</>
              )}
            </Toolbar>
          </AppBar>
        </div>
        <List
          className={classNames(styles.messengerChatList, { [styles.active]: !currentChat })}
          component="nav"
          subheader={
            <div>
              <ListSubheader className={styles.chatListSubheader}>Messages</ListSubheader>
              <Divider />
            </div>
          }
        >
          {chats.length !== 0 &&
            chats.map((chat: IChat, index: number) => {
              const chatPartnerId = chat.members.filter((member: string) => member !== user.uid)
              const { name: chatPartnerFullName, userImageURL: chatPartnerImageURL } = chat.memberInfos[chatPartnerId[0]]
              const { id, advertTitle } = chat
              return (
                <Fragment key={index}>
                  <ListItem className={styles.chatListItem} key={index} selected={id === currentChat} button onClick={(): void => this.startConversation(id)}>
                    <ListItemIcon>{chatPartnerImageURL ? <Avatar alt={chatPartnerFullName} src={chatPartnerImageURL} /> : <AccountCircle />}</ListItemIcon>
                    <ListItemText primary={chatPartnerFullName} secondary={advertTitle} />
                  </ListItem>
                  <Divider />
                </Fragment>
              )
            })}
        </List>
        {currentChat && (
          <div className={classNames(styles.messengerChatArea, styles.active)}>
            <Chat chatId={currentChat} key={currentChat} />
          </div>
        )}
      </Paper>
    )
  }

  private clearCurrentConversation = (): void => {
    this.setState({
      currentChat: undefined
    })
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
        if (window.innerWidth > 991) {
          this.setState({ currentChat: chats[0].id })
        }
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
