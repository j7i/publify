import { IAdvert } from '@advert/advertListElement/types'
import { IFormChildProps, IFormValues } from '@core/form/formHandler/types'
import { AdvertType } from '@helpers/types/types'

export interface IFormProps {
  children: (formChildProps: IFormChildProps) => JSX.Element
  onSubmit: (values: IFormValues) => Promise<void>
  className: string
  initialValues?: IFormValues | IAdvert
  advertType?: AdvertType
}
