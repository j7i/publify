import { faBalanceScale, faBroom, faCarSide, faDesktop, faLeaf, faShoppingBasket, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PureComponent } from 'react'
import styles from './styles.css'
import { ICategorie } from './types'

export default class Categories extends PureComponent {
  public render(): JSX.Element {
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
      <div className={styles.categories}>
        {categories.map((categorie: ICategorie) => (
          <div className={styles.categorie}>
            <span className={styles.categorieInner}>
              <FontAwesomeIcon icon={categorie.icon} color="#757575" size="3x" />
              {categorie.name}
            </span>
          </div>
        ))}
      </div>
    )
  }
}
