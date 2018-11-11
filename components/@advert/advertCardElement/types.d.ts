import { ISeeking } from '@advert/advertListElement/types'

export interface IAdvertCardElementProps {
  seeking: ISeeking
  withActions?: boolean
}

export interface IAdvertCardElementState {
  published: boolean
}
