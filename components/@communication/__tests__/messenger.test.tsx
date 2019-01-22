/* eslint-env jest */
// tslint:disable:no-object-literal-type-assertion
import { messengerChatsMock } from '@communication/__mocks__/messenger.mock'
import { MessengerView } from '@communication/messenger/messengerView'
import { cleanup, fireEvent, render } from 'react-testing-library'

jest.mock('@communication', () => 'Chat')
jest.mock('@core', () => 'GoogleMap')

describe('@communication/messenger:', () => {
  const clearCurrentConversation = jest.fn()
  const startConversation = jest.fn()
  const user = {} as firebase.User
  const withUser = { uid: '1a2b' } as firebase.User
  const renderPropsMock = {
    user,
    chats: messengerChatsMock,
    currentChat: '',
    clearCurrentConversation,
    startConversation
  }

  afterEach(cleanup)

  it('should render the messenger empty state', () => {
    // arrange
    const renderProps = { ...renderPropsMock, chats: [] }

    // act
    const { container } = render(<MessengerView renderProps={{ ...renderProps }} />)

    // assert
    expect(container).toMatchSnapshot('Representing the empty state without chats.')
  })

  it('should render a messenger list with two listItems', () => {
    const renderProps = { ...renderPropsMock, user: withUser }

    const { container } = render(<MessengerView renderProps={{ ...renderProps }} />)

    expect(container).toMatchSnapshot('Representing a basic messenger component with two availabel chats.')
  })

  it('should select a new chat as current', () => {
    const renderProps = { ...renderPropsMock, user: withUser }

    const { container } = render(<MessengerView renderProps={{ ...renderProps }} />)
    const listItem = container.querySelector('.chatListItem') as HTMLElement
    fireEvent.click(listItem)

    expect(startConversation).toHaveBeenCalled()
  })
})
