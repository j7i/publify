import UserSpecificContent from '@auth/userSpecificContent'
import ErrorBoundary from '@helpers/errorBoundary'
import { Dashboard } from '@user'
import { PureComponent } from 'react'

export default class DashboardPage extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <UserSpecificContent>
          {(user: firebase.User): JSX.Element => {
            return user && <Dashboard user={user} />
          }}
        </UserSpecificContent>
      </ErrorBoundary>
    )
  }
}
