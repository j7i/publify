import { Chat } from '@communication/chat'
import { FirebaseCollection, firestore } from '@config'
import { NotificationSeverity, SnackbarNotification } from '@core'
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  Toolbar
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'
import classNames from 'classnames'
import Link from 'next/link'
import { Fragment, PureComponent, ReactNode } from 'react'
import styles from './messengerStyles.css'
import { IChat, IMessengerProps, IMessengerState } from './types'

export class Messenger extends PureComponent<IMessengerProps, IMessengerState> {
  public state: IMessengerState = {
    chats: [],
    currentChat: undefined,
    notification: null
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
        {chats.length !== 0 ? (
          <>
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
              {chats.map((chat: IChat, index: number) => {
                const chatPartnerId = chat.members.filter((member: string) => member !== user.uid)
                const { name: chatPartnerFullName, userImageURL: chatPartnerImageURL } = chat.memberInfos[chatPartnerId[0]]
                const { id, advertTitle } = chat
                return (
                  <Fragment key={index}>
                    <ListItem className={styles.chatListItem} key={index} selected={id === currentChat} button onClick={(): void => this.startConversation(id)}>
                      <ListItemIcon>{chatPartnerImageURL ? <Avatar alt={chatPartnerFullName} src={chatPartnerImageURL} /> : <AccountCircle />}</ListItemIcon>
                      <ListItemText primary={chatPartnerFullName} secondary={advertTitle} />
                      <ListItemSecondaryAction>
                        <Link href={`/detail/${chat.advertId}`}>
                          <IconButton aria-label="Delete">
                            <OpenInBrowserIcon />
                          </IconButton>
                        </Link>
                      </ListItemSecondaryAction>
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
          </>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptystateItems}>
              <h2>You actually have no active conversations.</h2>
              <Link href="/">
                <Button color="primary" variant="contained">
                  Find an advert
                </Button>
              </Link>
            </div>
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
