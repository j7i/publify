import { IFormProps } from '@core/form/types'
import { PureComponent } from 'react'
import { FormHandler } from './formHandler/formHandler'
import { IFormChildProps, IFormValues } from './types'

export class Form extends PureComponent<IFormProps> {
  public render(): JSX.Element {
    const { children, onSubmit, advertType, className, userInfo } = this.props
    const initialValues = this.props.initialValues as IFormValues

    return (
      <FormHandler onSubmit={onSubmit} initialValues={initialValues} advertType={advertType} userInfo={userInfo}>
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
