// import { faBalanceScale, faBroom, faCarSide, faDesktop, faLeaf, faShoppingBasket, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Categorie } from '@helpers'
import { ICategorie } from '@user/dashboard/types'

import { AuthoritiesIcon, FinanceIcon, GardenIcon, HouseholdIcon, MultimediaIcon, ShoppingIcon, SpecialIcon, TransportationIcon } from '@core'

export const categorieList: ICategorie[] = [
  {
    name: Categorie.HOUSEHOLD,
    icon: HouseholdIcon
  },
  {
    name: Categorie.GARDEN,
    icon: GardenIcon
  },
  {
    name: Categorie.SHOPPING,
    icon: ShoppingIcon
  },
  {
    name: Categorie.FINANCE,
    icon: FinanceIcon
  },
  {
    name: Categorie.AUTHORITIES,
    icon: AuthoritiesIcon
  },
  {
    name: Categorie.MULTIMEDIA,
    icon: MultimediaIcon
  },
  {
    name: Categorie.TRANSPORTATION,
    icon: TransportationIcon
  },
  {
    name: Categorie.SPECIAL,
    icon: SpecialIcon
  }
]
