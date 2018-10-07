import { PureComponent } from 'react'
import styles from './styles.css'

export default class PageFooter extends PureComponent {
  public render(): JSX.Element {
    return <footer className={styles.pageFooter} />
  }
}
