import { IAdvert } from '@advert/advertListElement/types'

export interface IAdvertListProps {
  adverts: IAdvert[]
}
export interface IAdvertListState {
  filtered: IAdvert[]
}
