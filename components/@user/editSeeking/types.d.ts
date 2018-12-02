import { IAdvert } from '@advert/advertListElement/types'
import { IFormValues } from '@core/form/formHandler/types'

export interface IEditSeekingProps {
  advert: IAdvert
}

export interface IEditSeekingState {
  initialValues?: IAdvert
  loading: boolean
}
