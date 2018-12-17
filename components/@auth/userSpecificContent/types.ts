import { IUserInfo } from '@user'
import { ReactNode } from 'react'

export interface IUserSpecificContentProps {
  children: (user: firebase.User | null, userInfo?: IUserInfo) => ReactNode | null
}
export interface IUserSpecificContentState {
  user: firebase.User | null
  userInfo?: IUserInfo
  isAuthorizing: boolean
}
