export enum FirebaseCollection {
  ADVERTS = 'adverts',
  USERS = 'users',
  CHATS = 'chats',
  CHAT_MESSAGES = 'messages'
}

export enum FirebaseStorage {
  PROFILE_IMAGES = 'profileImages'
}

export interface IFirestoreTimeStamp {
  seconds: number
  nanoseconds: number
}
