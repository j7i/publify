import ErrorBoundary from '@helpers/errorBoundary'
import UserDashboard from '@user/dashboard'
import { PureComponent } from 'react'

export default class Dashboard extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <UserDashboard />
      </ErrorBoundary>
    )
  }
}
