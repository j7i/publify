import { categorieList, ICategorie } from '@user'
const categories: ICategorie[] = [
  {
    name: 'Alle'
  }
]

export const categorieFilterList: ICategorie[] = [...categories, ...categorieList]
