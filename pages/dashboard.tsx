import UserSpecificContent from '@auth/userSpecificContent'
import Button from '@core/button'
import ErrorBoundary from '@helpers/errorBoundary'
import UserDashboard from '@user/dashboard'
import { PureComponent } from 'react'

export default class Dashboard extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <UserSpecificContent>
          {(user: firebase.User): JSX.Element => {
            return user ? (
              <UserDashboard user={user} />
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
      </ErrorBoundary>
    )
  }
}
