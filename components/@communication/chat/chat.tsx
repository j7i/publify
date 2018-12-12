import UserSpecificContent from '@auth/userSpecificContent'
import { IChatRenderProps } from '@communication/chat/types'
import { PureComponent, ReactNode } from 'react'
import { ChatController } from './chatController/chatController'
import { ChatView } from './chatView/chatView'
import { IChatProps } from './types'

export class Chat extends PureComponent<IChatProps> {
  public render(): JSX.Element {
    const { advertId, advertOwnerId, chatId, displayMode } = this.props

    return (
      <UserSpecificContent>
        {(user: firebase.User): JSX.Element => {
          return user ? (
            <ChatController advertId={advertId} advertOwnerId={advertOwnerId} loggedInUserId={user.uid} chatId={chatId}>
              {(chatRenderProps: IChatRenderProps): ReactNode => {
                return <ChatView chatRenderProps={chatRenderProps} displayMode={displayMode} />
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
