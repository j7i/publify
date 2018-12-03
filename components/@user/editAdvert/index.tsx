import UserSpecificContent from '@auth/userSpecificContent'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import AdvertForm from '@user/advertForm'
import Link from 'next/link'
import { PureComponent } from 'react'
import styles from './styles.css'
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
    const { advert } = this.props
    const { initialValues, loading } = this.state

    return (
      <section className={styles.createAdvert}>
        {loading ? (
          <CircularProgress className={styles.loading} />
        ) : initialValues ? (
          <Paper className={styles.form}>
            <UserSpecificContent>
              {(user: firebase.User): JSX.Element => {
                return user ? (
                  <AdvertForm user={user} initialValues={initialValues} documentToUpdate={advert.id} />
                ) : (
                  <>
                    <h1>You need to login first</h1>
                    <Link href="/login">
                      <Button variant="contained" color="primary">
                        Login
                      </Button>
                    </Link>
                  </>
                )
              }}
            </UserSpecificContent>
          </Paper>
        ) : (
          <h1>No such document</h1> // TODO
        )}
      </section>
    )
  }
}
