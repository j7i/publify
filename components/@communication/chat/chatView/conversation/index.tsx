import { IMessage } from '@communication/chat/chatController/types'
import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { IChatConversationProps } from './types'

export default class ChatConversation extends PureComponent<IChatConversationProps> {
  public render(): ReactNode {
    const { fetchedMessages } = this.props

    return (
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
    )
  }
}
