import { IMessage } from '@communication/chat/chatController/types'
import CircularProgress from '@material-ui/core/CircularProgress'
import classNames from 'classnames'
import { createRef, PureComponent, ReactNode, RefObject } from 'react'
import Moment from 'react-moment'
import styles from './styles.css'
import { IChatConversationProps } from './types'

export default class ChatConversation extends PureComponent<IChatConversationProps> {
  private conversationEnd: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()

  public componentDidUpdate(): void {
    const conversationEnd = this.conversationEnd.current!
    conversationEnd.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }

  public render(): ReactNode {
    const { loading, fetchedMessages, loggedInUserId, displayMode } = this.props

    const isEmbedded = displayMode === 'embedded'
    // const isLonely = displayMode === 'lonely'

    return (
      <div
        className={classNames(styles.conversation, {
          [styles.embedded]: isEmbedded,
          [styles.isLoading]: loading
        })}
      >
        {loading ? (
          <CircularProgress className={styles.loadingSpinner} />
        ) : (
          <div className={styles.scrollable}>
            {fetchedMessages &&
              fetchedMessages.map((message: IMessage, index: number) => (
                <div
                  key={index}
                  className={classNames(styles.messages, {
                    [styles.others]: message.uid !== loggedInUserId,
                    [styles.self]: message.uid === loggedInUserId
                  })}
                >
                  <div className={styles.text}>
                    {message.content}
                    <span className={styles.time}>{message.date && <Moment format="HH:mm" unix date={new Date(message.date.seconds)} />}</span>
                  </div>
                </div>
              ))}
            <div ref={this.conversationEnd} />
          </div>
        )}
      </div>
    )
  }
}
