import UserSpecificContent from '@auth/userSpecificContent'
import ErrorBoundary from '@helpers/errorBoundary'
import UserDashboard from '@user/dashboard'
import { PureComponent } from 'react'

export default class Dashboard extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <UserSpecificContent>
          {(user: firebase.User): JSX.Element => {
            return user && <UserDashboard user={user} />
          }}
        </UserSpecificContent>
      </ErrorBoundary>
    )
  }
}
