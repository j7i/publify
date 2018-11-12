export interface IAdvertListElementProps {
  seeking: ISeeking
}

export interface ISeeking {
  id?: string
  type: string
  categories: string[]
  description: string
  published: boolean
  userId: string
}
