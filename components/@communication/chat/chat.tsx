import { UserSpecificContent } from '@auth'
import { IChatViewRenderProps } from '@communication/chat/types'
import { IUserInfo } from '@user'
import { PureComponent, ReactNode } from 'react'
import { ChatController } from './chatController/chatController'
import { ChatView } from './chatView/chatView'
import { IChatProps } from './types'

export class Chat extends PureComponent<IChatProps> {
  public render(): JSX.Element {
    const { advertId, advertTitle, advertOwnerId, advertOwnerName, chatId, advertOwnerImageURL } = this.props

    return (
      <UserSpecificContent>
        {(user: firebase.User, userInfo: IUserInfo): ReactNode => {
          return user ? (
            <ChatController
              advertId={advertId}
              advertTitle={advertTitle}
              advertOwnerId={advertOwnerId}
              advertOwnerName={advertOwnerName}
              advertOwnerImageURL={advertOwnerImageURL}
              loggedInUserId={user.uid}
              loggedInUserName={userInfo.fullName}
              loggedInUserImageURL={userInfo.imageURL}
              chatId={chatId}
            >
              {(chatViewRenderProps: IChatViewRenderProps): ReactNode => {
                return <ChatView chatViewRenderProps={chatViewRenderProps} />
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
