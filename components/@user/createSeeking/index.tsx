import UserSpecificContent from '@auth/userSpecificContent'
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import SeekingForm from '@user/seekingForm'
import 'isomorphic-unfetch'
import Link from 'next/link'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class CreateSeeking extends PureComponent<{}> {
  public render(): JSX.Element {
    return (
      <section className={styles.createSeeking}>
        <Paper className={styles.form}>
          <UserSpecificContent>
            {(user: firebase.User): JSX.Element => {
              return user ? (
                <SeekingForm user={user} />
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
      </section>
    )
  }
}
