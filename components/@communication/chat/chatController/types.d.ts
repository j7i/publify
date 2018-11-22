import { ReactNode } from 'react'

export interface IChatControllerProps {
  messages: IMessage[]
  children: (chatRenderProps: IChatRenderProps) => ReactNode
}

export interface IChatControllerState {
  message: string
  messages: IMessage[]
}

export interface IMessage {
  uid: string
  date: number
  message: string
  // status?: MessageStatus
}

export interface IChatRenderProps extends IChatControllerState {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  sendMessage: () => void
}
