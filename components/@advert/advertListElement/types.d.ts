import { IFirestoreFetchError } from '@helpers/firestoreFetch/types'

export interface IAdvertListElementProps {
  seeking: ISeeking
}

export interface ISeeking extends IFirestoreFetchError {
  id?: string
  type: string
  categories: string[]
  description: string
  published: boolean
  userId: string
}
