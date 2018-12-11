import CircularProgress from '@material-ui/core/CircularProgress'
import AdvertForm from '@user/advertForm'
import styles from '@user/createAdvert/styles.css'
import { PureComponent } from 'react'
import editStyles from './styles.css'
import { IEditAdvertProps, IEditAdvertState } from './types'

export default class EditAdvert extends PureComponent<IEditAdvertProps, IEditAdvertState> {
  public state: IEditAdvertState = {
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
    const { advert, user } = this.props
    const { initialValues, loading } = this.state

    return (
      <section className={styles.createAdvert}>
        {loading ? (
          <CircularProgress className={styles.loading} />
        ) : initialValues ? (
          <div className={editStyles.form}>
            <AdvertForm user={user} initialValues={initialValues} documentToUpdate={advert.id} />
          </div>
        ) : (
          <h1>No such document</h1> // TODO
        )}
      </section>
    )
  }
}
