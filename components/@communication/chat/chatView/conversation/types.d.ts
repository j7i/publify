import { IMessage } from '@communication/chat/chatController/types'

export interface IChatConversationProps {
  loading: boolean
  loggedInUser: string
  fetchedMessages: IMessage[]
}
