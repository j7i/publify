import AdvertCardElement from '@advert/advertCardElement'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertDetailProps } from './types'

export default class AdvertDetail extends PureComponent<IAdvertDetailProps> {
  public render(): JSX.Element {
    const { seeking } = this.props
    return (
      <div className={styles.detailView}>
        <AdvertCardElement seeking={seeking} />
      </div>
    )
  }
}
