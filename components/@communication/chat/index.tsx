import UserSpecificContent from '@auth/userSpecificContent'
import ChatController from '@communication/chat/chatController'
import { IChatRenderProps, IMessage } from '@communication/chat/chatController/types'
import { PureComponent, ReactNode } from 'react'
import ChatView from './chatView'
import { IChatProps, IChatState } from './types'

export default class Chat extends PureComponent<IChatProps, IChatState> {
  public render(): JSX.Element {
    const messages: IMessage[] = []

    const { seeking } = this.props

    return (
      <UserSpecificContent>
        {(user: firebase.User): JSX.Element => {
          return user ? (
            <ChatController messages={messages} seeking={seeking} loggedInUser={user.uid}>
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
