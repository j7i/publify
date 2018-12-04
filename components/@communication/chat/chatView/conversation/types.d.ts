import { IMessage } from '@communication/chat/chatController/types'

export interface IChatConversationProps {
  loading: boolean
  loggedInUserId: string
  fetchedMessages: IMessage[]
  displayMode?: string
}
