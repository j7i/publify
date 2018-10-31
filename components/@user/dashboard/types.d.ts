export interface IDashboardProps {
  user: firebase.User
}

export interface IDashboardState {
  demands: IDemand[]
}

export interface IDemand {
  categories: string[]
  description: string
  id: string
  published: boolean
  userId: string
}
