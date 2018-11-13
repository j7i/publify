import { IFirebaseDocumnet } from '@helpers/firestoreFetch/types'

export interface IDatailPageProps {
  data: IFirebaseDocumnet
}

export interface IEditPageProps {
  id: string
}

export enum AdvertType {
  OFFER = 'Offer',
  DEMAND = 'Demand'
}
