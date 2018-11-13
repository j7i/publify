import { IFormValues } from '@core/form/formHandler/types'

export interface IEditSeekingProps {
  id: string
}

export interface IEditSeekingState {
  initialValues: IFormValues
  loading: boolean
}
