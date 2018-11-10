import { IDemand } from '@advert/advertListElement/types'

export interface IDashboardProps {
  user: firebase.User
}

export interface IDashboardState {
  demands: IDemand[]
}
