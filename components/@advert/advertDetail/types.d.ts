import { ISeeking } from '@advert/advertListElement/types'

export interface IAdvertDetailProps {
  seekingId: string
}

export interface IAdvertDetailState {
  isChatting: boolean
  seeking?: ISeeking
}
