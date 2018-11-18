import { ISeeking } from '@advert/advertListElement/types'

export interface IFirestoreFetch {
  data?: ISeeking
}

export interface IFirebaseDocumnet {
  name: string
  fields: ISeeking
  createTime: string
  updateTime: string
}

interface IFirestoreFetchError {
  error?: string
}
