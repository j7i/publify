import { IAdvert } from '@advert/advertListElement/types'

export interface IAdvertCardElementProps {
  seeking: IAdvert
  withActions?: boolean
}

export interface IAdvertCardElementState {
  published: boolean
}
