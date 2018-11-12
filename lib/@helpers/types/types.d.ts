import { IFirebaseDocumnet } from '@helpers/firestoreFetch/types'

export interface IDatailPageProps {
  data: IFirebaseDocumnet
}

export enum AdvertType {
  OFFER = 'Offer',
  DEMAND = 'Demand'
}
