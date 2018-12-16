import { Button } from '@material-ui/core'
import { PureComponent } from 'react'
import styles from '../dashboardStyles.css'
import { ICreateAdvertProps, ICreateAdvertState } from '../types'
import { AdvertForm } from './advertForm/advertForm'

export class CreateAdvert extends PureComponent<ICreateAdvertProps, ICreateAdvertState> {
  public state: ICreateAdvertState = {
    isCreating: true
  }
  public render(): JSX.Element {
    const { userInfo, advertType } = this.props
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
        <section>
          <div className={styles.advertFormWrapper}>
            <AdvertForm userInfo={userInfo} advertType={advertType} />
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
