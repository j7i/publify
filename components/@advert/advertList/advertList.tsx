import { AdvertCardElement, IAdvert } from '@advert'
import { PureComponent, ReactNode } from 'react'
import { AdvertFilter } from './advertFilter/advertFilter'
import { AdvertListController } from './advertListController/advertListController'
import styles from './styles.css'
import { IAdvertListProps, IAdvertListRenderProps, IAdvertListState } from './types'

export class AdvertList extends PureComponent<IAdvertListProps, IAdvertListState> {
  public render(): JSX.Element {
    let { adverts } = this.props

    return (
      <AdvertListController>
        {(advertListRenderProps: IAdvertListRenderProps): ReactNode => {
          const { filteredAdverts } = advertListRenderProps

          if (filteredAdverts) {
            adverts = filteredAdverts
          }

          return (
            <>
              <AdvertFilter advertListRenderProps={advertListRenderProps} />
              <section className={styles.advertList}>
                <h1>Public Adverts</h1>
                <section className={styles.advertWrapper}>
                  {adverts.length ? (
                    adverts.map((advert: IAdvert, index: number) => <AdvertCardElement key={index} advert={advert} />)
                  ) : (
                    <div>
                      <p>No adverts available</p>
                    </div>
                  )}
                </section>
              </section>
            </>
          )
        }}
      </AdvertListController>
    )
  }
}
