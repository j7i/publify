import { IIconProps } from '@core'
import { ICategorie, ICategorieProps, ICategorieState } from '@user/dashboard/types'
import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { categorieList } from './categorieList'
import styles from './categoriesStyles.css'

export class Categories extends PureComponent<ICategorieProps, ICategorieState> {
  public state: ICategorieState = {
    selected: {}
  }

  public componentDidMount(): void {
    let { categories } = this.props.formChildProps.values

    if (categories) {
      const selected = {}
      Object.values(categories).map((categorie: string) => {
        selected[categorie] = true
      })

      this.setState({ selected: { ...selected } })
    }
  }

  public handleSelection = (event: React.MouseEvent<HTMLElement>): void => {
    const selection = event.currentTarget.dataset.selection as string

    event.persist()
    this.setState((prevState: ICategorieState) => {
      let isSelected = true

      if (prevState.selected[selection]) {
        isSelected = !prevState.selected[selection]
      }

      return {
        selected: {
          ...prevState.selected,
          [selection]: isSelected
        }
      }
    }, this.passSelectionToFormHandler)
  }

  public passSelectionToFormHandler = (): void => {
    const { handleCategories } = this.props.formChildProps
    const categoriesToCheck = this.state.selected
    const selectedCategories: string[] = Object.keys(categoriesToCheck).filter((categorie: string) => categoriesToCheck[categorie] === true)

    handleCategories(selectedCategories)
  }

  public render(): JSX.Element {
    // const { selectedCategories } = this.props.formchildProps

    return (
      <>
        <div className={styles.categories}>
          {categorieList.map((category: ICategorie, index: number) => (
            <div
              key={index}
              onClick={this.handleSelection}
              data-selection={category.name}
              className={classNames(styles.categorie, { [styles.selected]: this.state.selected[category.name] })}
            >
              <div className={styles.categorieInner}>
                {category.icon && React.createElement<IIconProps>(category.icon, { width: 36, height: 36, className: styles.categorieIcon })}
                <span className={styles.categorieName}>{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
}
