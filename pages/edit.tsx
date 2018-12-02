import ErrorBoundary from '@helpers/errorBoundary'
import { IEditPageProps } from '@helpers/types/types'
import EditSeeking from '@user/editSeeking'
import { NextContext } from 'next'
import { PureComponent } from 'react'

export default class Detail extends PureComponent<IEditPageProps> {
  public static async getInitialProps({ query }: NextContext): Promise<IEditPageProps> {
    const id = query.id as string

    const advert = await fetch(`${process.env.BASE_URL}/api/detail/${id}`).then((response: Response) => response.json())

    return { advert }
  }

  public render(): JSX.Element {
    const { advert } = this.props
    return <ErrorBoundary>{advert && <EditSeeking advert={advert} />}</ErrorBoundary>
  }
}
