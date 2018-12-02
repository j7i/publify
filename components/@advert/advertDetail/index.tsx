import AdvertCardElement from '@advert/advertCardElement'
import Chat from '@communication/chat'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertDetailProps, IAdvertDetailState } from './types'

export default class AdvertDetail extends PureComponent<IAdvertDetailProps, IAdvertDetailState> {
  public state: IAdvertDetailState = {
    isChatting: false
  }

  public startConversation = (): void => {
    this.setState({
      isChatting: true
    })
  }

  public componentDidMount(): void {
    const { advert } = this.props
    this.setState({
      seeking: { ...advert }
    })
  }

  public render(): JSX.Element {
    const { seeking, isChatting } = this.state

    return (
      <div className={styles.detailView}>
        {seeking && isChatting ? (
          <Chat advertId={seeking.id} advertOwnerId={seeking.userId} />
        ) : seeking ? (
          <>
            <AdvertCardElement seeking={seeking} />
            <Button variant="contained" color="primary" onClick={this.startConversation}>
              Start conversation
            </Button>
          </>
        ) : (
          <CircularProgress className={styles.loading} />
        )}
      </div>
    )
  }
}
