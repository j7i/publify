export interface IAdvert {
  id: string
  type: string
  categories: string[]
  description: string
  published: boolean
  userId: string
}

export interface IAdvertDetailProps {
  advert: IAdvert
}

export interface IAdvertDetailState {
  isChatting: boolean
  advert?: IAdvert
}
