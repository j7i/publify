import { UserSpecificContent } from '@auth'
import { ErrorBoundary } from '@helpers'
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
