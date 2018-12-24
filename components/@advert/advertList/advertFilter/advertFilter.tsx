import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Chip } from '@material-ui/core'
import { ICategorie } from '@user'
import React, { PureComponent } from 'react'
import { IAdvertFilterProps, IAdvertFilterState } from '../types'
import styles from './advertFilterStyles.css'
import { categorieFilterList } from './categorieFilterList'

export class AdvertFilter extends PureComponent<IAdvertFilterProps, IAdvertFilterState> {
  public state: IAdvertFilterState = {
    selectedCategorie: 'Alle'
  }

  public render(): JSX.Element {
    const { selectedCategorie } = this.state

    return (
      <section className={styles.advertFilter}>
        <div className={styles.filterWrapper}>
          {/* <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="on" indicatorColor="primary" textColor="primary">
          </Tabs> */}
          <div className={styles.filterPrimary}>
            <div className={styles.filterElement} />
            <div className={styles.filterElement}>Radius</div>
            <div className={styles.filterElement}>Type</div>
          </div>
          <div className={styles.filterSecondary}>
            {categorieFilterList.map((categorie: ICategorie, index: number) => (
              <Chip
                key={index}
                label={categorie.name}
                avatar={
                  <Avatar>
                    <FontAwesomeIcon icon={categorie.icon} size="1x" />
                  </Avatar>
                }
                onClick={(event: React.MouseEvent<HTMLDivElement>): void => this.handleSelection(event, categorie.name)}
                className={styles.categorieChip}
                color={selectedCategorie === categorie.name ? 'primary' : 'default'}
                variant={selectedCategorie === categorie.name ? 'default' : 'outlined'}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  private handleSelection = (event: React.MouseEvent<HTMLElement>, categorie: string): void => {
    event.persist()
    const { handleFilter } = this.props
    this.setState({ selectedCategorie: categorie })
    handleFilter(categorie)
  }
}
