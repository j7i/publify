export enum FirebaseCollection {
  SEEKINGS = 'seekings',
  USERS = 'users',
  CHATS = 'chats',
  CHAT_MESSAGES = 'messages'
}

export interface IFirestoreTimeStamp {
  seconds: number
  nanoseconds: number
}
