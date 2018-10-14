import FormHandler from '@core/form/formHandler/formHandler'
import { IFormChildProps } from '@core/form/formHandler/types'
import { IFormProps } from '@core/form/types'
import { PureComponent } from 'react'

export default class Form extends PureComponent<IFormProps> {
  public render(): JSX.Element {
    const { children, onSubmit, className } = this.props

    return (
      <FormHandler onSubmit={onSubmit}>
        {(formChildProps: IFormChildProps): JSX.Element => {
          return (
            <form onSubmit={formChildProps.handleSubmit} className={className}>
              {children(formChildProps)}
            </form>
          )
        }}
      </FormHandler>
    )
  }
}
