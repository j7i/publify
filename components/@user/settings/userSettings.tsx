import { handleLogout } from '@auth'
import { firebaseApp } from '@config'
import { Form, IFormChildProps, Input } from '@core'
import { Button } from '@material-ui/core'
import { UserImage } from '@user/dashboard/userImage/userImage'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IUserSettingsProps, IUserSettingsState, IUserSettingsValues } from './types'

export class UserSettings extends PureComponent<IUserSettingsProps> {
  public state: IUserSettingsState = {
    firstName: this.props.userInfo.firstName,
    lastName: this.props.userInfo.lastName
  }

  public render(): JSX.Element {
    const { id, imageURL } = this.props.userInfo
    const { firstName, lastName, email } = this.props.userInfo
    const initialValues = { firstName, lastName, email }

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
          <Button className={styles.signInUpLogoutButton} variant="flat" color="primary" type="button" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>
    )
  }

  private handleSubmit = async (values: IUserSettingsValues): Promise<void> => {
    const { firstName, lastName, email } = values
    const firestore = firebaseApp.firestore()

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
        // TODO: Log successfull update from userName
        if (email !== firebaseApp.auth().currentUser!.email) {
          this.updateEmail(email)
          // tslint:disable-next-line:no-console
          console.log('new: ', email, 'old: ', this.props.userInfo.email)
        }
      })
      .catch((error: firebase.auth.Error) => {
        // TODO: Log error
        // tslint:disable-next-line:no-console
        console.log(error)
      })
  }

  private updateEmail = async (email: string): Promise<void> => {
    const user = firebaseApp.auth().currentUser

    if (user) {
      user
        .updateEmail(email)
        .then(() => {
          // Update successful.
          // tslint:disable-next-line:no-console
          console.log('Updated email')
        })
        .catch((error: Error) => {
          // TODO:
          // tslint:disable-next-line:no-console
          console.log(error)
        })
    }
  }

  private deleteUser = async (): Promise<void> => {
    const user = firebaseApp.auth().currentUser

    if (user) {
      user
        .delete()
        .then(() => {
          // User deleted.
        })
        .catch((error: Error) => {
          // TODO: Log error
          // tslint:disable-next-line:no-console
          console.log(error)
        })
    }
  }
}
