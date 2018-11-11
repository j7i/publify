import { firestore } from '@config/firebase'
import { FirebaseCollection } from '@config/firebase/types.d'
import Form from '@core/form'
import Checkbox from '@core/form/checkbox'
import { IFormChildProps, IFormValues } from '@core/form/formHandler/types'
import Input from '@core/form/input'
import Button from '@material-ui/core/Button'
import { PureComponent } from 'react'
import { IDashboardProps } from '../types'
import AdvertTypeSwitch from './advertTypeSwitch'
import Categories from './categories'
import styles from './styles.css'

export default class TestDataForm extends PureComponent<IDashboardProps> {
  public render(): JSX.Element {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.testForm}>
        {(formChildProps: IFormChildProps): JSX.Element => (
          <>
            <AdvertTypeSwitch handleAdvertType={formChildProps.handleAdvertType} />
            <Input required type={'text'} multiline name="description" label={'Description'} formChildProps={formChildProps} />
            <Categories formChildProps={formChildProps} />
            <Checkbox type={'checkbox'} name="published" label="Publish" formChildProps={formChildProps} />
            <Button type="submit" variant="contained" color="primary">
              Add to Firestore
            </Button>
            {/* <pre>{JSON.stringify(formChildProps.values, null, 2)}</pre> */}
          </>
        )}
      </Form>
    )
  }

  private handleSubmit = async (values: IFormValues): Promise<void> => {
    const { user } = this.props

    // tslint:disable:no-any no-console
    firestore
      .collection(FirebaseCollection.DEMANDS)
      .add({
        ...values,
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
