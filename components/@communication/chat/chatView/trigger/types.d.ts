import { IChatRenderProps } from '@communication/chat/chatController/types'

// tslint:disable-next-line:no-empty-interface
export interface IChatTriggerProps {
  message: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void
}
