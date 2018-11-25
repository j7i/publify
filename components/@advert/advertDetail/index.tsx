import AdvertCardElement from '@advert/advertCardElement'
import Chat from '@communication/chat'
import Button from '@material-ui/core/Button'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertDetailProps, IAdvertDetailState } from './types'

export default class AdvertDetail extends PureComponent<IAdvertDetailProps, IAdvertDetailState> {
  public state: IAdvertDetailState = {
    isRequesting: false
  }

  public startConversation = (): void => {
    this.setState({
      isRequesting: true
    })
  }

  public render(): JSX.Element {
    const { seeking } = this.props
    const { isRequesting } = this.state

    return (
      <div className={styles.detailView}>
        <AdvertCardElement seeking={seeking} />
        {!isRequesting && (
          <Button variant="contained" color="primary" onClick={this.startConversation}>
            Start conversation
          </Button>
        )}
        {isRequesting && seeking.id && <Chat seeking={seeking.id} />}
      </div>
    )
  }
}
