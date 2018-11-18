import { ISeeking } from '@advert/advertListElement/types'
import { IFirebaseDocumnet } from '@helpers/firestoreFetch/types'

export interface IDatailPageProps {
  data: ISeeking
  statusCode?: number | undefined
}

export interface IEditPageProps {
  id: string
}

export enum AdvertType {
  OFFER = 'Offer',
  DEMAND = 'Demand'
}
