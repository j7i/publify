import AdvertListElement from '@advert/advertListElement'
import { IDemand } from '@advert/advertListElement/types'
import ErrorBoundary from '@helpers/errorBoundary'
import PageHeader from '@layout/pageHeader'
import { IDashboardState } from '@user/dashboard/types'
import firebase from 'firebase'
import { PureComponent } from 'react'

export default class Index extends PureComponent {
  public state: IDashboardState = {
    demands: []
  }

  public componentDidMount(): void {
    this.getUserSpecificSeekings()
  }

  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <PageHeader />
        {this.state.demands !== [] && this.state.demands.map((demand: IDemand, index: number) => <AdvertListElement key={index} demand={demand} />)}
      </ErrorBoundary>
    )
  }

  private getUserSpecificSeekings = async (): Promise<void> => {
    const firestore = firebase.firestore()

    // tslint:disable-next-line:no-any
    let demands: any[] = []
    firestore
      .collection('demands')
      .where('published', '==', true)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          demands.push({ id: doc.id, ...doc.data() })
        })
      })
      .then(() => {
        this.setState({ demands })
      })
  }
}
