import { IAdvert } from '@advert'
import { Categorie } from '@helpers'

export interface IAdvertListProps {
  adverts: IAdvert[]
}
export interface IAdvertListState {
  filtered: IAdvert[]
}

export interface IAdvertFilterProps {
  handleFilter: (categorie: Categorie) => void
}

export interface IAdvertFilterState {
  value: Categorie
}
