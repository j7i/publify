import { IAdvert } from '@advert/advertListElement/types'
import { IFirebaseDocumnet } from '@helpers/firestoreFetch/types'

export interface IWelcomePageProps {
  adverts: IAdvert[]
}

export interface IDatailPageProps {
  advert: IAdvert
}

export interface IEditPageProps {
  advert: IAdvert
}

export enum AdvertType {
  OFFER = 'Offer',
  DEMAND = 'Demand'
}

export enum Categorie {
  HOUSEHOLD = 'Haushalt',
  GARDEN = 'Garten',
  SHOPPING = 'Einkaufen',
  FINANCE = 'Finanzen',
  AUTHORITIES = 'Behörden',
  MULTIMEDIA = 'PC/Handy',
  TRANSPORTATION = 'Transport'
}
