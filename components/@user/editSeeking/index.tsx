import UserSpecificContent from '@auth/userSpecificContent'
import { firestore } from '@config/firebase'
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
    initialValues: {},
    loading: true
  }

  public componentDidMount(): void {
    const { id } = this.props

    if (id) {
      // tslint:disable:no-console
      firestore
        .collection('seekings')
        .doc(id)
        .get()
        // tslint:disable-next-line:no-any
        .then((doc: any) => {
          if (!doc.exists) {
            console.log('No such document!')
          } else {
            this.setState({
              initialValues: doc.data(),
              loading: false
            })
          }
        })
        // tslint:disable-next-line:no-any
        .catch((error: any) => {
          console.log(`Error getting document: ${error}`)
        })
    }
  }
  public render(): JSX.Element {
    return (
      <section className={styles.createSeeking}>
        {this.state.loading ? (
          <CircularProgress className={styles.loading} />
        ) : (
          <Paper className={styles.form}>
            <UserSpecificContent>
              {(user: firebase.User): JSX.Element => {
                return user ? (
                  <SeekingForm user={user} initialValues={this.state.initialValues} documentToUpdate={this.props.id} />
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
        )}
      </section>
    )
  }
}
