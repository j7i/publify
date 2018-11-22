import { PureComponent, ReactNode } from 'react'
import ChatConversation from './conversation'
import ChatHeader from './header'
import styles from './styles.css'
import ChatTrigger from './trigger'
import { IChatViewProps } from './types'

export default class ChatView extends PureComponent<IChatViewProps> {
  public render(): ReactNode {
    const { messages, handleChange, sendMessage } = this.props.chatRenderProps

    let fetchedMessages
    if (messages) {
      fetchedMessages = messages
    }

    return (
      <section className={styles.chat}>
        <div className={styles.chatInner}>
          <ChatHeader />
          <ChatConversation fetchedMessages={fetchedMessages} />
          <ChatTrigger handleChange={handleChange} sendMessage={sendMessage} />
        </div>
      </section>
    )
  }
}
