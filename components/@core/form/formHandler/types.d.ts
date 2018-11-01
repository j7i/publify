import { AdvertType } from '@user/dashboard/testDataForm/advertTypeSwitch/types'

export interface IFormHandlerProps {
  onSubmit: (values: IFormValues) => Promise<void>
  children: (formChildProps: IFormChildProps) => JSX.Element
}

export interface IFormHandlerState {
  values: IFormValues
  touched: IFormTouched
  focused: IFormFocused
}

interface IFormValues {
  [key: string]: string | boolean | string[]
}

interface IFormTouched {
  [key: string]: boolean
}

// tslint:disable-next-line:no-empty-interface
interface IFormFocused extends IFormTouched {}

export interface IFormChildProps extends IFormHandlerState {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void
  handleCategories: (selection: string[]) => void
  handleAdvertType: (advertType: AdvertType) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
