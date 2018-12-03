import ErrorBoundary from '@helpers/errorBoundary'
import CreateAdvert from '@user/createAdvert'
import { PureComponent } from 'react'

export default class Login extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <CreateAdvert />
      </ErrorBoundary>
    )
  }
}
