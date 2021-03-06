import { UserSpecificContent } from '@auth'
import { Chat } from '@communication'
import { GoogleMap, MapDisplayMode } from '@core'
import { PathName } from '@layout/navigation/types'
import { AppBar, Avatar, Button, Chip, IconButton, Toolbar } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { IUserInfo } from '@user'
import classNames from 'classnames'
import Link from 'next/link'
import { PureComponent, ReactNode } from 'react'
import styles from './styles.css'
import { IAdvertDetailProps, IAdvertDetailState } from './types'

export class AdvertDetail extends PureComponent<IAdvertDetailProps, IAdvertDetailState> {
  public state: IAdvertDetailState = {
    isChatting: false
  }

  public toggleConversation = (): void => {
    window.location.hash = 'chat'
    this.setState((prevstate: IAdvertDetailState) => {
      return { isChatting: !prevstate.isChatting }
    })
  }

  public render(): ReactNode {
    const { isChatting } = this.state
    const { advert } = this.props
    const { id, title, categories, description, userId, fullName, userImageURL, location } = advert

    return (
      <main className={classNames(styles.detailView, { [styles.centered]: !advert })}>
        {advert ? (
          <>
            {!isChatting && (
              <div className={styles.advertMobileAppBar}>
                <AppBar>
                  <Toolbar>
                    <p className={styles.advertMobileAppBarTitle}>{advert.title}</p>
                  </Toolbar>
                </AppBar>
              </div>
            )}
            <div className={styles.primaryContent}>
              <div className={styles.header} />
              <section className={styles.person}>
                {userImageURL && (
                  <div className={styles.userImageArea}>
                    <Avatar className={styles.userImage} src={userImageURL} />
                  </div>
                )}
                <div className={styles.personDetails}>
                  <h2 className={styles.name}>{fullName}</h2>
                  <div className={styles.categories}>
                    {categories &&
                      categories.map((categorie: string, index: number) => (
                        <Chip key={index} className={styles.categorie} label={categorie} variant="outlined" color="primary" />
                      ))}
                  </div>
                </div>
                <div className={styles.categories} />
              </section>
              <section className={styles.content}>
                <h2>{title}</h2>
                <div className={styles.description}>{description}</div>
                {/* <address className={styles.adress}>Some fancy Adress, 8000 Zurich</address> */}

                <div className={styles.callToAction}>
                  <UserSpecificContent>
                    {(user: firebase.User, userInfo: IUserInfo): ReactNode | null => {
                      return user && userId !== user.uid ? (
                        <Button variant="contained" color="primary" onClick={this.toggleConversation}>
                          {isChatting ? 'Show map' : 'Write a message'}
                        </Button>
                      ) : userInfo ? (
                        <Chip label={`This is yours, ${userInfo.firstName}`} variant="default" color="secondary" />
                      ) : (
                        <Link href={`/${PathName.ACCOUNT}`}>
                          <Button variant="contained" color="primary" onClick={this.toggleConversation}>
                            Login to write a message
                          </Button>
                        </Link>
                      )
                    }}
                  </UserSpecificContent>
                </div>
              </section>
            </div>
            <div className={classNames(styles.secondaryContent, { [styles.secondaryContentActive]: isChatting })}>
              {isChatting ? (
                <div className={styles.chatArea}>
                  <AppBar className={styles.chatAreaAppBar}>
                    <Toolbar>
                      <>
                        <IconButton color="inherit" aria-label="Back" onClick={this.clearCurrentConversation}>
                          <KeyboardBackspaceIcon />
                        </IconButton>
                        Back
                      </>
                    </Toolbar>
                  </AppBar>
                  <Chat advertId={id} advertTitle={title} advertOwnerId={userId} advertOwnerName={fullName} advertOwnerImageURL={userImageURL} />
                </div>
              ) : (
                <GoogleMap displayMode={MapDisplayMode.SINGLE_LOCKED} initialLocation={location} />
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

  private clearCurrentConversation = (): void => {
    this.setState({
      isChatting: false
    })
  }
}
