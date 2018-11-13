import FormHandler from '@core/form/formHandler'
import { IFormChildProps } from '@core/form/formHandler/types'
import { IFormProps } from '@core/form/types'
import { PureComponent } from 'react'

export default class Form extends PureComponent<IFormProps> {
  public render(): JSX.Element {
    const { children, onSubmit, className, initialValues } = this.props

    return (
      <FormHandler onSubmit={onSubmit} initialValues={initialValues}>
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
