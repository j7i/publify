import { IChatRenderProps } from '@communication/chat/chatController/types'

// tslint:disable-next-line:no-empty-interface
export interface IChatTriggerProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  sendMessage: () => void
}
