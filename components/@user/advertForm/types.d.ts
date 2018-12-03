import { IAdvert } from '@advert/advertListElement/types'
import { IFormValues } from '@core/form/formHandler/types'

export interface IAdvertFormProps {
  user: firebase.User
  documentToUpdate?: string
  initialValues?: IAdvert
}
