import { IMessage } from '@communication/chat/chatController/types'
import CircularProgress from '@material-ui/core/CircularProgress'
import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { IChatConversationProps } from './types'

export default class ChatConversation extends PureComponent<IChatConversationProps> {
  public render(): ReactNode {
    const { loading, fetchedMessages, loggedInUser } = this.props

    return (
      <div className={styles.conversation}>
        <div className={styles.scrollable}>
          {loading ? (
            <CircularProgress className={styles.loading} />
          ) : (
            fetchedMessages &&
            fetchedMessages.map((message: IMessage, index: number) => (
              <div
                key={index}
                className={classNames(styles.messages, {
                  [styles.others]: message.uid !== loggedInUser,
                  [styles.self]: message.uid === loggedInUser
                })}
              >
                <div className={styles.text}>
                  {message.content}
                  <span className={styles.time}>{message.date && message.date.seconds}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }
}
