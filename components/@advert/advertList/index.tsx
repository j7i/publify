import AdvertCardElement from '@advert/advertCardElement'
import { ISeeking } from '@advert/advertListElement/types'
import { FirebaseCollection } from '@config/firebase/types.d'
import firebase from 'firebase'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertListState } from './types'

export default class AdvertList extends PureComponent<{}, IAdvertListState> {
  public state: IAdvertListState = {
    seekings: []
  }

  public componentDidMount(): void {
    this.getUserSpecificSeekings()
  }

  public render(): JSX.Element {
    return (
      <section className={styles.advertList}>
        <h1>Public Seekings</h1>
        <section className={styles.advertWrapper}>
          {this.state.seekings !== [] && this.state.seekings.map((seeking: ISeeking, index: number) => <AdvertCardElement key={index} seeking={seeking} />)}
        </section>
      </section>
    )
  }

  private getUserSpecificSeekings = async (): Promise<void> => {
    const firestore = firebase.firestore()

    // tslint:disable-next-line:no-any
    let seekings: any[] = []
    firestore
      .collection(FirebaseCollection.SEEKINGS)
      .where('published', '==', true)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          seekings.push({ id: doc.id, ...doc.data() })
        })
      })
      .then(() => {
        this.setState({ seekings })
      })
  }
}
