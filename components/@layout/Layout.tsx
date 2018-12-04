import '@postcss/globalCss/index.css'
import { PureComponent } from 'react'
import Navigation from './navigation'
import styles from './styles.css'

export default class Layout extends PureComponent {
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
