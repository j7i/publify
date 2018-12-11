import { IAdvert } from '@advert/advertListElement/types'
import { IFormValues } from '@core/form/formHandler/types'
import { AdvertType } from '@helpers/types/types'

export interface IAdvertFormProps {
  user: firebase.User
  documentToUpdate?: string
  initialValues?: IAdvert
  advertType?: AdvertType
}
