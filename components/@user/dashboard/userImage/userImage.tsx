import { FirebaseCollection, FirebaseStorage, firestore } from '@config'
import { CircularProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import classNames from 'classnames'
import firebase from 'firebase'
import { PureComponent } from 'react'
import FileUploader from 'react-firebase-file-uploader'
import { IUserImageProps, IUserImageState } from '../types'
import styles from './userImageStyles.css'

export class UserImage extends PureComponent<IUserImageProps, IUserImageState> {
  public state: IUserImageState = {
    isUploading: false,
    progress: 0
  }

  public handleUploadStart = (): void => this.setState({ isUploading: true, progress: 0 })
  public handleProgress = (progress: number): void => this.setState({ progress })
  public handleUploadError = (error: Error): void => {
    this.setState({ isUploading: false })
    // tslint:disable-next-line:no-console
    console.error(error)
  }

  public render(): JSX.Element {
    const { userImageURL } = this.props
    const { isUploading, progress, uploadedProfileImageURL } = this.state

    // file-uploader:
    // https://github.com/fris-fruitig/react-firebase-file-uploader

    return (
      <div className={styles.userImageArea}>
        <label className={styles.userImageUploadButton}>
          <AddIcon className={classNames(styles.uploadIcon, { [styles.visibleUploadIcon]: !uploadedProfileImageURL })} />
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
        <img className={styles.userImage} src={uploadedProfileImageURL ? uploadedProfileImageURL : userImageURL} />
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

  // batched writes:
  // https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes

  private updateUserImageUrl = async (url: string): Promise<void> => {
    const { userId } = this.props
    const documentsToUpdate = firestore.batch()
    const userRef = firestore.collection(FirebaseCollection.USERS).doc(userId)

    documentsToUpdate.update(userRef, { imageURL: url })

    firestore
      .collection(FirebaseCollection.CHATS)
      .where('members', 'array-contains', userId)
      .get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
          let chatRef = firestore.collection(FirebaseCollection.CHATS).doc(doc.id)
          let memberInfos = {}
          memberInfos[userId] = { userImageURL: url }
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
        documentsToUpdate.commit().then(() => {
          // TODO: Notification - your adverts now have an image
          // tslint:disable-next-line:no-console
          console.log('batch commited to update userImageURLs')
        })
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error adding userImage: ', error)
      })
  }
}
