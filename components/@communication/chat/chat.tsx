import { UserSpecificContent } from '@auth'
import { IChatRenderProps } from '@communication/chat/types'
import { IUserInfo } from '@user'
import { PureComponent, ReactNode } from 'react'
import { ChatController } from './chatController/chatController'
import { ChatView } from './chatView/chatView'
import { IChatProps } from './types'

export class Chat extends PureComponent<IChatProps> {
  public render(): JSX.Element {
    const { advertId, advertTitle, advertOwnerId, advertOwnerName, chatId, displayMode } = this.props

    return (
      <UserSpecificContent>
        {(user: firebase.User, userInfo: IUserInfo): ReactNode => {
          return user ? (
            <ChatController
              advertId={advertId}
              advertTitle={advertTitle}
              advertOwnerId={advertOwnerId}
              advertOwnerName={advertOwnerName}
              loggedInUserId={user.uid}
              loggedInUserName={userInfo.fullName}
              chatId={chatId}
            >
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
