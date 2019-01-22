import { IChat } from '../chat/types'

export const basicFetchedMessagesMock: IChat['messages'] = [
  {
    uid: '1a2b',
    date: {
      seconds: 1548022013,
      nanoseconds: 955000000
    },
    content: 'I wrote this message, so it is mine.'
  },
  {
    uid: 'x8y9',
    date: {
      seconds: 1548022016,
      nanoseconds: 397000000
    },
    content: 'So then I can have mine too..'
  },
  {
    uid: '1a2b',
    date: {
      seconds: 1548022020,
      nanoseconds: 628000000
    },
    content: 'Yeah sure,s we are kind of the same :)'
  }
]

export const sortedFetchedMessagesMock: IChat['messages'] = [
  {
    uid: '0',
    date: {
      seconds: 1548022013,
      nanoseconds: 955000000
    },
    content: 'First.'
  },
  {
    uid: '1',
    date: {
      seconds: 1548022016,
      nanoseconds: 397000000
    },
    content: 'Second'
  },
  {
    uid: '2',
    date: {
      seconds: 1548022016,
      nanoseconds: 858000000
    },
    content: 'Third'
  },
  {
    uid: '3',
    date: {
      seconds: 1548022020,
      nanoseconds: 628000000
    },
    content: 'YFourth'
  },
  {
    uid: '4',
    date: {
      seconds: 1548022020,
      nanoseconds: 697000000
    },
    content: 'Fifth'
  },
  {
    uid: '5',
    date: {
      seconds: 1548022027,
      nanoseconds: 628000000
    },
    content: 'Sixth'
  }
]

export const unsortedFetchedMessagesMock: IChat['messages'] = [
  {
    uid: '2',
    date: {
      seconds: 1548022016,
      nanoseconds: 858000000
    },
    content: 'Third'
  },
  {
    uid: '1',
    date: {
      seconds: 1548022016,
      nanoseconds: 397000000
    },
    content: 'Second'
  },
  {
    uid: '5',
    date: {
      seconds: 1548022027,
      nanoseconds: 628000000
    },
    content: 'Sixth'
  },
  {
    uid: '0',
    date: {
      seconds: 1548022013,
      nanoseconds: 955000000
    },
    content: 'First.'
  },
  {
    uid: '4',
    date: {
      seconds: 1548022020,
      nanoseconds: 697000000
    },
    content: 'Fifth'
  },
  {
    uid: '3',
    date: {
      seconds: 1548022020,
      nanoseconds: 628000000
    },
    content: 'YFourth'
  }
]
