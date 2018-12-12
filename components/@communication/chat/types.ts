import { IFirestoreTimeStamp } from '@config/firebase/types'
import { ReactNode } from 'react'

export interface IChatProps {
  advertId?: string
  advertOwnerId?: string
  chatId?: string
  displayMode?: string
}

export interface IChatControllerProps {
  advertId?: string
  advertOwnerId?: string
  chatId?: string
  loggedInUserId: string
  children: (chatRenderProps: IChatRenderProps) => ReactNode
}

export interface IChatRenderProps extends IChatControllerState {
  loggedInUserId: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void
}

export interface IMessage {
  uid: string
  date: IFirestoreTimeStamp
  content: string
  // status?: MessageStatus
}

export interface IChatControllerState {
  message: string
  messages: IMessage[] | firebase.firestore.DocumentData
  loading: boolean
}

export interface IChatViewProps {
  chatRenderProps: IChatRenderProps
  displayMode?: string
}

export interface IChatConversationProps {
  loading: boolean
  loggedInUserId: string
  fetchedMessages: IMessage[]
  displayMode?: string
}

export interface IChatTriggerProps {
  message: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void
}
