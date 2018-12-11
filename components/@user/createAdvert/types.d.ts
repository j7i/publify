import { AdvertType } from '@helpers/types/types'

export interface ICreateAdvertProps {
  user: firebase.User
  advertType: AdvertType
}

export interface ICreateAdvertState {
  isCreating: boolean
}
