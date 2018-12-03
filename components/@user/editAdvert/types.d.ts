import { IAdvert } from '@advert/advertListElement/types'
import { IFormValues } from '@core/form/formHandler/types'

export interface IEditAdvertProps {
  advert: IAdvert
}

export interface IEditAdvertState {
  initialValues?: IAdvert
  loading: boolean
}
