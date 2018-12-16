import { IAdvert } from '@advert'

export interface IWelcomePageProps {
  adverts: IAdvert[]
}

export interface IDatailPageProps {
  advert: IAdvert
}

export interface IEditPageProps {
  advert: IAdvert
}
