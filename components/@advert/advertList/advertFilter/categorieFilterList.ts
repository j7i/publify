import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { categorieList, ICategorie } from '@user'

const categories: ICategorie[] = [
  {
    name: 'Alle',
    icon: faSpinner
  }
]

export const categorieFilterList: ICategorie[] = [...categories, ...categorieList]
