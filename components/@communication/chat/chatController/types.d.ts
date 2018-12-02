import { IFirestoreTimeStamp } from '@config/firebase/types'
import { ReactNode } from 'react'

export interface IChatControllerProps {
  advertId?: string
  advertOwnerId?: string
  loggedInUserId: string
  chatId?: string
  children: (chatRenderProps: IChatRenderProps) => ReactNode
}

export interface IChatControllerState {
  message: string
  messages: IMessage[] | firebase.firestore.DocumentData
  loading: boolean
}

export interface IMessage {
  uid: string
  date: IFirestoreTimeStamp
  content: string
  // status?: MessageStatus
}

export interface IChatRenderProps extends IChatControllerState {
  loggedInUserId: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void
}
