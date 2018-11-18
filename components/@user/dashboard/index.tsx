import AdvertCardElement from '@advert/advertCardElement'
import { ISeeking } from '@advert/advertListElement/types'
import firebase from '@config/firebase/index'
import { FirebaseCollection } from '@config/firebase/types.d'
import 'isomorphic-unfetch'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IDashboardProps, IDashboardState } from './types'

export default class Dashboard extends PureComponent<IDashboardProps, IDashboardState> {
  public state: IDashboardState = {
    seekings: []
  }

  public componentDidMount(): void {
    this.getUserSpecificSeekings()
  }

  public render(): JSX.Element {
    const { seekings } = this.state
    return (
      <section className={styles.dashboard}>
        {seekings !== [] && seekings.map((seeking: ISeeking, index: number) => <AdvertCardElement key={index} withActions seeking={seeking} />)}
      </section>
    )
  }

  private getUserSpecificSeekings = async (): Promise<void> => {
    const firestore = firebase.firestore()
    const { user } = this.props

    // tslint:disable-next-line:no-any
    let seekings: any[] = []
    firestore
      .collection(FirebaseCollection.SEEKINGS)
      .where('userId', '==', user!.uid)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          seekings.push({ id: doc.id, ...doc.data() })
        })
      })
      .then(() => {
        this.setState({ seekings })
      })
      // tslint:disable-next-line:no-any
      .catch((error: any) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
