export enum FirebaseCollection {
  SEEKINGS = 'seekings',
  USERS = 'users',
  CHATS = 'chats'
}

export interface IFirestoreTimeStamp {
  seconds: number
  nanoseconds: number
}
