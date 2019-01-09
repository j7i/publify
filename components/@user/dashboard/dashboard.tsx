import { FirebaseCollection, firestore } from '@config'
import { AdvertType } from '@helpers'
import { Tab, Tabs } from '@material-ui/core'
import 'isomorphic-unfetch'
import { PureComponent } from 'react'
import { CreateAdvert } from './advertHandling/createAdvert'
import { UpdateAdvert } from './advertHandling/updateAdvert'
import styles from './dashboardStyles.css'
import { IDashboardProps, IDashboardState } from './types'
import { UserImage } from './userImage/userImage'

export class Dashboard extends PureComponent<IDashboardProps, IDashboardState> {
  public state: IDashboardState = {
    currentTabIndex: 0
  }

  public componentDidMount(): void {
    this.getUserSpecificAdverts()
    this.getUserInfos()
  }

  public render(): JSX.Element {
    const { myDemand, myOffer, currentTabIndex, userInfo } = this.state

    return (
      <div className={styles.dashboard}>
        <section className={styles.dashboardSection}>
          <div className={styles.myAdvert}>
            <div className={styles.myAdvertHeader} />
            <div className={styles.person}>
              {userInfo && <UserImage userId={userInfo.id} userImageURL={userInfo.imageURL} />}
              <div className={styles.personDetails}>
                <h2 className={styles.name}>{userInfo && `${userInfo.firstName} ${userInfo.lastName}`}</h2>
                {/* <h3 className={styles.adress}>Some fancy Adress, 8000 Zurich</h3> */}
              </div>
              <nav className={styles.myAdvertNavigation}>
                <Tabs value={currentTabIndex} onChange={this.handleChange} indicatorColor="primary" textColor="inherit" centered>
                  <Tab label="My Demand" />
                  <Tab label="My Offer" />
                </Tabs>
              </nav>
            </div>
            {currentTabIndex === 0 &&
              userInfo &&
              (myDemand !== undefined ? (
                <UpdateAdvert key={myDemand.id} userInfo={userInfo} advert={myDemand} />
              ) : (
                <CreateAdvert userInfo={userInfo} advertType={AdvertType.DEMAND} />
              ))}
            {currentTabIndex === 1 &&
              userInfo &&
              (myOffer !== undefined ? (
                <UpdateAdvert key={myOffer.id} userInfo={userInfo} advert={myOffer} />
              ) : (
                <CreateAdvert userInfo={userInfo} advertType={AdvertType.OFFER} />
              ))}
          </div>
        </section>
      </div>
    )
  }

  public handleChange = (event: React.ChangeEvent, tabIndex: number): void => {
    event.preventDefault()
    this.setState({ currentTabIndex: tabIndex })
  }

  private getUserInfos = async (): Promise<void> => {
    const { user } = this.props

    firestore
      .collection(FirebaseCollection.USERS)
      .doc(user!.uid)
      .get()
      .then((doc: firebase.firestore.DocumentData) => {
        this.setState({
          userInfo: { id: doc.id, ...doc.data() }
        })
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }

  private getUserSpecificAdverts = async (): Promise<void> => {
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
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding document: ', error)
      })
  }
}
