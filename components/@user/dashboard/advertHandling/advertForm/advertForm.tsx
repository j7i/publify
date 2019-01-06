import { FirebaseCollection, firestore } from '@config'
import { Checkbox, Form, IFormChildProps, IFormValues, Input } from '@core'
import { Button } from '@material-ui/core'
import { IAdvertFormProps } from '@user/dashboard/types'
import classNames from 'classnames'
import Router from 'next/router'
import { PureComponent } from 'react'
import styles from './advertFormStyles.css'
import { Categories } from './categories/categories'

export class AdvertForm extends PureComponent<IAdvertFormProps> {
  public render(): JSX.Element {
    const { initialValues, documentToUpdate, advertType, userInfo } = this.props
    return (
      <Form onSubmit={this.handleSubmit} initialValues={initialValues} advertType={advertType} userInfo={userInfo} className={styles.advertForm}>
        {(formChildProps: IFormChildProps): JSX.Element => (
          <>
            <div className={styles.advertFormFields}>
              <h2>Categories</h2>
              <Categories formChildProps={formChildProps} />
              <h2 className={styles.advertFormDescriptionTitle}>Describe your Advert</h2>
              <Input required type={'text'} name="title" label={'Title'} formChildProps={formChildProps} />
              <Input required type={'text'} multiline name="description" label={'Description'} formChildProps={formChildProps} />
            </div>

            <div className={classNames(styles.advertFormActions, { [styles.singleActionButton]: !documentToUpdate })}>
              <Checkbox name="published" label="Published" formChildProps={formChildProps} />
              <div className={styles.advertFormActionButtons}>
                {documentToUpdate && <Button onClick={this.handleDelete}>Delete</Button>}
                <Button type="submit" variant="contained" color="primary">
                  {documentToUpdate ? `Update` : `Create new`}
                </Button>
              </div>
            </div>
          </>
        )}
      </Form>
    )
  }

  // tslint:disable:no-any no-console

  private handleDelete = (): void => {
    const { documentToUpdate } = this.props

    firestore
      .collection(FirebaseCollection.ADVERTS)
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
    const { userInfo, documentToUpdate } = this.props
    const { id, firstName, lastName } = userInfo
    const advert = {
      ...values,
      userId: id,
      fullName: `${firstName} ${lastName}`
    }

    if (documentToUpdate) {
      firestore
        .collection(FirebaseCollection.ADVERTS)
        .doc(documentToUpdate)
        .update({
          ...advert
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
        .collection(FirebaseCollection.ADVERTS)
        .add({
          ...advert
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
