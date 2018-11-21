import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'
import MoreVert from '@material-ui/icons/MoreVert'
import Send from '@material-ui/icons/Send'
import classNames from 'classnames'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IChatProps, IChatState } from './types'

export default class Chat extends PureComponent<IChatProps, IChatState> {
  public render(): JSX.Element {
    const {} = this.props

    return (
      <section className={styles.chat}>
        <div className={styles.chatInner}>
          <div className={styles.header}>
            <div className={styles.orientation}>
              <IconButton color="inherit">
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" component="h2" color="inherit">
                Joe Woe
              </Typography>
            </div>
            <IconButton aria-haspopup="true" color="inherit">
              <MoreVert />
            </IconButton>
          </div>
          <div className={styles.conversation}>
            <div className={classNames(styles.messages, styles.others)}>
              <div className={styles.text}>
                Hey Joe, nice to have you around.
                <span className={styles.time}>17:53</span>
              </div>
              <div className={styles.text}>
                What should we chat about?.
                <span className={styles.time}>17:54</span>
              </div>
            </div>
            <div className={classNames(styles.messages, styles.self)}>
              <div className={styles.text}>
                About engineering chats?
                <span className={styles.time}>17:53</span>
              </div>
            </div>
          </div>
          <div className={styles.trigger}>
            <input type="text" placeholder="Write a message" />
            <IconButton color="primary">
              <Send />
            </IconButton>
          </div>
        </div>
      </section>
    )
  }
}
