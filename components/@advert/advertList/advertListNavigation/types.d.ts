import { Categorie } from '@helpers/types/types'
import { WithStyles } from '@material-ui/core'

export interface IAdvertListNavigationProps {
  classes: WithStyles['classes']
  handleFilter: (categorie: Categorie) => void
}

export interface IAdvertListNavigationState {
  value: Categorie
}
