import { IAdvert } from '@advert'
import { Categorie } from '@helpers'
import { WithStyles } from '@material-ui/core'

export interface IAdvertListProps {
  adverts: IAdvert[]
}
export interface IAdvertListState {
  filtered: IAdvert[]
}

export interface IAdvertListNavigationProps {
  classes: WithStyles['classes']
  handleFilter: (categorie: Categorie) => void
}

export interface IAdvertListNavigationState {
  value: Categorie
}
