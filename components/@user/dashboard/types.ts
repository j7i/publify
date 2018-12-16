import { IAdvert } from '@advert'
import { IFormChildProps } from '@core'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { AdvertType } from '@helpers'

export interface IDashboardProps {
  user: firebase.User
}

export interface IDashboardState {
  myDemand?: IAdvert
  myOffer?: IAdvert
  currentAdvert?: number
  currentTabIndex: number
}

export interface IUpdateAdvertProps extends IDashboardProps {
  advert: IAdvert
}

export interface IUpdateAdvertState {
  initialValues?: IAdvert
  loading: boolean
}

export interface ICreateAdvertProps extends IDashboardProps {
  advertType: AdvertType
}

export interface ICreateAdvertState {
  isCreating: boolean
}

export interface IAdvertFormProps extends IDashboardProps {
  documentToUpdate?: string
  initialValues?: IAdvert
  advertType?: AdvertType
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
  icon: IconProp
}
