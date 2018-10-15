import Button from '@core/button'
import Form from '@core/form'
import { IFormChildProps, IFormValues } from '@core/form/formHandler/types'
import Input from '@core/form/input'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class TestDataForm extends PureComponent {
  public render(): JSX.Element {
    return (
      // tslint:disable-next-line:no-any
      <Form onSubmit={(values: IFormValues): any => alert(JSON.stringify(values, null, 2))} className={styles.testForm}>
        {(formChildProps: IFormChildProps): JSX.Element => (
          <>
            <Input required type={'text'} name="name" label={'Name'} formChildProps={formChildProps} />
            <Input type={'text'} name="thing" label={'Thing'} formChildProps={formChildProps} />
            <Input type={'text'} name="favDrink" label={'Favourite Drink'} formChildProps={formChildProps} />
            <Button type="submit">Submit</Button>
          </>
        )}
      </Form>
    )
  }
}
