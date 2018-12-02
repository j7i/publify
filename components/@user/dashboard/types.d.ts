import { ISeeking } from '@advert/advertListElement/types'
import { IMessage } from '@communication/chat/chatController/types'

export interface IDashboardProps {
  user: firebase.User
}

export interface IDashboardState {
  seekings: ISeeking[]
  chats: IChat[]
  currentChat?: string
}

export interface IChat {
  id: string
  messages: IMessage[]
  members: string[]
  advertId: string
}
