import { ChatDisplayMode, IChatViewProps } from '@communication/chat/types'
import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import { ChatConversation } from './chatConversation/chatConversation'
import { ChatHeader } from './chatHeader'
import { ChatTrigger } from './chatTrigger'
import styles from './chatViewStyles.css'

export class ChatView extends PureComponent<IChatViewProps> {
  public render(): ReactNode {
    const { message, messages, loading, handleChange, sendMessage, loggedInUserId } = this.props.chatRenderProps
    const { displayMode } = this.props

    const isEmbedded = displayMode === ChatDisplayMode.EMBEDDED
    const isLonely = displayMode === ChatDisplayMode.LONELY

    let fetchedMessages
    if (messages) {
      fetchedMessages = messages
    }

    return (
      <section
        className={classNames({
          [styles.lonelyChat]: isLonely,
          [styles.embeddedChat]: isEmbedded
        })}
      >
        <div className={styles.chatInner}>
          {isLonely && <ChatHeader />}
          <ChatConversation loading={loading} fetchedMessages={fetchedMessages} loggedInUserId={loggedInUserId} displayMode={displayMode} />
          <ChatTrigger message={message} handleChange={handleChange} sendMessage={sendMessage} />
        </div>
      </section>
    )
  }
}
