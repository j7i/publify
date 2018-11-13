import { IFormValues } from '@core/form/formHandler/types'

export interface ISeekingFormProps {
  user: firebase.User
  documentToUpdate?: string
  initialValues?: IFormValues
}
