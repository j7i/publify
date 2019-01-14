import { IAdvert } from '@advert'
import { ILocation } from '@core'
import { AdvertType } from '@helpers'
import { IUserInfo } from '@user'

export interface IFormProps {
  children: (formChildProps: IFormChildProps) => JSX.Element
  onSubmit: (values: IFormValues) => Promise<void>
  className: string
  initialValues?: IFormValues | IAdvert
  advertType?: AdvertType
  userInfo?: IUserInfo
}

export interface IFormHandlerProps {
  children: (formChildProps: IFormChildProps) => JSX.Element
  onSubmit: (values: IFormValues) => Promise<void>
  initialValues?: IFormValues
  advertType?: AdvertType
  userInfo?: IUserInfo
}

export interface IFormHandlerState {
  values: IFormValues
  touched: IFormTouched
}

export interface IFormValues {
  [key: string]: string | boolean | string[] | ILocation
}

interface IFormTouched {
  [key: string]: boolean
}

export interface IFormChildProps extends IFormHandlerState {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  handleCategories: (selection: string[]) => void
  handleAdvertType: (advertType: AdvertType) => void
  handleLocation: (location: ILocation) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  formChildProps: IFormChildProps
  multiline?: boolean
}
