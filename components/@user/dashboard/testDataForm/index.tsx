import Button from '@core/button'
import Form from '@core/form'
import Checkbox from '@core/form/checkbox'
import { IFormChildProps, IFormValues } from '@core/form/formHandler/types'
import Input from '@core/form/input'
import firebase from 'firebase'
import { PureComponent } from 'react'
import { IDashboardProps } from '../types'
import Categories from './categories'
import styles from './styles.css'

export default class TestDataForm extends PureComponent<IDashboardProps> {
  public render(): JSX.Element {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.testForm}>
        {(formChildProps: IFormChildProps): JSX.Element => (
          <>
            <Input required type={'text'} name="description" label={'Description'} formChildProps={formChildProps} />
            <Categories formChildProps={formChildProps} />
            <Checkbox type={'checkbox'} name="published" label="Publish" formChildProps={formChildProps} />
            <Button type="submit">Add to Firestore</Button>
            {/* <pre>{JSON.stringify(formChildProps.values, null, 2)}</pre> */}
          </>
        )}
      </Form>
    )
  }

  private handleSubmit = async (values: IFormValues): Promise<void> => {
    const { user } = this.props
    // Initialize Cloud Firestore through Firebase
    const firestore = firebase.firestore()

    const { description, published, categories } = values

    // tslint:disable:no-any no-console
    firestore
      .collection('demands')
      .add({
        categories,
        description,
        published,
        userId: user.uid
      })
      .then((docRef: any) => {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch((error: any) => {
        console.error('Error adding document: ', error)
      })
  }
}
