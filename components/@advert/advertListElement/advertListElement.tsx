import classNames from 'classnames'
import { PureComponent } from 'react'
import styles from './styles.css'
import { IAdvertListElementProps } from './types'

export class AdvertListElement extends PureComponent<IAdvertListElementProps> {
  public render(): JSX.Element {
    const { advert } = this.props
    return (
      <article className={styles.listItem}>
        {advert.type && <h2 className={styles.title}>{advert.type}</h2>}
        <div>
          {advert.categories.map((categorie: string, index: number) => (
            <span className={styles.categorie} key={index}>
              {categorie}
            </span>
          ))}

          {advert.published ? (
            <span className={classNames(styles.status, styles.published)}>Published</span>
          ) : (
            <span className={classNames(styles.status, styles.private)}>Inaktiv</span>
          )}
        </div>
      </article>
    )
  }
}
