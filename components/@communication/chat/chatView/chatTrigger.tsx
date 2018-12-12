import { IChatTriggerProps } from '@communication/chat/types'
import IconButton from '@material-ui/core/IconButton'
import Send from '@material-ui/icons/Send'
import { PureComponent, ReactNode } from 'react'
import styles from './chatViewStyles.css'

export class ChatTrigger extends PureComponent<IChatTriggerProps> {
  public render(): ReactNode {
    const { handleChange, sendMessage, message } = this.props
    return (
      <form className={styles.chatTrigger} onSubmit={sendMessage}>
        <input type="text" placeholder="Write a message" value={message} onChange={handleChange} />
        <IconButton color="primary" type="submit" disabled={message.length === 0}>
          <Send />
        </IconButton>
      </form>
    )
  }
}
