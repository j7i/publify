import { IAdvert } from '@advert'

export interface IAdvertListProps {
  adverts: IAdvert[]
}
export interface IAdvertListState {
  filtered: IAdvert[]
}

export interface IAdvertFilterProps {
  handleFilter: (categorie: string) => void
}

export interface IAdvertFilterState {
  selectedCategorie: string
}
