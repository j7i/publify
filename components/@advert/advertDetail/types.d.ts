import { ISeeking } from '@advert/advertListElement/types'

export interface IAdvertDetailProps {
  advertId: string
}

export interface IAdvertDetailState {
  isChatting: boolean
  seeking?: ISeeking
}
