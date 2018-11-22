import ChatController from '@communication/chatController'
import { IChatRenderProps, IMessage } from '@communication/chatController/types'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'
import MoreVert from '@material-ui/icons/MoreVert'
import Send from '@material-ui/icons/Send'
import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { IChatProps, IChatState } from './types'

export default class Chat extends PureComponent<IChatProps, IChatState> {
  public render(): JSX.Element {
    const messages: IMessage[] = [
      {
        author: 'dksufh8e9hdsas92',
        date: 1542922601330,
        message: 'Hey Joe, nice to have you around.'
      }
    ]

    return (
      <ChatController messages={messages}>
        {(chatRenderProps: IChatRenderProps): ReactNode => {
          const { sendMessage, handleChange } = chatRenderProps
          const fetchedMessages = chatRenderProps.messages
          return (
            <section className={styles.chat}>
              <div className={styles.chatInner}>
                <div className={styles.header}>
                  <div className={styles.orientation}>
                    <IconButton color="inherit">
                      <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" component="h2" color="inherit">
                      Joe Woe
                    </Typography>
                  </div>
                  <IconButton aria-haspopup="true" color="inherit">
                    <MoreVert />
                  </IconButton>
                </div>
                <div className={styles.conversation}>
                  {fetchedMessages &&
                    fetchedMessages.map((message: IMessage, index: number) => (
                      <div key={index} className={classNames(styles.messages, styles.others)}>
                        <div className={styles.text}>
                          {message.message}
                          <span className={styles.time}>{message.date}</span>
                        </div>
                      </div>
                    ))}
                  <div className={classNames(styles.messages, styles.self)}>
                    <div className={styles.text}>
                      About engineering chats?
                      <span className={styles.time}>17:53</span>
                    </div>
                  </div>
                </div>
                <form className={styles.trigger} onSubmit={sendMessage}>
                  <input type="text" placeholder="Write a message" onChange={handleChange} />
                  <IconButton color="primary" type="submit">
                    <Send />
                  </IconButton>
                </form>
              </div>
            </section>
          )
        }}
      </ChatController>
    )
  }
}
