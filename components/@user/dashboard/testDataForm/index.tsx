import Button from '@core/button'
import Form from '@core/form'
import { IFormChildProps, IFormValues } from '@core/form/formHandler/types'
import Input from '@core/form/input'
import firebase from 'firebase'
import { PureComponent } from 'react'
import { IDashboardProps } from '../types'
import styles from './styles.css'

export default class TestDataForm extends PureComponent<IDashboardProps> {
  public render(): JSX.Element {
    return (
      // tslint:disable-next-line:no-any
      <Form onSubmit={this.handleSubmit} className={styles.testForm}>
        {(formChildProps: IFormChildProps): JSX.Element => (
          <>
            <Input required type={'text'} name="description" label={'Description'} formChildProps={formChildProps} />
            <Input required type={'text'} name="categories" label={'Categorie'} formChildProps={formChildProps} />
            <input type="checkbox" /> Published
            <select multiple={true} value={['Haushalt', 'Finanzen', 'Pflege']} />
            <Button type="submit">Submit</Button>
          </>
        )}
      </Form>
    )
  }

  private handleSubmit = async (values: IFormValues): Promise<void> => {
    const { user } = this.props
    // Initialize Cloud Firestore through Firebase
    const firestore = firebase.firestore()

    const { description, categories } = values
    categories.split(',')

    // tslint:disable:no-any no-console
    firestore
      .collection('seekings')
      .add({
        description,
        categories,
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
