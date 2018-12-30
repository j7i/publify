import { IAdvert } from '@advert'
import { ReactNode } from 'react'

export interface IAdvertListProps {
  adverts: IAdvert[]
}
export interface IAdvertListState {
  filtered: IAdvert[]
}

export interface IAdvertListControllerProps {
  children: (chatRenderProps: IAdvertListRenderProps) => ReactNode
}

export interface IAdvertListControllerState {
  filteredAdverts?: IAdvert[]
  categorie: string
  type: string
  radius?: string
  location?: string
}

export interface IAdvertListRenderProps extends IAdvertListControllerState {
  handleCategorieFilter: (categorie: string) => void
  handleTypeFilter: (type: string) => void
}

export interface IAdvertFilterProps {
  advertListRenderProps: IAdvertListRenderProps
}

export interface IAdvertFilterState {
  selectedCategorie: string
  advertTypeSelection: string
}
