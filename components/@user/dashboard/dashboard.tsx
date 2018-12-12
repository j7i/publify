import firebase from '@config/firebase/index'
import { FirebaseCollection } from '@config/firebase/types.d'
import { AdvertType } from '@helpers/types/types.d'
import { Tab, Tabs } from '@material-ui/core'
import 'isomorphic-unfetch'
import { PureComponent } from 'react'
import { CreateAdvert } from './advertHandling/createAdvert'
import { UpdateAdvert } from './advertHandling/updateAdvert'
import styles from './dashboardStyles.css'
import { IDashboardProps, IDashboardState } from './types'

export class Dashboard extends PureComponent<IDashboardProps, IDashboardState> {
  public state: IDashboardState = {
    currentTabIndex: 0
  }

  public componentDidMount(): void {
    this.getUserSpecificAdverts()
  }

  public render(): JSX.Element {
    const { myDemand, myOffer, currentTabIndex } = this.state
    const { user } = this.props

    return (
      <>
        <div className={styles.dashboard}>
          <section className={styles.dashboardSection}>
            <div className={styles.myAdvert}>
              <div className={styles.header} />
              <div className={styles.person}>
                <span className={styles.profileImage} />
                <div className={styles.personDetails}>
                  <h2 className={styles.name}>Rachel Rose</h2>
                  {/* <h3 className={styles.adress}>Some fancy Adress, 8000 Zurich</h3> */}
                </div>
                <nav className={styles.navigation}>
                  <Tabs value={currentTabIndex} onChange={this.handleChange} indicatorColor="primary" textColor="inherit" centered>
                    <Tab label="My Demand" />
                    <Tab label="My Offer" />
                  </Tabs>
                </nav>
              </div>
              {currentTabIndex === 0 &&
                (myDemand !== undefined ? (
                  <UpdateAdvert key={myDemand.id} user={user} advert={myDemand} />
                ) : (
                  <CreateAdvert user={user} advertType={AdvertType.DEMAND} />
                ))}
              {currentTabIndex === 1 &&
                (myOffer !== undefined ? (
                  <UpdateAdvert key={myOffer.id} user={user} advert={myOffer} />
                ) : (
                  <CreateAdvert user={user} advertType={AdvertType.OFFER} />
                ))}
            </div>
          </section>
        </div>
      </>
    )
  }

  public handleChange = (event: React.ChangeEvent, tabIndex: number): void => {
    event.preventDefault()
    this.setState({ currentTabIndex: tabIndex })
  }

  private getUserSpecificAdverts = async (): Promise<void> => {
    const firestore = firebase.firestore()
    const { user } = this.props

    // tslint:disable:no-any
    let demands: any
    let offers: any
    firestore
      .collection(FirebaseCollection.ADVERTS)
      .where('userId', '==', user!.uid)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          if (doc.data().type === AdvertType.DEMAND) {
            demands = { id: doc.id, ...doc.data() }
          } else if (doc.data().type === AdvertType.OFFER) {
            offers = { id: doc.id, ...doc.data() }
          }
        })
      })
      .then(() => {
        this.setState({
          myDemand: demands,
          myOffer: offers
        })
      })
      .catch((error: any) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
