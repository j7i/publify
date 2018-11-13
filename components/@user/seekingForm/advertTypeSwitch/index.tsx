import { AdvertType } from '@helpers/types/types.d'
import classNames from 'classnames'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertTypeSwitchProps, IAdvertTypeSwitchState } from './types.d'

export default class AdvertTypeSwitch extends PureComponent<IAdvertTypeSwitchProps, IAdvertTypeSwitchState> {
  public state: IAdvertTypeSwitchState = {
    advertType: AdvertType.DEMAND
  }

  public componentDidMount(): void {
    const { initialValues } = this.props
    const initialAdvertType = initialValues.type as AdvertType
    const advertType = initialAdvertType ? initialAdvertType : AdvertType.DEMAND

    this.setState(
      {
        advertType
      },
      this.passSelectionToFormHandler
    )
  }

  public handleType = (advertType: AdvertType, event: React.MouseEvent<HTMLElement>): void => {
    event.persist()
    this.setState(
      {
        advertType
      },
      this.passSelectionToFormHandler
    )
  }

  public passSelectionToFormHandler = (): void => {
    const { handleAdvertType } = this.props
    handleAdvertType(this.state.advertType)
  }

  public render(): JSX.Element {
    const advertTypes = [AdvertType.DEMAND, AdvertType.OFFER]
    return (
      <div className={styles.advertTypes}>
        {advertTypes.map((advertType: AdvertType, index: number) => (
          <div
            key={index}
            className={classNames(styles.advertType, { [styles.active]: advertType === this.state.advertType })}
            onClick={(event: React.MouseEvent<HTMLElement>): void => this.handleType(advertType, event)}
          >
            {advertType}
          </div>
        ))}
      </div>
    )
  }
}
