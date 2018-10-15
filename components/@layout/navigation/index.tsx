import Link from 'next/link'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class Navigation extends PureComponent {
  public render(): JSX.Element {
    return (
      <nav className={styles.navigation}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </nav>
    )
  }
}
