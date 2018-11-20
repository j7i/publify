import AdvertCardElement from '@advert/advertCardElement'
import { ISeeking } from '@advert/advertListElement/types'
import firebase from '@config/firebase/index'
import { FirebaseCollection } from '@config/firebase/types.d'
import { PureComponent } from 'react'
import AdvertListNavigation from './advertListNavigation'
import styles from './styles.css'
import { IAdvertListState } from './types'

export default class AdvertList extends PureComponent<{}, IAdvertListState> {
  public state: IAdvertListState = {
    seekings: [],
    filtered: []
  }

  public componentDidMount(): void {
    this.getUserSpecificSeekings()
  }

  public handleFilter = (categorie: string): void => {
    const seekings = this.state.seekings.filter((seeking: ISeeking) => seeking.categories.includes(categorie) === true)
    this.setState({ filtered: seekings })
  }

  public render(): JSX.Element {
    let { seekings } = this.state

    if (this.state.filtered.length) {
      seekings = this.state.filtered
    }

    return (
      <>
        <AdvertListNavigation handleFilter={this.handleFilter} />
        <section className={styles.advertList}>
          <h1>Public Seekings</h1>
          <section className={styles.advertWrapper}>
            {seekings !== [] && seekings.map((seeking: ISeeking, index: number) => <AdvertCardElement key={index} seeking={seeking} />)}
          </section>
        </section>
      </>
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
