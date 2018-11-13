import AdvertDetail from '@advert/advertDetail'
import { firestoreFetch } from '@helpers/firestoreFetch'
import { IFirestoreFetch } from '@helpers/firestoreFetch/types'
import { IDatailPageProps } from '@helpers/types/types'
import { NextContext } from 'next'
import { PureComponent } from 'react'
import ErrorBoundary from '../lib/@helpers/errorBoundary'

export default class Detail extends PureComponent<IDatailPageProps> {
  public static async getInitialProps(context: NextContext): Promise<IFirestoreFetch | boolean> {
    const id = context.query.id as string

    if (id) {
      id.toString()
      return firestoreFetch('seekings', id)
    }

    return false
  }

  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        {this.props.data && <AdvertDetail seeking={this.props.data.fields} />}
        <pre>{JSON.stringify(this.props.data, null, 2)}</pre>
      </ErrorBoundary>
    )
  }
}
