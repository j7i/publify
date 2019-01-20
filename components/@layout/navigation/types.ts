import { SingletonRouter } from 'next/router'

export interface INavigationProps {
  router?: SingletonRouter
}

export interface INavigationState {
  activeRoute: PathName
}

export enum PathName {
  START = 'start',
  DASHBOARD = 'dashboard',
  MESSAGES = 'messages',
  ACCOUNT = 'account',
  DETAIL = 'detail'
}
