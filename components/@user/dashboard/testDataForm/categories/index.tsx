import { faBalanceScale, faBroom, faCarSide, faDesktop, faLeaf, faShoppingBasket, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { PureComponent } from 'react'
import styles from './styles.css'
import { ICategorie, ICategorieProps, ICategorieState } from './types'

export default class Categories extends PureComponent<ICategorieProps, ICategorieState> {
  public state: ICategorieState = {
    selected: {}
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
    const categories: ICategorie[] = [
      {
        name: 'Haushalt',
        icon: faBroom
      },
      {
        name: 'Garten',
        icon: faLeaf
      },
      {
        name: 'Einkaufen',
        icon: faShoppingBasket
      },
      {
        name: 'Finanzen',
        icon: faBalanceScale
      },
      {
        name: 'Behörden',
        icon: faUserTie
      },
      {
        name: 'PC/Handy',
        icon: faDesktop
      },
      {
        name: 'Transport',
        icon: faCarSide
      }
    ]
    return (
      <>
        <div className={styles.categories}>
          {categories.map((categorie: ICategorie, index: number) => (
            <div
              key={index}
              onClick={this.handleSelection}
              data-selection={categorie.name}
              className={classNames(styles.categorie, { [styles.selected]: this.state.selected[categorie.name] })}
            >
              <span className={styles.categorieInner}>
                <FontAwesomeIcon icon={categorie.icon} color="#757575" size="3x" />
                {categorie.name}
              </span>
            </div>
          ))}
        </div>
      </>
    )
  }
}
