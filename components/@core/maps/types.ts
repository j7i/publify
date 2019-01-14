import { ProvidedProps } from 'google-maps-react'

// import { ReactNode } from 'react'

// export interface IMapContainerProps {
//   // tslint:disable-next-line:no-any
//   children: (props: any) => ReactNode
// }

export interface IGoogleMapInternalProps extends ProvidedProps {
  handleLocationInput?: (location: ILocation) => void
  initialLocation?: ILocation
  locationBounds?: ILocation[]
  isDetailPage?: boolean
}
export interface IGoogleMapInternalState {
  radius: number
  initialCenter: ILocation
  selectedLocationName: string
  newLocation?: ILocation
}

export interface ILocation {
  lat: number
  lng: number
}
