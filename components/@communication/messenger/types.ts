import { IMessage } from '@communication/chat/types'

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
  memberInfos: IMemberInfos
  advertId: string
  advertTitle: string
}

interface IMemberInfos {
  [key: string]: IMemberInfo
}

interface IMemberInfo {
  name: string
}
