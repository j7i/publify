import firebase from 'firebase'
import 'isomorphic-unfetch'
import { PureComponent } from 'react'
import styles from './styles.css'
import TestDataForm from './testDataForm'
import { IDashboardProps, IDashboardState, IDemand } from './types'

export default class Dashboard extends PureComponent<IDashboardProps, IDashboardState> {
  public state: IDashboardState = {
    demands: []
  }

  public componentDidMount(): void {
    this.getUserSpecificSeekings()
  }

  public render(): JSX.Element {
    const { user } = this.props
    const { demands } = this.state
    return (
      <div className={styles.devTestAre}>
        {user && (
          <div className={styles.testWrapper}>
            <div className={styles.testUserData}>
              {demands !== [] &&
                demands.map((demand: IDemand, index: number) => (
                  <div key={index}>
                    <h6>{demand.id}</h6>
                    <h6>{demand.userId}</h6>
                    <div>
                      {demand.categories.map((categorie: string, i: number) => (
                        <span key={i}>{categorie}</span>
                      ))}
                    </div>
                    <p>{demand.description}</p>
                    <p>{demand.published && `I'm public`}</p>
                  </div>
                ))}
            </div>
            <div className={styles.testForm}>
              <TestDataForm user={user} />
            </div>
          </div>
        )}
      </div>
    )
  }

  private getUserSpecificSeekings = async (): Promise<void> => {
    const firestore = firebase.firestore()
    const { user } = this.props

    // tslint:disable-next-line:no-any
    let demands: any[] = []
    firestore
      .collection('demands')
      .where('userId', '==', user!.uid)
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
