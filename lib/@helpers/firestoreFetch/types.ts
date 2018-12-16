import { IAdvert } from '@advert'

export interface IFirestoreFetch {
  data?: IAdvert
}

export interface IFirebaseDocumnet {
  name: string
  fields: IAdvert
  createTime: string
  updateTime: string
}

export interface IFirestoreFetchError {
  error?: string
}
