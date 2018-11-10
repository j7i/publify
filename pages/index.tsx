import AdvertListElement from '@advert/advertListElement'
import { IDemand } from '@advert/advertListElement/types'
import ErrorBoundary from '@helpers/errorBoundary'
import PageHeader from '@layout/pageHeader'
import Button from '@material-ui/core/Button'
import { IDashboardState } from '@user/dashboard/types'
import firebase from 'firebase'
import { PureComponent } from 'react'

class Index extends PureComponent {
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
        <Button variant="contained" color="secondary">
          Material-UI Button
        </Button>
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

export default Index
