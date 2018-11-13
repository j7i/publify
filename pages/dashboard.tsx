import UserSpecificContent from '@auth/userSpecificContent'
import ErrorBoundary from '@helpers/errorBoundary'
import Button from '@material-ui/core/Button'
import UserDashboard from '@user/dashboard'
import Link from 'next/link'
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
                <Link href="/login">
                  <Button variant="contained" color="primary">
                    Login
                  </Button>
                </Link>
              </>
            )
          }}
        </UserSpecificContent>
      </ErrorBoundary>
    )
  }
}
