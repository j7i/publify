import { IMessage } from '@communication/chat/types'
import { ReactNode } from 'react'

export interface IMessengerProps {
  user: firebase.User
}

export interface IMessengerState {
  currentChat?: string
  chats: IChat[]
  notification: ReactNode
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
