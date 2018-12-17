import { UserSpecificContent } from '@auth'
import { Chat } from '@communication'
import { ChatDisplayMode } from '@communication/chat/types'
import { Button, Chip } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { IUserInfo } from '@user'
import classNames from 'classnames'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { IAdvertDetailProps, IAdvertDetailState } from './types'

export class AdvertDetail extends PureComponent<IAdvertDetailProps, IAdvertDetailState> {
  public state: IAdvertDetailState = {
    isChatting: false
  }

  public startConversation = (): void => {
    this.setState({
      isChatting: true
    })
  }

  public render(): ReactNode {
    const { isChatting } = this.state
    const { advert } = this.props
    const { id, title, categories, description, userId, fullName } = advert

    return (
      <main className={classNames(styles.detailView, { [styles.centered]: !advert })}>
        {advert ? (
          <>
            <div className={styles.primaryContent}>
              <div className={styles.header} />
              <section className={styles.person}>
                <span className={styles.profileImage} />
                <div className={styles.personDetails}>
                  <h2 className={styles.name}>{title}</h2>
                  {/* <address className={styles.adress}>Some fancy Adress, 8000 Zurich</address> */}
                  <div className={styles.categories}>
                    {categories.map((categorie: string, index: number) => (
                      <Chip key={index} className={styles.categorie} label={categorie} variant="outlined" color="primary" />
                    ))}
                  </div>
                </div>
                <div className={styles.categories} />
              </section>
              <section className={styles.content}>
                <div className={styles.description}>{description}</div>

                <div className={styles.callToAction}>
                  {!isChatting && (
                    <UserSpecificContent>
                      {(user: firebase.User, userInfo: IUserInfo): ReactNode | null => {
                        return user && userId !== user.uid ? (
                          <Button variant="contained" color="primary" onClick={this.startConversation}>
                            Write a message
                          </Button>
                        ) : (
                          <Chip label={`This is yours, ${userInfo.firstName}`} variant="default" color="secondary" />
                        )
                      }}
                    </UserSpecificContent>
                  )}
                </div>
              </section>
            </div>
            <div className={styles.secondaryContent}>
              {isChatting && (
                <div className={styles.chatArea}>
                  <Chat advertId={id} advertTitle={title} advertOwnerId={userId} advertOwnerName={fullName} displayMode={ChatDisplayMode.EMBEDDED} />
                </div>
              )}
              <map className={styles.map} />
            </div>
          </>
        ) : (
          <CircularProgress className={styles.loading} />
        )}
      </main>
    )
  }
}
