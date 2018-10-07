// import HeaderSearch from '@layout/headerSearch'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class PageHeader extends PureComponent {
  public render(): JSX.Element {
    return (
      <header className={styles.header__outer}>
        <div className={styles.header__slogan}>
          <h1>Project II</h1>
          <h4>Basic setup done</h4>
        </div>
      </header>
    )
  }
}
