import UserSpecificContent from '@auth/userSpecificContent'
import ChatController from '@communication/chat/chatController'
import { IChatRenderProps } from '@communication/chat/chatController/types'
import { PureComponent, ReactNode } from 'react'
import ChatView from './chatView'
import { IChatProps } from './types'

export default class Chat extends PureComponent<IChatProps> {
  public render(): JSX.Element {
    const { advertId, advertOwnerId, chatId } = this.props

    return (
      <UserSpecificContent>
        {(user: firebase.User): JSX.Element => {
          return user ? (
            <ChatController advertId={advertId} advertOwnerId={advertOwnerId} loggedInUserId={user.uid} chatId={chatId}>
              {(chatRenderProps: IChatRenderProps): ReactNode => {
                return <ChatView chatRenderProps={chatRenderProps} />
              }}
            </ChatController>
          ) : (
            <>TODO</>
          )
        }}
      </UserSpecificContent>
    )
  }
}
