import { IButtonProps } from '@core/button/types.d'
import Link from 'next/link'
import { Component } from 'react'
import styles from './styles.css'

export default class Button extends Component<IButtonProps> {
  public render(): JSX.Element {
    const { children, type, target } = this.props

    return (
      <>
        {type === 'link' ? (
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
