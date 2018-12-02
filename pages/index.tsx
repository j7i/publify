import AdvertList from '@advert/advertList'
import ErrorBoundary from '@helpers/errorBoundary'
import { IWelcomePageProps } from '@helpers/types/types'
import PageHeader from '@layout/pageHeader'
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
