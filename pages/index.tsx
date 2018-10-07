import Button from '@core/button'
import ErrorBoundary from '@helpers/errorBoundary'
import PageHeader from '@layout/pageHeader'
import { PureComponent } from 'react'

export default class Index extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <PageHeader />
        <Button type="link" target="/login">
          Login
        </Button>
      </ErrorBoundary>
    )
  }
}
