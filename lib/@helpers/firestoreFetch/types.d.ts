import { IAdvert } from '@advert/advertListElement/types'

export interface IFirestoreFetch {
  data?: IAdvert
}

export interface IFirebaseDocumnet {
  name: string
  fields: IAdvert
  createTime: string
  updateTime: string
}

interface IFirestoreFetchError {
  error?: string
}
