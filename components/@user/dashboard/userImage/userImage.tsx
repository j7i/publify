import { FirebaseCollection, FirebaseStorage, firestore } from '@config'
import { NotificationSeverity, SnackbarNotification } from '@core'
import { Avatar, CircularProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import classNames from 'classnames'
import firebase from 'firebase'
import { PureComponent } from 'react'
import FileUploader from 'react-firebase-file-uploader'
import { IUserImageProps, IUserImageState } from '../types'
import styles from './userImageStyles.css'

/**
 * Provides functionality to show and upload a userImage
 * {@link https://github.com/fris-fruitig/react-firebase-file-uploader}
 */
export class UserImage extends PureComponent<IUserImageProps, IUserImageState> {
  public state: IUserImageState = {
    isUploading: false,
    progress: 0,
    notification: null
  }

  public handleUploadStart = (): void => this.setState({ isUploading: true, progress: 0 })
  public handleProgress = (progress: number): void => this.setState({ progress })
  public handleUploadError = (error: Error): void => {
    this.setState({ isUploading: false })
    this.setState({
      notification: <SnackbarNotification key={Date.now() + Math.random()} message={error.message} severity={NotificationSeverity.ERROR} />
    })
  }

  public render(): JSX.Element {
    const { userImageURL } = this.props
    const { isUploading, progress, uploadedProfileImageURL } = this.state

    return (
      <div className={styles.userImageArea}>
        <label className={styles.userImageUploadButton}>
          <AddIcon className={classNames(styles.uploadIcon, { [styles.visibleUploadIcon]: !uploadedProfileImageURL && !userImageURL })} />
          <FileUploader
            hidden
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref(FirebaseStorage.PROFILE_IMAGES)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          {isUploading && <CircularProgress className={styles.uploadProgressCircle} variant="static" value={progress} />}
        </label>
        <Avatar className={styles.userImage} src={uploadedProfileImageURL ? uploadedProfileImageURL : userImageURL} />
      </div>
    )
  }
  private handleUploadSuccess = (filename: string): void => {
    this.setState({ progress: 100, isUploading: false })
    firebase
      .storage()
      .ref(FirebaseStorage.PROFILE_IMAGES)
      .child(filename)
      .getDownloadURL()
      .then((url: string) =>
        this.setState(
          {
            uploadedProfileImageURL: url
          },
          () => this.updateUserImageUrl(url)
        )
      )
  }

  /**
   * Committing a batch of writes to update the userImageUrl in all relevant files
   * {@link https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes}
   */
  private updateUserImageUrl = async (url: string): Promise<void> => {
    const { userId } = this.props
    const documentsToUpdate = firestore.batch()
    const userRef = firestore.collection(FirebaseCollection.USERS).doc(userId)

    const showErrorMessage = (error: Error): void => {
      this.setState({
        notification: (
          <SnackbarNotification
            key={Date.now() + Math.random()}
            message={`Something went wrong with uploading your image: ${error.message}`}
            severity={NotificationSeverity.ERROR}
          />
        )
      })
    }

    documentsToUpdate.update(userRef, { imageURL: url })

    firestore
      .collection(FirebaseCollection.CHATS)
      .where('members', 'array-contains', userId)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          let chatRef = firestore.collection(FirebaseCollection.CHATS).doc(doc.id)
          let memberInfos = doc.data().memberInfos

          memberInfos[userId].userImageURL = url
          documentsToUpdate.update(chatRef, { memberInfos })
        })
      })

    firestore
      .collection(FirebaseCollection.ADVERTS)
      .where('userId', '==', userId)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          let advertRef = firestore.collection(FirebaseCollection.ADVERTS).doc(doc.id)
          documentsToUpdate.update(advertRef, { userImageURL: url })
        })
      })
      .then(() => {
        updateUserImages()
      })
      .catch((error: Error) => {
        showErrorMessage(error)
      })

    const updateUserImages = (): void => {
      documentsToUpdate
        .commit()
        .then(() => {
          this.setState({
            notification: (
              <SnackbarNotification key={Date.now() + Math.random()} message={'Successfully updated your image'} severity={NotificationSeverity.SUCCESS} />
            )
          })
        })
        .catch((error: Error) => {
          showErrorMessage(error)
        })
    }
  }
}
