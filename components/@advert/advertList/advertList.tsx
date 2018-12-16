import { AdvertCardElement, IAdvert } from '@advert'
import { PureComponent } from 'react'
import { AdvertFilter } from './advertFilter/advertFilter'
import styles from './styles.css'
import { IAdvertListProps, IAdvertListState } from './types'

export class AdvertList extends PureComponent<IAdvertListProps, IAdvertListState> {
  public state: IAdvertListState = {
    filtered: []
  }

  public handleFilter = (categorie: string): void => {
    const { adverts } = this.props
    let filteredAdverts

    filteredAdverts = adverts.filter((advert: IAdvert) => advert.categories.includes(categorie) === true)
    this.setState({ filtered: filteredAdverts })
  }

  public render(): JSX.Element {
    let { adverts } = this.props

    if (this.state.filtered.length) {
      adverts = this.state.filtered
    }

    return adverts ? (
      <>
        <AdvertFilter handleFilter={this.handleFilter} />
        <section className={styles.advertList}>
          <h1>Public Adverts</h1>
          <section className={styles.advertWrapper}>
            {adverts !== [] && adverts.map((advert: IAdvert, index: number) => <AdvertCardElement key={index} advert={advert} />)}
          </section>
        </section>
      </>
    ) : (
      <>No adverts available</> // TODO
    )
  }
}
