import { PureComponent } from 'react'
import { Navigation } from '../navigation/navigation'
import styles from './styles.css'

export class Layout extends PureComponent {
  public render(): JSX.Element {
    const { children } = this.props
    return (
      <>
        <Navigation />
        <main className={styles.contentWrap}>{children}</main>
      </>
    )
  }
}
