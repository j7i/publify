import '@postcss/globalCss/index.css'
import { PureComponent } from 'react'
import Navigation from './navigation'
import PageFooter from './pageFooter'
import PageBottom from './pageFooter/pageBottom'
import styles from './styles.css'

export default class Layout extends PureComponent {
  public render(): JSX.Element {
    const { children } = this.props
    return (
      <>
        <Navigation />
        <main className={styles.contentWrap}>{children}</main>
        <PageFooter />
        <PageBottom />
      </>
    )
  }
}
