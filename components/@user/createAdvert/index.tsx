import UserSpecificContent from '@auth/userSpecificContent'
import { Button } from '@material-ui/core'
import AdvertForm from '@user/advertForm'
import 'isomorphic-unfetch'
import Link from 'next/link'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class CreateAdvert extends PureComponent<{}> {
  public render(): JSX.Element {
    return (
      <section className={styles.createAdvert}>
        <UserSpecificContent>
          {(user: firebase.User): JSX.Element => {
            return user ? (
              <AdvertForm user={user} />
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
      </section>
    )
  }
}
