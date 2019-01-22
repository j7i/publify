import { Chat } from '@communication/chat'
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
import { IChat, IMessengerViewProps } from './types'

export class MessengerView extends PureComponent<IMessengerViewProps> {
  public render(): ReactNode {
    const { chats, currentChat, clearCurrentConversation } = this.props.renderProps

    return (
      <Paper className={styles.messenger}>
        <div className={classNames(styles.messengerAppBar, { [styles.active]: currentChat })}>
          <AppBar>
            <Toolbar>
              {currentChat ? (
                <>
                  <IconButton color="inherit" aria-label="Back" onClick={clearCurrentConversation}>
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
            {this.renderChatList()}
            {currentChat && (
              <div className={classNames(styles.messengerChatArea, styles.active)}>
                <Chat chatId={currentChat} key={currentChat} />
              </div>
            )}
          </>
        ) : (
          this.renderEmptyState()
        )}
      </Paper>
    )
  }

  private renderChatList = (): ReactNode => {
    const { currentChat, chats, user, startConversation } = this.props.renderProps

    return (
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
              <ListItem className={styles.chatListItem} key={index} selected={id === currentChat} button onClick={(): void => startConversation(id)}>
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
    )
  }

  private renderEmptyState = (): ReactNode => (
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
  )
}
