import { IMessage } from '@communication/chat/chatController/types'

export interface IMessengerProps {
  user: firebase.User
}

export interface IMessengerState {
  currentChat?: string
  chats: IChat[]
}

export interface IChat {
  id: string
  messages: IMessage[]
  members: string[]
  advertId: string
}
