import { ILocation } from '@core'

export interface IAdvert {
  id: string
  type: string
  categories: string[]
  title: string
  description: string
  published: boolean
  userId: string
  fullName: string
  userImageURL?: string
  location: ILocation
}

export interface IAdvertDetailProps {
  advert: IAdvert
}

export interface IAdvertDetailState {
  isChatting: boolean
  advert?: IAdvert
}
