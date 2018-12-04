import { IAdvert } from '@advert/advertListElement/types'
import { IMessage } from '@communication/chat/chatController/types'

export interface IDashboardProps {
  user: firebase.User
}

export interface IDashboardState {
  adverts: IAdvert[]
  chats: IChat[]
  currentAdvert?: number
  currentChat?: string
  currentTabIndex: number
}

export interface IChat {
  id: string
  messages: IMessage[]
  members: string[]
  advertId: string
}
