import { Button } from '@material-ui/core'
import AdvertForm from '@user/advertForm'
import { PureComponent } from 'react'
import styles from './styles.css'
import { ICreateAdvertProps, ICreateAdvertState } from './types'

export default class CreateAdvert extends PureComponent<ICreateAdvertProps, ICreateAdvertState> {
  public state: ICreateAdvertState = {
    isCreating: true
  }
  public render(): JSX.Element {
    const { user, advertType } = this.props
    const { isCreating } = this.state

    if (isCreating) {
      return (
        <div className={styles.callToAction}>
          <Button variant="contained" onClick={this.handleCreate} color="primary">
            Create New
          </Button>
        </div>
      )
    } else {
      return (
        <section className={styles.createAdvert}>
          <div className={styles.form}>
            <AdvertForm user={user} advertType={advertType} />
          </div>
        </section>
      )
    }
  }

  private handleCreate = (): void => {
    this.setState((prevState: ICreateAdvertState) => ({
      isCreating: !prevState.isCreating
    }))
  }
}
