import { PureComponent } from 'react'
import styles from './styles.css'

export class PageFooter extends PureComponent {
  public render(): JSX.Element {
    return <footer className={styles.pageFooter} />
  }
}
