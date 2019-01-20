import { ReactNode } from 'react'
import { IUserInfo } from '../dashboard'

export interface IUserSettingsProps {
  userInfo: IUserInfo
}

export interface IUserSettingsState {
  notification?: ReactNode
}

export interface IUserSettingsValues {
  [key: string]: string
}
