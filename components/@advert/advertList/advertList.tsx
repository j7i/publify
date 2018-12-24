import { AdvertCardElement, IAdvert } from '@advert'
import { FirebaseCollection, firestore } from '@config'
import { PureComponent } from 'react'
import { AdvertFilter } from './advertFilter/advertFilter'
import styles from './styles.css'
import { IAdvertListProps, IAdvertListState } from './types'

export class AdvertList extends PureComponent<IAdvertListProps, IAdvertListState> {
  public state: IAdvertListState = {
    filtered: []
  }

  public handleFilter = (categorie: string): void => {
    this.getAdverts(categorie)
  }

  public render(): JSX.Element {
    let { adverts } = this.props

    if (this.state.filtered.length) {
      adverts = this.state.filtered
    }

    return adverts ? (
      <>
        <AdvertFilter handleFilter={this.handleFilter} />
        <section className={styles.advertList}>
          <h1>Public Adverts</h1>
          <section className={styles.advertWrapper}>
            {adverts !== [] && adverts.map((advert: IAdvert, index: number) => <AdvertCardElement key={index} advert={advert} />)}
          </section>
        </section>
      </>
    ) : (
      <>No adverts available</> // TODO
    )
  }

  private getAdverts = (categorie: string): void => {
    // tslint:disable-next-line:no-any
    let adverts: any[] = []
    let advertsRef = firestore.collection(FirebaseCollection.ADVERTS)
    let advertsQuery

    if (categorie === 'Alle') {
      advertsQuery = advertsRef.where('published', '==', true)
    } else {
      advertsQuery = advertsRef.where('published', '==', true).where('categories', 'array-contains', categorie)
    }

    advertsQuery
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          adverts.push({ id: doc.id, ...doc.data() })
        })
      })
      .then(() => {
        this.setState({ filtered: adverts })
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
