import { IUserInfo } from '../dashboard'

export interface IUserSettingsProps {
  userInfo: IUserInfo
}

export interface IUserSettingsState {
  firstName: string
  lastName: string
}

export interface IUserSettingsValues {
  [key: string]: string
}
