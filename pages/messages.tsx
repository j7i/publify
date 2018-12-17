import { UserSpecificContent } from '@auth'
import { Messenger } from '@communication'
import { ErrorBoundary } from '@helpers'
import { PureComponent, ReactNode } from 'react'

export default class Messages extends PureComponent {
  public render(): ReactNode {
    return (
      <ErrorBoundary>
        <UserSpecificContent>
          {(user: firebase.User): ReactNode => {
            return user && <Messenger user={user} />
          }}
        </UserSpecificContent>
      </ErrorBoundary>
    )
  }
}
