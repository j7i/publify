import { IFirestoreTimeStamp } from '@config'
import { ReactNode } from 'react'

export interface IChatProps {
  advertId?: string
  advertTitle?: string
  advertOwnerId?: string
  advertOwnerName?: string
  advertOwnerImageURL?: string | null
  chatId?: string
}

export interface IChatControllerProps extends IChatProps {
  loggedInUserId: string
  loggedInUserName: string
  loggedInUserImageURL?: string
  children: (chatViewRenderProps: IChatViewRenderProps) => ReactNode
}

export interface IChatControllerState {
  message: string
  messages: IMessage[] | firebase.firestore.DocumentData
  loading: boolean
}

export interface IChatViewProps {
  chatViewRenderProps: IChatViewRenderProps
  displayMode?: string
}

export interface IChatViewRenderProps extends IChatControllerState {
  loggedInUserId: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void
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

export interface IChat {
  advertId: string
  advertTitle: string
  memberInfos: IMemberInfo[]
  members: string[]
  messages: IMessage[]
}

export interface IMessage {
  uid: string
  date: IFirestoreTimeStamp
  content: string
}

export interface IMemberInfo {
  [key: string]: {
    name: string
    userImageURL: string | null
  }
}
