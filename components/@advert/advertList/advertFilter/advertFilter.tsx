import { IIconProps } from '@core'
import { AdvertType } from '@helpers'
import { Button } from '@material-ui/core'
import { ICategorie } from '@user'
import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { IAdvertFilterProps, IAdvertFilterState } from '../types'
import styles from './advertFilterStyles.css'
import { categorieFilterList } from './categorieFilterList'

export class AdvertFilter extends PureComponent<IAdvertFilterProps, IAdvertFilterState> {
  public state: IAdvertFilterState = {
    isFilterAreaVisible: true
  }

  public componentDidMount(): void {
    if (window.innerWidth < 699) {
      this.setState({ isFilterAreaVisible: false })
    }
  }

  public render(): JSX.Element {
    const { advertListRenderProps } = this.props
    const { isFilterAreaVisible } = this.state

    return (
      <>
        <div className={styles.filterToggle}>
          <Button variant="contained" color="primary" onClick={this.toggleFilterArea}>
            {isFilterAreaVisible ? 'Hide' : 'Filter'}
          </Button>
        </div>
        {isFilterAreaVisible && (
          <section className={styles.advertFilter}>
            <div className={styles.filterWrapper}>
              <div className={styles.filterPrimary}>
                <div className={styles.filterElement}>
                  <div className={styles.selectionArea}>
                    <div
                      onClick={this.handleTypeClick}
                      className={classNames(styles.selection, { [styles.selectionActive]: advertListRenderProps.type === AdvertType.DEMAND })}
                      data-type={AdvertType.DEMAND}
                    >
                      <span className={styles.advertTypeSelectionTitle}>{AdvertType.DEMAND}</span>
                    </div>
                    <div
                      onClick={this.handleTypeClick}
                      className={classNames(styles.selection, { [styles.selectionActive]: advertListRenderProps.type === AdvertType.OFFER })}
                      data-type={AdvertType.OFFER}
                    >
                      <span className={styles.advertTypeSelectionTitle}>{AdvertType.OFFER}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.selectionArea}>
                {categorieFilterList.map((category: ICategorie, index: number) => {
                  const { name: categoryName, icon: categoryIcon } = category

                  return (
                    <div
                      key={index}
                      onClick={(event: React.MouseEvent<HTMLDivElement>): void => this.handleCategorieSelection(event, categoryName)}
                      className={classNames(styles.selection, { [styles.selectionActive]: advertListRenderProps.category === categoryName })}
                    >
                      {categoryIcon && React.createElement<IIconProps>(categoryIcon, { width: 36, height: 36, className: styles.categorieIcon })}
                      <span className={styles.advertCategorySelectionTitle}>{categoryName}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </>
    )
  }

  private handleTypeClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.persist()
    const { handleTypeFilter } = this.props.advertListRenderProps
    const type = event.currentTarget.dataset.type as AdvertType
    handleTypeFilter(type)
    // remove states
  }

  private handleCategorieSelection = (event: React.MouseEvent<HTMLElement>, categorie: string): void => {
    event.persist()
    const { handleCategorieFilter } = this.props.advertListRenderProps
    handleCategorieFilter(categorie)
  }

  private toggleFilterArea = (): void => {
    this.setState((prevState: IAdvertFilterState) => ({
      isFilterAreaVisible: !prevState.isFilterAreaVisible
    }))
  }
}
