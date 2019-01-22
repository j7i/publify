/* eslint-env jest */
import { cleanup, fireEvent, render } from 'react-testing-library'
import { basicFetchedMessagesMock, sortedFetchedMessagesMock, unsortedFetchedMessagesMock } from '../__mocks__/chat.mock'
import { sortMessageByTimeStamp } from '../chat/chatController/helpers'
import { ChatConversation } from '../chat/chatView/chatConversation/chatConversation'
import { ChatTrigger } from '../chat/chatView/chatTrigger'

describe('@communication/chat:', () => {
  describe('ChatController', () => {
    it('should provide sorted messages ', () => {
      // arrange
      const fetchedMessages = unsortedFetchedMessagesMock
      const expectedMessages = sortedFetchedMessagesMock

      // act
      const sortedMessages = sortMessageByTimeStamp(fetchedMessages)

      // assert
      expect(sortedMessages).toStrictEqual(expectedMessages)
    })
  })

  describe('ChatConversation', () => {
    afterEach(cleanup)

    it('should render correctly', () => {
      const { container } = render(<ChatConversation loading={false} loggedInUserId={'1a2b'} fetchedMessages={basicFetchedMessagesMock} />)
      const totalMessages = container.querySelectorAll('.messages')
      const ownMessages = container.querySelectorAll('.self')

      expect(container).toMatchSnapshot('Representing a basic chat conversation with two participants.')
      expect(totalMessages.length).toBe(3)
      expect(ownMessages.length).toBe(2)
    })

    it('should render a loading animation while loading', () => {
      const { container } = render(<ChatConversation loading={true} loggedInUserId={'1a2b'} fetchedMessages={basicFetchedMessagesMock} />)

      expect(container).toMatchSnapshot('Representing a loading chat conversation.')
    })
  })

  describe('ChatTrigger', () => {
    afterEach(cleanup)

    it('should handle submit correctly', () => {
      const handleChangeMock = jest.fn()
      const sendMessageMock = jest.fn()
      const messageMock = `I'm a message mock as string`

      const { container } = render(<ChatTrigger handleChange={handleChangeMock} sendMessage={sendMessageMock} message={messageMock} />)
      const form = container.querySelector('form') as HTMLElement
      fireEvent.submit(form)

      expect(sendMessageMock).toHaveBeenCalledTimes(1)
    })

    it('should handle message input change correctly', () => {
      const handleChangeMock = jest.fn()
      const sendMessageMock = jest.fn()
      const messageMock = 'I will be the change trigger'

      const { container } = render(<ChatTrigger handleChange={handleChangeMock} sendMessage={sendMessageMock} message={''} />)
      const input = container.querySelector('input') as HTMLInputElement
      fireEvent.change(input, { target: { value: messageMock } })

      expect(handleChangeMock).toHaveBeenCalledTimes(1)
    })
  })
})
