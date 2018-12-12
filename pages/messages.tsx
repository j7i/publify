import UserSpecificContent from '@auth/userSpecificContent'
import { Messenger } from '@communication'
import ErrorBoundary from '@helpers/errorBoundary'
import { PureComponent } from 'react'

export default class Messages extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <UserSpecificContent>
          {(user: firebase.User): JSX.Element => {
            return user && <Messenger user={user} />
          }}
        </UserSpecificContent>
      </ErrorBoundary>
    )
  }
}
