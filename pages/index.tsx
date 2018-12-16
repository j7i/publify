import { AdvertList } from '@advert'
import { ErrorBoundary, IWelcomePageProps } from '@helpers'
import { PageHeader } from '@layout'
import fetch from 'isomorphic-unfetch'
import { PureComponent } from 'react'

export default class Index extends PureComponent<IWelcomePageProps> {
  public static async getInitialProps(): Promise<IWelcomePageProps> {
    const adverts = await fetch(`${process.env.BASE_URL}/api/adverts`).then((response: Response) => response.json())

    return { adverts }
  }

  public render(): JSX.Element {
    const { adverts } = this.props

    return (
      <ErrorBoundary>
        <PageHeader />
        <AdvertList adverts={adverts} />
      </ErrorBoundary>
    )
  }
}
