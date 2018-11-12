import { AdvertType } from '@helpers/types/types'

export interface IAdvertTypeSwitchProps {
  handleAdvertType: (advertType: AdvertType) => void
}

export interface IAdvertTypeSwitchState {
  advertType: AdvertType
}
