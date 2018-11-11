import AdvertDetail from '@advert/advertDetail'
import { IDatailPageProps, IExtendedServerResponse } from '@helpers/types/types'
import 'isomorphic-unfetch'
import { NextContext } from 'next'
import { PureComponent } from 'react'
import ErrorBoundary from '../lib/@helpers/errorBoundary'

export default class Detail extends PureComponent<IDatailPageProps> {
  public static async getInitialProps(context: NextContext): Promise<IDatailPageProps> {
    const { data } = context.res as IExtendedServerResponse
    // const { id } = context.query

    return { data }
  }

  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <AdvertDetail seeking={this.props.data} />
        {/* <pre>{JSON.stringify(this.props.data, null, 2)}</pre> */}
      </ErrorBoundary>
    )
  }
}
