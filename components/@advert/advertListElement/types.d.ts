export interface IAdvertListElementProps {
  demand: IDemand
}

export interface IDemand {
  id: string
  type: string
  categories: string[]
  description: string
  published: boolean
  userId: string
}
