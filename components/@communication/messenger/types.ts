import { IMessage } from '@communication/chat/types'
import { ReactNode } from 'react'

export interface IMessengerProps {
  user: firebase.User
}

export interface IMessengerControllerProps extends IMessengerProps {
  children: (renderProps: IMessengerViewRenderProps) => ReactNode
}

export interface IMessengerControllerState {
  currentChat: string
  chats: IChat[]
  notification: ReactNode
}

export interface IMessengerViewProps {
  renderProps: IMessengerViewRenderProps
}

export interface IMessengerViewRenderProps {
  user: firebase.User
  chats: IChat[]
  currentChat: string
  clearCurrentConversation: () => void
  startConversation: (id: string) => void
}

export interface IChat {
  id: string
  messages: IMessage[]
  members: string[]
  memberInfos: IMemberInfos
  advertId: string
  advertTitle: string
}

interface IMemberInfos {
  [key: string]: IMemberInfo
}

interface IMemberInfo {
  name: string
  userImageURL: string
}
