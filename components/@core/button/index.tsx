import { IButtonProps } from '@core/button/types.d'
import Link from 'next/link'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class Button extends PureComponent<IButtonProps> {
  public render(): JSX.Element {
    const { children, target } = this.props

    return (
      <>
        {target ? (
          <Link href={target}>
            <a className={styles.button}>{children}</a>
          </Link>
        ) : (
          <button className={styles.button}>{children}</button>
        )}
      </>
    )
  }
}
