import { firestore } from '@config/firebase'
import { FirebaseCollection } from '@config/firebase/types.d'
import Form from '@core/form'
import Checkbox from '@core/form/checkbox'
import { IFormChildProps, IFormValues } from '@core/form/formHandler/types'
import Input from '@core/form/input'
import Button from '@material-ui/core/Button'
import Router from 'next/router'
import { PureComponent } from 'react'
import AdvertTypeSwitch from './advertTypeSwitch'
import Categories from './categories'
import styles from './styles.css'
import { IAdvertFormProps } from './types'

export default class SeekingForm extends PureComponent<IAdvertFormProps> {
  public render(): JSX.Element {
    const { initialValues, documentToUpdate } = this.props
    return (
      <Form onSubmit={this.handleSubmit} initialValues={initialValues} className={styles.seekingForm}>
        {(formChildProps: IFormChildProps): JSX.Element => (
          <>
            <AdvertTypeSwitch handleAdvertType={formChildProps.handleAdvertType} initialValues={formChildProps.values} />
            <Input required type={'text'} multiline name="description" label={'Description'} formChildProps={formChildProps} />
            <Categories formChildProps={formChildProps} />
            <Checkbox name="published" label="Published" formChildProps={formChildProps} />
            <div className={styles.actions}>
              {documentToUpdate && (
                <Button className={styles.delete} onClick={this.handleDelete}>
                  Delete
                </Button>
              )}
              <Button type="submit" variant="contained" color="primary">
                {documentToUpdate ? `Update` : `Add to Firestore`}
              </Button>
            </div>
            {/* <pre>{JSON.stringify(formChildProps.values, null, 2)}</pre> */}
          </>
        )}
      </Form>
    )
  }

  // tslint:disable:no-any no-console

  private handleDelete = (): void => {
    const { documentToUpdate } = this.props

    firestore
      .collection(FirebaseCollection.SEEKINGS)
      .doc(documentToUpdate)
      .delete()
      .then(() => {
        console.log('Document deleted with ID: ', documentToUpdate)
        Router.push('/dashboard')
      })
      .catch((error: any) => {
        console.error('Error deleting document: ', error)
      })
  }

  private handleSubmit = async (values: IFormValues): Promise<void> => {
    const { user, documentToUpdate } = this.props

    if (documentToUpdate) {
      firestore
        .collection(FirebaseCollection.SEEKINGS)
        .doc(documentToUpdate)
        .update({
          ...values,
          userId: user.uid
        })
        .then(() => {
          console.log('Document updated with ID: ', documentToUpdate)
          Router.push('/dashboard')
        })
        .catch((error: any) => {
          console.error('Error updating document: ', error)
        })
    } else {
      firestore
        .collection(FirebaseCollection.SEEKINGS)
        .add({
          ...values,
          userId: user.uid
        })
        .then((docRef: any) => {
          console.log('Document written with ID: ', docRef.id)
          Router.push('/dashboard')
        })
        .catch((error: any) => {
          console.error('Error adding document: ', error)
        })
    }
  }
}
