import { PureComponent, ReactNode } from 'react'
import { IChatControllerProps, IChatControllerState, IChatRenderProps } from './types'

export default class ChatController extends PureComponent<IChatControllerProps, IChatControllerState> {
  public state: IChatControllerState = {
    message: '',
    messages: []
  }

  public componentWillMount(): void {
    const { messages } = this.props

    if (messages) {
      this.setState({
        messages
      })
    }
  }

  public sendMessage = (): void => {
    // tslint:disable-next-line:no-console
    console.log(this.state.message)
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target

    event.persist()
    this.setState({
      message: value
    })
  }

  public render(): ReactNode {
    const { children } = this.props

    const chatRenderProps: IChatRenderProps = {
      ...this.state,
      handleChange: this.handleChange,
      sendMessage: this.sendMessage
    }

    return children(chatRenderProps)
  }
}
