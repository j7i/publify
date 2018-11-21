import ErrorBoundary from '@helpers/errorBoundary'
import CreateSeeking from '@user/createSeeking'
import { PureComponent } from 'react'

export default class Login extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <CreateSeeking />
      </ErrorBoundary>
    )
  }
}
