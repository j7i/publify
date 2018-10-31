import { IFormChildProps } from '@core/form/formHandler/types'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface ICategorieState {
  selected: ISelection
}

export interface ICategorieProps {
  formChildProps: IFormChildProps
}

export interface ISelection {
  [key: string]: boolean
}

export interface ICategorie {
  name: string
  icon: IconProp
}
