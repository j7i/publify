import { SignIn } from '@auth'
import ErrorBoundary from '@helpers/errorBoundary'
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
