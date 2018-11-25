import Chat from '@communication/chat'
import ErrorBoundary from '@helpers/errorBoundary'
import { PureComponent } from 'react'

export default class ChatPage extends PureComponent {
  public render(): JSX.Element {
    return (
      <ErrorBoundary>
        <Chat seeking="EPeGdT4BM3b2EaUK16rL" />
      </ErrorBoundary>
    )
  }
}
