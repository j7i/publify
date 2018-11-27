import AdvertCardElement from '@advert/advertCardElement'
import Chat from '@communication/chat'
import { firestore } from '@config/firebase'
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
    const { seekingId } = this.props

    firestore
      .collection('seekings')
      .doc(seekingId)
      .get()
      .then((doc: firebase.firestore.DocumentSnapshot) => {
        if (!doc.exists) {
          // tslint:disable-next-line:no-console
          console.error('No such document!')
        } else {
          let data
          data = doc.data()
          data.id = doc.id
          this.setState({
            seeking: { ...data }
          })
        }
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error(error)
      })
  }

  public render(): JSX.Element {
    const { seeking, isChatting } = this.state

    return (
      <div className={styles.detailView}>
        {seeking && isChatting ? (
          <Chat seekingId={seeking.id} seekingOwnerId={seeking.userId} />
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
