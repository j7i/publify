import classNames from 'classnames'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertListElementProps } from './types'

export default class AdvertListElement extends PureComponent<IAdvertListElementProps> {
  public render(): JSX.Element {
    const { demand } = this.props
    return (
      <article className={styles.listItem}>
        {demand.type && <h2 className={styles.title}>{demand.type}</h2>}
        <div>
          {demand.categories.map((categorie: string, index: number) => (
            <span className={styles.categorie} key={index}>
              {categorie}
            </span>
          ))}

          {demand.published ? (
            <span className={classNames(styles.status, styles.published)}>Published</span>
          ) : (
            <span className={classNames(styles.status, styles.private)}>Inaktiv</span>
          )}
        </div>
      </article>
    )
  }
}
