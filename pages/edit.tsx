import { IEditPageProps } from '@helpers/types/types'
import EditSeeking from '@user/editSeeking'
import { NextContext } from 'next'
import { PureComponent } from 'react'
import ErrorBoundary from '../lib/@helpers/errorBoundary'

export default class Detail extends PureComponent<IEditPageProps> {
  public static async getInitialProps(context: NextContext): Promise<IEditPageProps> {
    const id = context.query.id as string

    return { id }
  }

  public render(): JSX.Element {
    const { id } = this.props
    return <ErrorBoundary>{id && <EditSeeking id={id} />}</ErrorBoundary>
  }
}
