import UserSpecificContent from '@auth/userSpecificContent'
import Button from '@core/button'
import { PureComponent } from 'react'
import styles from './styles.css'
import TestDataForm from './testDataForm'

export default class Dashboard extends PureComponent {
  public render(): JSX.Element {
    return (
      <div className={styles.devTestAre}>
        <UserSpecificContent>
          {// tslint:disable-next-line:no-any
          (user: any): JSX.Element => {
            return user ? (
              <div className={styles.testWrapper}>
                <div className={styles.testUserData}>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
                <div className={styles.testForm}>
                  <TestDataForm />
                </div>
              </div>
            ) : (
              <>
                <h1>You need to login first</h1>
                <Button type="link" target="/login">
                  Login
                </Button>
              </>
            )
          }}
        </UserSpecificContent>
      </div>
    )
  }
}
