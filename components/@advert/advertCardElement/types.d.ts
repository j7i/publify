import { IAdvert } from '@advert/advertListElement/types'

export interface IAdvertCardElementProps {
  advert: IAdvert
  withActions?: boolean
}

export interface IAdvertCardElementState {
  published: boolean
}
