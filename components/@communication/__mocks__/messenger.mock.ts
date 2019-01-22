import { IChat } from '../messenger/types'
import { basicFetchedMessagesMock } from './chat.mock'

export const messengerChatsMock: IChat[] = [
  {
    id: '1a2bx8y9',
    messages: basicFetchedMessagesMock,
    members: ['1a2b', 'x8y9'],
    memberInfos: {
      x8y9: {
        name: 'Le'
      },
      '1a2b': {
        name: 'Jo'
      }
    },
    advertId: 'isJMkbVI1qOzoMi4GMv4',
    advertTitle: 'I need to be tested'
  },
  {
    id: '9h8k1a2b',
    messages: basicFetchedMessagesMock,
    members: ['9h8k', '1a2b'],
    memberInfos: {
      '9h8k': {
        name: 'Naru'
      },
      '1a2b': {
        name: 'Jo'
      }
    },
    advertId: 'Ban88qq55XlhsNLUDBfZ',
    advertTitle: 'I need to be mocked'
  }
]
