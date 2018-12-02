import AdvertDetail from '@advert/advertDetail'
import ErrorBoundary from '@helpers/errorBoundary'
import { IDatailPageProps } from '@helpers/types/types'
import { NextContext } from 'next'
import { PureComponent } from 'react'

export default class Detail extends PureComponent<IDatailPageProps> {
  public static async getInitialProps(context: NextContext): Promise<IDatailPageProps> {
    const id = context.query.id as string

    return { id }
  }

  public render(): JSX.Element {
    const { id } = this.props

    return <ErrorBoundary>{id ? <AdvertDetail advertId={id} /> : <h1>Seeking not found.</h1>}</ErrorBoundary>
  }
}
