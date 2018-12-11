import { IFormChildProps, IFormHandlerProps, IFormHandlerState } from '@core/form/formHandler/types'
import { AdvertType } from '@helpers/types/types'
import { PureComponent } from 'react'

export default class FormHandler extends PureComponent<IFormHandlerProps, IFormHandlerState> {
  public state: IFormHandlerState = {
    values: {
      published: false
    },
    touched: {}
  }
  public componentWillMount(): void {
    const { initialValues, advertType } = this.props

    if (advertType) {
      this.setState({
        values: { type: advertType }
      })
    }

    if (initialValues) {
      this.setState({
        values: initialValues
      })
    }
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = event.target

    event.persist()
    if (type === 'checkbox') {
      this.setState((prevState: IFormHandlerState) => ({
        values: {
          ...prevState.values,
          [name]: checked
        }
      }))
    } else {
      this.setState((prevState: IFormHandlerState) => ({
        values: {
          ...prevState.values,
          [name]: value
        }
      }))
    }
  }

  public handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = event.target

    event.persist()
    this.setState((prevState: IFormHandlerState) => ({
      touched: {
        ...prevState.touched,
        [name]: true
      }
    }))
  }

  public handleCategories = (selection: string[]): void => {
    this.setState((prevState: IFormHandlerState) => ({
      values: {
        ...prevState.values,
        categories: selection
      }
    }))
  }

  public handleAdvertType = (advertType: AdvertType): void => {
    this.setState((prevState: IFormHandlerState) => ({
      values: {
        ...prevState.values,
        type: advertType
      }
    }))
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    // validate

    this.props.onSubmit(this.state.values)
  }

  public render(): JSX.Element {
    const { children } = this.props

    const formChildProps: IFormChildProps = {
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleCategories: this.handleCategories,
      handleAdvertType: this.handleAdvertType,
      handleSubmit: this.handleSubmit
    }

    return children(formChildProps)
  }
}
