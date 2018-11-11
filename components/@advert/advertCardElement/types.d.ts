import { IDemand } from '@advert/advertListElement/types'

export interface IAdvertCardElementProps {
  demand: IDemand
  withActions?: boolean
}

export interface IAdvertCardElementState {
  published: boolean
}
