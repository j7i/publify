import { IAdvert } from '@advert'
import { IFormChildProps, IIconProps } from '@core'
import { AdvertType } from '@helpers'
import { ReactNode } from 'react'

export interface IDashboardProps {
  user: firebase.User
}

export interface IDashboardState {
  myDemand?: IAdvert
  myOffer?: IAdvert
  userInfo?: IUserInfo
  currentAdvert?: number
  currentTabIndex: number
}

export interface IUserInfo {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  initials: string
  imageURL?: string
}

export interface IUpdateAdvertProps {
  advert: IAdvert
  userInfo: IUserInfo
}

export interface IUpdateAdvertState {
  initialValues?: IAdvert
  loading: boolean
}

export interface ICreateAdvertProps {
  advertType: AdvertType
  userInfo: IUserInfo
}

export interface ICreateAdvertState {
  isCreating: boolean
}

export interface IAdvertFormProps {
  documentToUpdate?: string
  initialValues?: IAdvert
  advertType?: AdvertType
  userInfo: IUserInfo
}

export interface IAdvertFormState {
  notification: ReactNode
  documentToUpdate?: string
}

export interface ICategorieState {
  selected: ISelection
}

export interface ICategorieProps {
  formChildProps: IFormChildProps
}

export interface ISelection {
  [key: string]: boolean
}

export interface ICategorie {
  name: string
  icon?: React.SFC<IIconProps>
}

export interface IUserImageProps {
  userId: string
  userImageURL?: string
}

export interface IUserImageState {
  isUploading: boolean
  progress: number
  uploadedProfileImageURL?: string
  notification: ReactNode
}
