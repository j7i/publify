import { ILocation } from '@core'
import { Categorie } from '@helpers'

export interface IAdvert {
  id: string
  type: string
  categories: Categorie[]
  title: string
  description: string
  published: boolean
  userId: string
  fullName: string
  userImageURL?: string | null
  location: ILocation
}

export interface IAdvertDetailProps {
  advert: IAdvert
}

export interface IAdvertDetailState {
  isChatting: boolean
  advert?: IAdvert
}
