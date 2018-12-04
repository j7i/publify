import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import ChatConversation from './conversation'
import ChatHeader from './header'
import styles from './styles.css'
import ChatTrigger from './trigger'
import { IChatViewProps } from './types'

export default class ChatView extends PureComponent<IChatViewProps> {
  public render(): ReactNode {
    const { message, messages, loading, handleChange, sendMessage, loggedInUserId } = this.props.chatRenderProps
    const { displayMode } = this.props

    const isEmbedded = displayMode === 'embedded'
    const isLonely = displayMode === 'lonely'

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
