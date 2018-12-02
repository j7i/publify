import UserSpecificContent from '@auth/userSpecificContent'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import SeekingForm from '@user/seekingForm'
import Link from 'next/link'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IEditSeekingProps, IEditSeekingState } from './types'

export default class EditSeeking extends PureComponent<IEditSeekingProps, IEditSeekingState> {
  public state: IEditSeekingState = {
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
      <section className={styles.createSeeking}>
        {loading ? (
          <CircularProgress className={styles.loading} />
        ) : initialValues ? (
          <Paper className={styles.form}>
            <UserSpecificContent>
              {(user: firebase.User): JSX.Element => {
                return user ? (
                  <SeekingForm user={user} initialValues={initialValues} documentToUpdate={advert.id} />
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
