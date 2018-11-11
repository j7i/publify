import AdvertCardElement from '@advert/advertCardElement'
import { ISeeking } from '@advert/advertListElement/types'
import { FirebaseCollection } from '@config/firebase/types.d'
import ErrorBoundary from '@helpers/errorBoundary'
import PageHeader from '@layout/pageHeader'
import { IDashboardState } from '@user/dashboard/types'
import firebase from 'firebase'
import { PureComponent } from 'react'

export default class Index extends PureComponent {
  public state: IDashboardState = {
    seekings: []
  }

  public componentDidMount(): void {
    this.getUserSpecificSeekings()
  }

  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <PageHeader />
        {this.state.seekings !== [] && this.state.seekings.map((seeking: ISeeking, index: number) => <AdvertCardElement key={index} seeking={seeking} />)}
      </ErrorBoundary>
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
