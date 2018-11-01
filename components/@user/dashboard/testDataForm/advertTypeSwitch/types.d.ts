export interface IAdvertTypeSwitchProps {
  handleAdvertType: (advertType: AdvertType) => void
}

export interface IAdvertTypeSwitchState {
  advertType: AdvertType
}

export enum AdvertType {
  OFFER = 'Offer',
  DEMAND = 'Demand'
}
