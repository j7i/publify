import { IAdvert } from '@advert'

export interface IAdvertCardElementProps {
  advert: IAdvert
  withActions?: boolean
}

export interface IAdvertCardElementState {
  published: boolean
}
