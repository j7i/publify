import UserSpecificContent from '@auth/userSpecificContent'
import Button from '@core/button'
import { PureComponent } from 'react'

export default class Dashboard extends PureComponent {
  public render(): JSX.Element {
    return (
      <UserSpecificContent>
        {// tslint:disable-next-line:no-any
        (user: any): JSX.Element => {
          return user ? (
            <div>
              <h1>Welcome, {user.email}</h1>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          ) : (
            <>
              <h1>You need to login first</h1>
              <Button type="link" target="/login">
                Login
              </Button>
            </>
          )
        }}
      </UserSpecificContent>
    )
  }
}
