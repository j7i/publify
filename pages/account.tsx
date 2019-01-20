import { SignIn, UserSpecificContent } from '@auth'
import { ErrorBoundary } from '@helpers'
import { IUserInfo, UserSettings } from '@user'
import { PureComponent, ReactNode } from 'react'

export default class Account extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <UserSpecificContent>
          {(user: firebase.User, userInfo: IUserInfo): ReactNode => {
            return user && userInfo ? <UserSettings userInfo={userInfo} /> : <SignIn />
          }}
        </UserSpecificContent>
      </ErrorBoundary>
    )
  }
}
