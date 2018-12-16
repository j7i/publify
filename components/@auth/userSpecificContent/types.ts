export interface IUserSpecificContentProps {
  // tslint:disable-next-line:no-any
  children: (user: any) => JSX.Element
}
export interface IUserSpecificContentState {
  // tslint:disable-next-line:no-any
  user: any
  isAuthorizing: boolean
}
