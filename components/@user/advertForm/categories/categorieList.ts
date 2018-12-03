import { faBalanceScale, faBroom, faCarSide, faDesktop, faLeaf, faShoppingBasket, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Categorie } from '@helpers/types/types.d'
import { ICategorie } from './types'

const categorieList: ICategorie[] = [
  {
    name: Categorie.HOUSEHOLD,
    icon: faBroom
  },
  {
    name: Categorie.GARDEN,
    icon: faLeaf
  },
  {
    name: Categorie.SHOPPING,
    icon: faShoppingBasket
  },
  {
    name: Categorie.FINANCE,
    icon: faBalanceScale
  },
  {
    name: Categorie.AUTHORITIES,
    icon: faUserTie
  },
  {
    name: Categorie.MULTIMEDIA,
    icon: faDesktop
  },
  {
    name: Categorie.TRANSPORTATION,
    icon: faCarSide
  }
]

export default categorieList
