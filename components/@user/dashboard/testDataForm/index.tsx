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
            <Input type={'checkbox'} id="published" name="published" label="Publish" formChildProps={formChildProps} />
            {/* <select multiple={true} value={['Haushalt', 'Finanzen', 'Pflege']} /> */}
            <Button type="submit">Submit</Button>
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

    const { description, published } = values
    const categories = Array.of(values.categories)

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
