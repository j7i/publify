import { IAdvert } from '@advert'
import { ReactNode } from 'react'

export interface IAdvertListProps {
  adverts: IAdvert[]
}
export interface IAdvertListState {
  filtered: IAdvert[]
}

export interface IAdvertListControllerProps {
  children: (chatViewRenderProps: IAdvertListRenderProps) => ReactNode
}

export interface IAdvertListControllerState {
  filteredAdverts?: IAdvert[]
  category: string
  type: string
  radius?: string
  location?: string
}

export interface IAdvertListRenderProps extends IAdvertListControllerState {
  handleCategorieFilter: (category: string) => void
  handleTypeFilter: (type: string) => void
}

export interface IAdvertFilterProps {
  advertListRenderProps: IAdvertListRenderProps
}

export interface IAdvertFilterState {
  isFilterAreaVisible: boolean
}
