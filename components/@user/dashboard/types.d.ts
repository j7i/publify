import { IAdvert } from '@advert/advertListElement/types'
import { IMessage } from '@communication/chat/chatController/types'

export interface IDashboardProps {
  user: firebase.User
}

export interface IDashboardState {
  myDemand?: IAdvert
  myOffer?: IAdvert
  currentAdvert?: number
  currentTabIndex: number
}
