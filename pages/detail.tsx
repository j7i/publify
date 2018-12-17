import { AdvertDetail } from '@advert'
import { ErrorBoundary, IDatailPageProps } from '@helpers'
import fetch from 'isomorphic-unfetch'
import { NextContext } from 'next'
import { PureComponent, ReactNode } from 'react'

export default class Detail extends PureComponent<IDatailPageProps> {
  public static async getInitialProps({ query }: NextContext): Promise<IDatailPageProps> {
    const id = query.id as string

    const advert = await fetch(`${process.env.BASE_URL}/api/detail/${id}`).then((response: Response) => response.json())

    return { advert }
  }

  public render(): ReactNode {
    const { advert } = this.props

    return <ErrorBoundary>{advert ? <AdvertDetail advert={advert} /> : <h1>Advert not found.</h1>}</ErrorBoundary>
  }
}
