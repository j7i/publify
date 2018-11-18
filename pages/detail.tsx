import AdvertDetail from '@advert/advertDetail'
import { IFirestoreFetch } from '@helpers/firestoreFetch/types'
import { IDatailPageProps } from '@helpers/types/types'
import fetch from 'isomorphic-unfetch'
import { NextContext } from 'next'
import Error from 'next/error'
import { PureComponent } from 'react'
import ErrorBoundary from '../lib/@helpers/errorBoundary'

export default class Detail extends PureComponent<IDatailPageProps> {
  public static async getInitialProps(context: NextContext): Promise<IFirestoreFetch> {
    const { res } = context
    const id = context.query.id as string
    const data = await fetch(`${process.env.BASE_URL}/api/detail/${id}`).then((response: Response) => {
      if (res) {
        res.statusCode = response.status
      }
      return response.json()
    })

    return data ? { data } : {}
  }

  public render(): JSX.Element {
    const { data, statusCode } = this.props
    return <ErrorBoundary>{data.error && statusCode ? <Error statusCode={statusCode} /> : <AdvertDetail seeking={data} />}</ErrorBoundary>
  }
}
