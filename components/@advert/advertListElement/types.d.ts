import { IFirestoreFetchError } from '@helpers/firestoreFetch/types'

export interface IAdvertListElementProps {
  advert: IAdvert
}

export interface IAdvert extends IFirestoreFetchError {
  id: string
  type: string
  categories: string[]
  description: string
  published: boolean
  userId: string
}
