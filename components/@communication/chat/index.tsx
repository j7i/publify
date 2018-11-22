import ChatController from '@communication/chat/chatController'
import { IChatRenderProps, IMessage } from '@communication/chat/chatController/types'
import { PureComponent, ReactNode } from 'react'
import ChatView from './chatView'
import { IChatProps, IChatState } from './types'

export default class Chat extends PureComponent<IChatProps, IChatState> {
  public render(): JSX.Element {
    const messages: IMessage[] = [
      {
        uid: 'dksufh8e9hdsas92',
        date: 1542922601330,
        message: 'Hey Joe, nice to have you around.'
      }
    ]

    return (
      <ChatController messages={messages}>
        {(chatRenderProps: IChatRenderProps): ReactNode => {
          return <ChatView chatRenderProps={chatRenderProps} />
        }}
      </ChatController>
    )
  }
}
