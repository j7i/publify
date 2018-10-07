import { PureComponent } from 'react'
import SignIn from '../components/@auth/signIn'
import ErrorBoundary from '../lib/@helpers/errorBoundary'

export default class Login extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <SignIn />
      </ErrorBoundary>
    )
  }
}
