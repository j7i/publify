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
              <AdvertFilter advertListRenderProps={advertListRenderProps} />
              <div className={styles.advertResults}>
                <section className={styles.advertListItemArea}>
                  <h1 className={styles.advertListTitle}>Public Adverts</h1>
                  <div className={styles.advertListItems}>
                    {adverts.length ? (
                      adverts.map((advert: IAdvert, index: number) => <AdvertCardElement key={index} index={index} advert={advert} />)
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
            </div>
          )
        }}
      </AdvertListController>
    )
  }
}
