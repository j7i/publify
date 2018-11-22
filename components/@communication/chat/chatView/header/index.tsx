import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'
import MoreVert from '@material-ui/icons/MoreVert'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'

export default class ChatHeader extends PureComponent {
  public render(): ReactNode {
    return (
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
    )
  }
}
