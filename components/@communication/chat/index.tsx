import UserSpecificContent from '@auth/userSpecificContent'
import ChatController from '@communication/chat/chatController'
import { IChatRenderProps } from '@communication/chat/chatController/types'
import { PureComponent, ReactNode } from 'react'
import ChatView from './chatView'
import { IChatProps, IChatState } from './types'

export default class Chat extends PureComponent<IChatProps, IChatState> {
  public render(): JSX.Element {
    const { seekingId, seekingOwnerId } = this.props

    return (
      <UserSpecificContent>
        {(user: firebase.User): JSX.Element => {
          return user && seekingId && seekingOwnerId ? (
            <ChatController seekingId={seekingId} seekingOwnerId={seekingOwnerId} loggedInUser={user.uid}>
              {(chatRenderProps: IChatRenderProps): ReactNode => {
                return <ChatView chatRenderProps={chatRenderProps} />
              }}
            </ChatController>
          ) : (
            <></>
          )
        }}
      </UserSpecificContent>
    )
  }
}
