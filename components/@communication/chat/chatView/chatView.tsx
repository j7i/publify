import { IChatViewProps } from '@communication/chat/types'
import { PureComponent, ReactNode } from 'react'
import { ChatConversation } from './chatConversation/chatConversation'
// import { ChatHeader } from './chatHeader'
import { ChatTrigger } from './chatTrigger'
import styles from './chatViewStyles.css'

export class ChatView extends PureComponent<IChatViewProps> {
  public render(): ReactNode {
    const { message, messages, loading, handleChange, sendMessage, loggedInUserId } = this.props.chatViewRenderProps

    let fetchedMessages
    if (messages) {
      fetchedMessages = messages
    }

    return (
      <section className={styles.chat}>
        <div className={styles.chatInner}>
          <ChatConversation loading={loading} fetchedMessages={fetchedMessages} loggedInUserId={loggedInUserId} />
          <ChatTrigger message={message} handleChange={handleChange} sendMessage={sendMessage} />
        </div>
      </section>
    )
  }
}
