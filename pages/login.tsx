import ErrorBoundary from '@helpers/errorBoundary'
import SignIn from 'components/@auth/signIn'
import { PureComponent } from 'react'

export default class Login extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <SignIn />
      </ErrorBoundary>
    )
  }
}
