import { PureComponent, ReactNode } from 'react'
import ChatConversation from './conversation'
import ChatHeader from './header'
import styles from './styles.css'
import ChatTrigger from './trigger'
import { IChatViewProps } from './types'

export default class ChatView extends PureComponent<IChatViewProps> {
  public render(): ReactNode {
    const { message, messages, loading, handleChange, sendMessage, loggedInUserId } = this.props.chatRenderProps

    let fetchedMessages
    if (messages) {
      fetchedMessages = messages
    }

    return (
      <section className={styles.chat}>
        <div className={styles.chatInner}>
          <ChatHeader />
          <ChatConversation loading={loading} fetchedMessages={fetchedMessages} loggedInUserId={loggedInUserId} />
          <ChatTrigger message={message} handleChange={handleChange} sendMessage={sendMessage} />
        </div>
      </section>
    )
  }
}
