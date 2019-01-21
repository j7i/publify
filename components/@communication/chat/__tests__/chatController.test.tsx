import React, { ReactNode } from 'react'
import { cleanup, render } from 'react-testing-library'
import { ChatController } from '../chatController/chatController'
import { IChatControllerProps, IChatViewRenderProps } from '../types'

describe('@communication - chat | ChatController', () => {
  afterEach(cleanup)

  it('should use jest as testing library', () => {
    render(<h2>Is working successfull</h2>)
  })
})
