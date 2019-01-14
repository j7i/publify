import { AdvertCardElement, IAdvert } from '@advert'
import { GoogleMap, MapDisplayMode } from '@core'
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
            <div className={styles.advertList}>
              <section className={styles.advertListArea}>
                <AdvertFilter advertListRenderProps={advertListRenderProps} />
                <h1 className={styles.advertListTitle}>Public Adverts</h1>
                <div className={styles.advertListItems}>
                  {adverts.length ? (
                    adverts.map((advert: IAdvert, index: number) => <AdvertCardElement key={index} advert={advert} />)
                  ) : (
                    <div>
                      <p>No adverts available</p>
                    </div>
                  )}
                </div>
              </section>
              <aside className={styles.advertMap}>
                <GoogleMap displayMode={MapDisplayMode.MULTIPLE_LOCATIONS} locations={adverts.map((advert: IAdvert) => advert.location)} />
              </aside>
            </div>
          )
        }}
      </AdvertListController>
    )
  }
}
