import CircularProgress from '@material-ui/core/CircularProgress'
import { PureComponent } from 'react'
import styles from '../dashboardStyles.css'
import { IUpdateAdvertProps, IUpdateAdvertState } from '../types'
import { AdvertForm } from './advertForm/advertForm'

export class UpdateAdvert extends PureComponent<IUpdateAdvertProps, IUpdateAdvertState> {
  public state: IUpdateAdvertState = {
    loading: true
  }

  public componentDidMount(): void {
    const { advert } = this.props

    this.setState({
      initialValues: advert,
      loading: false
    })
  }
  public render(): JSX.Element {
    const { advert, userInfo } = this.props
    const { initialValues, loading } = this.state

    return (
      <section>
        {loading ? (
          <CircularProgress className={styles.loading} />
        ) : initialValues ? (
          <div className={styles.advertFormWrapper}>
            <AdvertForm userInfo={userInfo} initialValues={initialValues} documentToUpdate={advert.id} />
          </div>
        ) : (
          <h1>No such document</h1> // TODO
        )}
      </section>
    )
  }
}
