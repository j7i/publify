import CreateSeeking from '@user/createSeeking'
import { PureComponent } from 'react'
import ErrorBoundary from '../lib/@helpers/errorBoundary'

export default class Login extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <CreateSeeking />
      </ErrorBoundary>
    )
  }
}
