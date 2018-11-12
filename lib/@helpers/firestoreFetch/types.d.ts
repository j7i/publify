import { ISeeking } from '@advert/advertListElement/types'

export interface IFirestoreFetch {
  data: IFirebaseDocumnet
}

export interface IFirebaseDocumnet {
  name: string
  fields: ISeeking
  createTime: string
  updateTime: string
}
