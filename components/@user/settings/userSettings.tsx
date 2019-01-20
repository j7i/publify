import { handleLogout } from '@auth'
import { firebaseApp } from '@config'
import { Form, IFormChildProps, Input, NotificationSeverity, SnackbarNotification } from '@core'
import { Button } from '@material-ui/core'
import { UserImage } from '@user/dashboard/userImage/userImage'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IUserSettingsProps, IUserSettingsState, IUserSettingsValues } from './types'

export class UserSettings extends PureComponent<IUserSettingsProps, IUserSettingsState> {
  public state: IUserSettingsState = {
    notification: null
  }

  public render(): JSX.Element {
    const { id, imageURL } = this.props.userInfo
    const { firstName, lastName, email } = this.props.userInfo
    const initialValues = { firstName, lastName, email }

    const { notification } = this.state

    return (
      <section className={styles.userSettings}>
        <div className={styles.userInfo}>
          <UserImage userId={id} userImageURL={imageURL} />
          <Form onSubmit={this.handleSubmit} className={styles.settingsForm} initialValues={initialValues}>
            {(formChildProps: IFormChildProps): JSX.Element => (
              <>
                <Input type={'text'} name="firstName" label={'Firstname'} formChildProps={formChildProps} />
                <Input type={'text'} name="lastName" label={'Lastname'} formChildProps={formChildProps} />
                <Input type={'email'} name="email" label={'Email'} formChildProps={formChildProps} />
                <Button className={styles.settingsSubmit} variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </>
            )}
          </Form>
        </div>
        <hr className={styles.divider} />
        <div className={styles.accountActions}>
          <Button className={styles.signInUpLogoutButton} variant="text" color="default" type="button" onClick={this.deleteUser}>
            Delete your account
          </Button>
          <Button className={styles.signInUpLogoutButton} variant="text" color="primary" type="button" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        {notification && notification}
      </section>
    )
  }

  private handleSubmit = async (values: IUserSettingsValues): Promise<void> => {
    const { firstName, lastName, email } = values
    const firestore = firebaseApp.firestore()

    const updateMail = (): Promise<void> | undefined => {
      if (email !== firebaseApp.auth().currentUser!.email) {
        return this.updateEmail(email)
      } else {
        Promise.resolve()
      }
    }

    await updateMail()

    firestore
      .collection('users')
      .doc(this.props.userInfo.id)
      .update({
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        initials: firstName[0] + lastName[0]
      })
      .then(() => {
        this.setState({
          notification: <SnackbarNotification key={Date.now() + Math.random()} message={'Updated successfully'} severity={NotificationSeverity.SUCCESS} />
        })
      })
      .catch((error: firebase.auth.Error) => {
        this.setState({
          notification: <SnackbarNotification key={Date.now() + Math.random()} message={error.message} severity={NotificationSeverity.ERROR} />
        })
      })
  }

  private updateEmail = async (email: string): Promise<void> => {
    const user = firebaseApp.auth().currentUser

    if (user) {
      user.updateEmail(email).catch((error: Error) => {
        this.setState({
          notification: <SnackbarNotification key={Date.now() + Math.random()} message={error.message} severity={NotificationSeverity.ERROR} />
        })
      })
    } else {
      throw new Error('Something went wrong. Please reload your browser.')
    }
  }

  private deleteUser = async (): Promise<void> => {
    const user = firebaseApp.auth().currentUser

    if (user) {
      user
        .delete()
        .then(() => {
          this.setState({
            notification: (
              <SnackbarNotification key={Date.now() + Math.random()} message={'User deleted successfully'} severity={NotificationSeverity.SUCCESS} />
            )
          })
        })
        .catch((error: Error) => {
          this.setState({
            notification: <SnackbarNotification key={Date.now() + Math.random()} message={error.message} severity={NotificationSeverity.ERROR} />
          })
        })
    }
  }
}
