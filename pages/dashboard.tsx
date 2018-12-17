import { UserSpecificContent } from '@auth'
import { ErrorBoundary } from '@helpers'
import { Dashboard } from '@user'
import { PureComponent, ReactNode } from 'react'

export default class DashboardPage extends PureComponent {
  public render(): ReactNode {
    return (
      <ErrorBoundary>
        <UserSpecificContent>
          {(user: firebase.User): ReactNode => {
            return user && <Dashboard user={user} />
          }}
        </UserSpecificContent>
      </ErrorBoundary>
    )
  }
}
