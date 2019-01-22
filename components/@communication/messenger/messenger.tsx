import { PureComponent, ReactNode } from 'react'
import { MessengerController } from './messengerController'
import { MessengerView } from './messengerView'
import { IMessengerProps, IMessengerViewRenderProps } from './types'

export class Messenger extends PureComponent<IMessengerProps> {
  public render(): ReactNode {
    const { user } = this.props

    return (
      <MessengerController user={user}>
        {(renderProps: IMessengerViewRenderProps): ReactNode => <MessengerView renderProps={renderProps} />}
      </MessengerController>
    )
  }
}
