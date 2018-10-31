import { IFormChildProps } from '@core/form/formHandler/types'

export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  formChildProps: IFormChildProps
}
