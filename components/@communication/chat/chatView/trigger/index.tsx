import IconButton from '@material-ui/core/IconButton'
import Send from '@material-ui/icons/Send'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { IChatTriggerProps } from './types'

export default class ChatTrigger extends PureComponent<IChatTriggerProps> {
  public render(): ReactNode {
    const { handleChange, sendMessage, message } = this.props
    return (
      <form className={styles.trigger} onSubmit={sendMessage}>
        <input type="text" placeholder="Write a message" value={message} onChange={handleChange} />
        <IconButton color="primary" type="submit">
          <Send />
        </IconButton>
      </form>
    )
  }
}
