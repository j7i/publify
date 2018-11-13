import { IFormValues } from '@core/form/formHandler/types'
import { AdvertType } from '@helpers/types/types'

export interface IAdvertTypeSwitchProps {
  handleAdvertType: (advertType: AdvertType) => void
  initialValues: IFormValues
}

export interface IAdvertTypeSwitchState {
  advertType: AdvertType
}
