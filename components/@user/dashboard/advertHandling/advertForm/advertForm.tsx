import { FirebaseCollection, firestore } from '@config'
import { Checkbox, Form, GoogleMap, IFormChildProps, IFormValues, Input, MapDisplayMode, NotificationSeverity, SnackbarNotification } from '@core'
import { Button } from '@material-ui/core'
import { IAdvertFormProps, IAdvertFormState } from '@user/dashboard/types'
import classNames from 'classnames'
import { PureComponent } from 'react'
import styles from './advertFormStyles.css'
import { Categories } from './categories/categories'

export class AdvertForm extends PureComponent<IAdvertFormProps, IAdvertFormState> {
  public state: IAdvertFormState = {
    notification: null,
    documentToUpdate: this.props.documentToUpdate
  }

  public render(): JSX.Element {
    const { initialValues, advertType, userInfo } = this.props
    const { notification, documentToUpdate } = this.state
    return (
      <>
        <Form onSubmit={this.handleSubmit} initialValues={initialValues} advertType={advertType} userInfo={userInfo} className={styles.advertForm}>
          {(formChildProps: IFormChildProps): JSX.Element => (
            <>
              <div className={styles.advertFormAreas}>
                <div className={styles.advertFormMainFields}>
                  <h2>Categories</h2>
                  <Categories formChildProps={formChildProps} />
                  <h2 className={styles.advertFormDescriptionTitle}>Describe your Advert</h2>
                  <Input required type={'text'} name="title" label={'Title'} formChildProps={formChildProps} />
                  <Input required type={'text'} multiline name="description" label={'Description'} formChildProps={formChildProps} />
                </div>
                <div className={styles.advertFormLocation}>
                  <h2>Location</h2>
                  <GoogleMap
                    displayMode={MapDisplayMode.SINGLE_WITH_SEARCH}
                    handleLocationInput={formChildProps.handleLocation}
                    initialLocation={initialValues && initialValues.location}
                  />
                </div>
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
        {notification && notification}
      </>
    )
  }

  private handleDelete = (): void => {
    const { documentToUpdate } = this.props

    firestore
      .collection(FirebaseCollection.ADVERTS)
      .doc(documentToUpdate)
      .delete()
      .then(() => {
        window.location.reload()
      })
      .catch((error: Error) => {
        this.setState({
          notification: <SnackbarNotification key={Date.now() + Math.random()} message={error.message} severity={NotificationSeverity.ERROR} />
        })
      })
  }

  private handleSubmit = async (values: IFormValues): Promise<void> => {
    const { userInfo, documentToUpdate } = this.props
    const { id, firstName, lastName, imageURL } = userInfo
    const advert = {
      ...values,
      userId: id,
      fullName: `${firstName} ${lastName}`,
      imageURL
    }

    if (!values.location) {
      this.setState({
        notification: <SnackbarNotification key={Date.now() + Math.random()} message={`Please add a location`} severity={NotificationSeverity.WARNING} />
      })
      return Promise.resolve()
    }

    if (documentToUpdate) {
      firestore
        .collection(FirebaseCollection.ADVERTS)
        .doc(documentToUpdate)
        .update({
          ...advert
        })
        .then(() => {
          this.setState({
            notification: <SnackbarNotification key={Date.now() + Math.random()} message={`Successfully updated`} severity={NotificationSeverity.SUCCESS} />
          })
        })
        .catch((error: Error) => {
          this.setState({
            notification: <SnackbarNotification key={Date.now() + Math.random()} message={error.message} severity={NotificationSeverity.ERROR} />
          })
        })
    } else {
      firestore
        .collection(FirebaseCollection.ADVERTS)
        .add({
          ...advert
        })
        .then((docRef: firebase.firestore.DocumentReference) => {
          this.setState({
            notification: (
              <SnackbarNotification key={Date.now() + Math.random()} message={`Awesome, successfully created`} severity={NotificationSeverity.SUCCESS} />
            ),
            documentToUpdate: docRef.id
          })
        })
        .catch((error: Error) => {
          this.setState({
            notification: <SnackbarNotification key={Date.now() + Math.random()} message={error.message} severity={NotificationSeverity.ERROR} />
          })
        })
    }
  }
}
